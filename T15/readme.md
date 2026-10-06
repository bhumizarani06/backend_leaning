# T15 - HTTP Fetching

## Goal

Build a fetch utility that communicates with a local mock HTTP server and handles:

* HTTP status errors
* JSON parsing errors
* Network errors
* Request cancellation
* Request timeouts
* Retry limits
* Backoff between retries
* Transient server failures

---

## Topics Covered

1. Check HTTP response status before consuming success data.
2. Understand HTTP errors separately from network errors.
3. Handle invalid JSON parse errors.
4. Use `AbortController` for request cancellation.
5. Implement request timeout.
6. Define maximum retry attempts.
7. Use exponential backoff between retries.
8. Retry only suitable transient failures.
9. Understand why non-idempotent requests should not be blindly retried.
10. Prevent infinite retry loops.

---

## Files

| File              | Purpose                               |
| ----------------- | ------------------------------------- |
| `mock-server.js`  | Local mock HTTP server                |
| `fetch-helper.js` | Basic fetch and HTTP status handling  |
| `timeout.js`      | Fetch timeout using `AbortController` |
| `retry.js`        | Retry with attempt limit and backoff  |
| `final-fetch.js`  | Final combined HTTP fetch utility     |
| `readme.md`       | T15 documentation                     |

---

# 1. Local Mock Server

The local server provides different endpoints to test different HTTP situations.

## Start Server

Open Terminal 1:

```powershell
cd C:\Users\Bhumi\OneDrive\Desktop\Backend_learning\T15
node mock-server.js
```

Expected:

```text
Mock server running on http://localhost:3000
```

Keep this terminal running.

---

# 2. Mock Endpoints

| Endpoint        |          Status | Purpose                               |
| --------------- | --------------: | ------------------------------------- |
| `/success`      |             200 | Successful JSON response              |
| `/invalid-json` |             200 | Invalid JSON response                 |
| `/slow`         |             200 | Response delayed by 5 seconds         |
| `/unavailable`  |             503 | Service unavailable                   |
| `/temporary`    | 503 → 503 → 200 | Temporary failure followed by success |

---

# 3. HTTP Status Checking

`fetch()` does not automatically reject the Promise when the server returns an HTTP error such as `404` or `503`.

Therefore, the response status must be checked explicitly.

Example:

```js
const response = await fetch(url);

console.log(response.status);

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
```

`response.ok` is `true` for successful HTTP responses and `false` for unsuccessful HTTP status codes.

The status should be checked before treating the response as successful data.

---

# 4. HTTP Error

An HTTP error means the server responded, but the status indicates failure.

Example:

```text
503 Service Unavailable
```

The client received a valid HTTP response, but the server could not successfully handle the request.

Example from T15:

```text
HTTP Status: 503
HTTP Error: 503
```

---

# 5. Network Error

A network error is different from an HTTP error.

A network error can happen when:

* The server is not running.
* The server cannot be reached.
* The connection fails.

In this situation, there may be no HTTP response at all.

Therefore:

```text
HTTP Error = server responded with an error status

Network Error = request could not successfully reach the server
```

---

# 6. JSON Parse Error

A response can have HTTP status `200` but still contain invalid JSON.

Example endpoint:

```text
http://localhost:3000/invalid-json
```

The HTTP request succeeds, but:

```js
await response.json();
```

fails because the response body is not valid JSON.

This is called a parse error.

---

# 7. AbortController and Timeout

`AbortController` can cancel an ongoing `fetch()` request.

Example:

```js
const controller = new AbortController();

const timeout = setTimeout(() => {
  controller.abort();
}, 2000);

const response = await fetch(url, {
  signal: controller.signal
});
```

In T15, the `/slow` endpoint waits for 5 seconds.

The timeout is set to 2 seconds.

Therefore, the request is cancelled before the server responds.

Expected result:

```text
Final Error: Request timed out
```

---

# 8. Retry

Retry means attempting the request again after a temporary failure.

T15 does not retry every error.

The utility retries only HTTP `503 Service Unavailable`.

Example:

```text
Attempt 1 → 503
Attempt 2 → 503
Attempt 3 → 200
```

This prevents unnecessary retries for errors that are unlikely to succeed by trying again.

---

# 9. Retry Limit

Retries must always have a maximum limit.

T15 uses:

```js
maxAttempts = 3
```

Therefore, the request can run at most three attempts.

This prevents an infinite retry loop.

Example:

```text
Attempt 1
Attempt 2
Attempt 3
Stop
```

Even if all three attempts fail, the utility stops and returns the final error.

---

# 10. Backoff

Backoff means waiting before trying again.

T15 uses exponential backoff:

```text
Attempt 1 fails
↓
Wait 500ms

Attempt 2 fails
↓
Wait 1000ms

Attempt 3
```

The calculation is:

```js
const backoff = 500 * 2 ** (attempt - 1);
```

This gives:

```text
Attempt 1 → 500ms
Attempt 2 → 1000ms
Attempt 3 → 2000ms
```

Backoff helps avoid immediately sending repeated requests to an already overloaded server.

---

# 11. Transient Failure

A transient failure is a temporary problem that may succeed if the request is tried again.

Example:

```text
503 Service Unavailable
```

T15 treats `503` as retryable.

Other errors should not automatically be retried.

For example:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```

These generally require fixing the request or authentication rather than repeatedly sending the same request.

---

# 12. Non-Idempotent Requests

Special care is required when retrying operations such as order creation.

For example:

```text
POST /orders
```

Suppose the server successfully creates an order but the response is lost because of a network problem.

The client may think the request failed and send the POST again.

This could create:

```text
Order #101
Order #102
```

instead of one order.

Therefore, non-idempotent operations such as order creation should not be blindly retried.

A common solution is an idempotency key or another server-side mechanism that allows the server to recognize duplicate requests.

---

# 13. Running the T15 Programs

Keep the mock server running in Terminal 1.

Open Terminal 2:

```powershell
cd C:\Users\Bhumi\OneDrive\Desktop\Backend_learning\T15
```

Run the basic fetch helper:

```powershell
node fetch-helper.js
```

Run timeout test:

```powershell
node timeout.js
```

Run retry test:

```powershell
node retry.js
```

Run the final utility:

```powershell
node final-fetch.js
```

---

# 14. Retry Test Output

The retry test produced:

```text
Attempt 1: http://localhost:3000/temporary
Attempt 1 failed: HTTP Error: 503
Waiting 500ms before retry...
Attempt 2: http://localhost:3000/temporary
Attempt 2 failed: HTTP Error: 503
Waiting 1000ms before retry...
Attempt 3: http://localhost:3000/temporary
Request successful
Final data: { success: true, message: 'Request succeeded after retry' }
```

This confirms:

* The first request received `503`.
* The second request received `503`.
* The utility waited between attempts.
* The third request succeeded.
* The retry count was limited to 3.

---

# 15. Final Fetch Utility

`final-fetch.js` combines the main T15 concepts:

* HTTP status checking
* `AbortController`
* Timeout
* JSON parsing
* Error classification
* Retry limit
* Retry of `503`
* Exponential backoff
* Final error reporting

Example configuration:

```js
{
  timeoutMs: 3000,
  maxAttempts: 3
}
```

---

# 16. Verification Checklist

The following requirements were verified:

* [x] HTTP status is checked.
* [x] Success data is parsed only after status checking.
* [x] HTTP errors are distinguished from other errors.
* [x] JSON parse errors are handled.
* [x] Network errors are handled.
* [x] `AbortController` is used.
* [x] Timed-out requests are stopped.
* [x] Retry attempts are limited.
* [x] Only suitable transient failures are retried.
* [x] Backoff is used between retries.
* [x] Infinite retry loops are prevented.
* [x] Non-idempotent order creation is not blindly retried.

---

# 17. Final Checkpoint

The main lesson from T15 is:

```text
Fetch Request
     ↓
Check HTTP Status
     ↓
Is it a retryable transient failure?
     ↓
   Yes → Retry with limit + backoff
     ↓
   No
     ↓
Parse successful response
     ↓
Handle parse/network/timeout errors
```

The most important rule is:

> Do not retry every failure.

Retry should be limited to suitable transient failures, and non-idempotent operations such as order creation require special retry/idempotency handling.

---

# T15 Completed

T15 successfully covers HTTP fetching, status handling, error classification, cancellation, timeout, retry limits, backoff, and safe retry design.
