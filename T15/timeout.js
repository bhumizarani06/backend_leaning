

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    console.log(`Requesting: ${url}`);
    console.log(`Timeout: ${timeoutMs}ms`);

    const response = await fetch(url, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  try {
    const data = await fetchWithTimeout(
      "http://localhost:3000/slow",
      2000
    );

    console.log("Response:", data);
  } catch (error) {
    console.log("Final Error:", error.message);
  }
}

main();