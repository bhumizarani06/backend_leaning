// T15 - Retry with limit and backoff

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchWithRetry(url, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt}: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        // Only retry selected transient HTTP errors
        if (response.status === 503) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // Do not retry other HTTP errors
        throw new Error(`Non-retryable HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Request successful");

      return data;
    } catch (error) {
      lastError = error;

      console.log(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === maxAttempts) {
        break;
      }

      const backoff = 500 * 2 ** (attempt - 1);

      console.log(`Waiting ${backoff}ms before retry...`);

      await wait(backoff);
    }
  }

  throw new Error(
    `Request failed after ${maxAttempts} attempts: ${lastError.message}`
  );
}

async function main() {
  try {
    const data = await fetchWithRetry(
      "http://localhost:3000/temporary",
      3
    );

    console.log("Final data:", data);
  } catch (error) {
    console.log("Final Error:", error.message);
  }
}

main();