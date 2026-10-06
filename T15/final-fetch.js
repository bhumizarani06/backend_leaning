// T15 - Final HTTP Fetch Utility

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJson(url, options = {}) {
  const {
    timeoutMs = 3000,
    maxAttempts = 3
  } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      console.log(`Attempt ${attempt}: ${url}`);

      const response = await fetch(url, {
        signal: controller.signal
      });

      console.log("HTTP Status:", response.status);

      // Retry only temporary server failure
      if (response.status === 503) {
        throw new Error("HTTP_503");
      }

      // Other HTTP failures are not retried
      if (!response.ok) {
        const error = new Error(
          `HTTP error: ${response.status}`
        );

        error.type = "HTTP_ERROR";

        throw error;
      }

      // Parse JSON
      try {
        const data = await response.json();

        console.log("Request successful");

        return data;
      } catch (error) {
        const parseError = new Error(
          "Response JSON parsing failed"
        );

        parseError.type = "PARSE_ERROR";

        throw parseError;
      }
    } catch (error) {
      if (error.name === "AbortError") {
        const timeoutError = new Error(
          `Request timed out after ${timeoutMs}ms`
        );

        timeoutError.type = "TIMEOUT";

        lastError = timeoutError;

        console.log(timeoutError.message);

        break;
      }

      if (error.message === "HTTP_503") {
        lastError = new Error(
          "HTTP error: 503 Service Unavailable"
        );

        lastError.type = "HTTP_ERROR";

        console.log(lastError.message);
      } else {
        lastError = error;

        if (!lastError.type) {
          lastError.type = "NETWORK_ERROR";
        }

        console.log(
          `${lastError.type}: ${lastError.message}`
        );
      }

      // Stop if this was the final attempt
      if (attempt === maxAttempts) {
        break;
      }

      // Retry only HTTP 503
      if (lastError.type !== "HTTP_ERROR") {
        break;
      }

      const backoff = 500 * 2 ** (attempt - 1);

      console.log(
        `Retrying after ${backoff}ms...`
      );

      await wait(backoff);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}

async function main() {
  try {
    const data = await fetchJson(
      "http://localhost:3000/temporary",
      {
        timeoutMs: 3000,
        maxAttempts: 3
      }
    );

    console.log("Final data:", data);
  } catch (error) {
    console.log("\nFinal Error");
    console.log("Type:", error.type);
    console.log("Message:", error.message);
  }
}

main();