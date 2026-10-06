# T12 — Call Stack

## Objective

The objective of T12 is to understand JavaScript call-stack execution and basic asynchronous scheduling.

Topics covered:

* Synchronous call-stack execution
* Function calls and the call stack
* `setTimeout()` scheduling
* Promise microtasks
* Timer callbacks
* Blocking the JavaScript thread
* Timer delay
* Concurrency vs parallelism

---

# 1. Synchronous Call Stack

JavaScript executes synchronous code sequentially.

A function call is added to the call stack and removed when the function finishes.

## Example 1 — Basic Call Stack

### Input

```js
console.log("Start");

function first() {
    console.log("Inside first");
}

first();

console.log("End");
```

### Prediction

```text
Start
Inside first
End
```

### Actual Output

```text
Start
Inside first
End
```

### Explanation

The synchronous statements execute one after another.

The `first()` function is pushed onto the call stack when called and removed after it finishes.

---

# 2. Nested Function Calls

## Example 2

### Input

```js
console.log("Start");

function one() {
    console.log("One");

    function two() {
        console.log("Two");
    }

    two();

    console.log("One End");
}

one();

console.log("End");
```

### Prediction

```text
Start
One
Two
One End
End
```

### Actual Output

```text
Start
One
Two
One End
End
```

### Call Stack Flow

```text
Global
  ↓
one()
  ↓
two()
```

When `two()` completes, it is removed from the stack.

Then `one()` completes and is removed.

---

# 3. setTimeout() Scheduling

## Example 3

### Input

```js
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

console.log("End");
```

### Prediction

```text
Start
End
Timer
```

### Actual Output

```text
Start
End
Timer
```

### Explanation

`setTimeout()` schedules a callback. It does not pause the current JavaScript execution.

Even with a delay of `0`, the callback does not execute immediately.

The synchronous code runs first:

```text
Start
End
```

Then the timer callback can execute.

---

# 4. Promise Microtask vs Timer

## Example 4

### Input

```js
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

### Prediction

```text
Start
End
Promise
Timer
```

### Actual Output

```text
Start
End
Promise
Timer
```

### Explanation

The synchronous code executes first:

```text
Start
End
```

The Promise `.then()` callback is a microtask.

The timer callback is scheduled through the timer/event-loop mechanism.

In this common case, after the current synchronous execution completes, the Promise microtask runs before the timer callback.

---

# 5. Multiple Promises and Timers

## Example 5

### Input

```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");

Promise.resolve().then(() => {
    console.log("E");
});

setTimeout(() => {
    console.log("F");
}, 0);
```

### Prediction

```text
A
D
C
E
B
F
```

### Actual Output

```text
A
D
C
E
B
F
```

### Explanation

Synchronous code:

```text
A
D
```

Microtasks:

```text
C
E
```

Timer callbacks:

```text
B
F
```

Therefore:

```text
A
D
C
E
B
F
```

---

# 6. Blocking the JavaScript Thread

## Timer Delay Experiment

### Input

```js
console.log("Start");

setTimeout(() => {
    console.log("Timer executed");
}, 0);

const start = Date.now();

while (Date.now() - start < 3000) {
    // Block the JavaScript thread for about 3 seconds
}

console.log("Loop finished");
```

### Prediction

The timer has a delay of `0`, so it may be tempting to predict:

```text
Start
Timer executed
Loop finished
```

However, the JavaScript thread is blocked by the loop.

### Actual Output

```text
Start
Loop finished
Timer executed
```

### Explanation

The timer callback is scheduled, but the JavaScript thread is busy executing the loop.

The callback cannot execute until the current blocking synchronous work finishes.

Flow:

```text
setTimeout()
     ↓
Timer scheduled
     ↓
Blocking loop
     ↓
Loop finished
     ↓
Timer callback executes
```

---

# 7. Why setTimeout(0) Does Not Execute Immediately

`setTimeout(callback, 0)` does not mean:

> Execute the callback immediately.

It means the callback is scheduled with a minimum delay of approximately zero milliseconds and becomes eligible to run when the runtime can process it.

Current synchronous JavaScript execution must finish first.

Therefore:

```js
setTimeout(callback, 0);
```

is not an exact immediate-execution mechanism.

---

# 8. Why Timers Are Not Exact Scheduling Guarantees

For example:

```js
setTimeout(task, 1000);
```

does not guarantee that `task()` will execute exactly 1000 milliseconds later.

The callback may be delayed if:

* The JavaScript thread is busy.
* Other callbacks are being processed.
* The runtime/event loop has other work to process.

Therefore, timers should not be treated as exact real-time scheduling guarantees.

---

# 9. Concurrency

Concurrency means that multiple tasks can make progress during overlapping periods and the runtime can manage their execution.

For example:

```text
Task A → waiting for I/O
Task B → executing
Task A → continues
Task C → executing
```

The tasks do not necessarily execute at exactly the same instant.

Node.js uses asynchronous mechanisms to handle many I/O operations efficiently.

---

# 10. Parallelism

Parallelism means multiple tasks can actually execute at the same time, commonly using multiple CPU cores or execution threads.

Example:

```text
CPU Core 1 → Task A
CPU Core 2 → Task B
```

Both tasks can execute simultaneously.

---

# 11. Concurrency vs Parallelism

| Concurrency                                    | Parallelism                               |
| ---------------------------------------------- | ----------------------------------------- |
| Multiple tasks can make overlapping progress   | Multiple tasks execute simultaneously     |
| Focuses on managing multiple tasks             | Focuses on simultaneous execution         |
| Can exist with a single main JavaScript thread | Commonly uses multiple cores/threads      |
| Important for asynchronous I/O                 | Important for CPU-intensive parallel work |

Therefore:

```text
Concurrency ≠ Parallelism
```

---

# 12. Key Learnings

1. JavaScript synchronous code executes through the call stack.
2. Function calls are pushed onto the call stack.
3. Completed function calls are removed from the call stack.
4. `setTimeout()` schedules a callback instead of pausing JavaScript.
5. `setTimeout(..., 0)` does not mean immediate execution.
6. Promise `.then()` callbacks are microtasks.
7. In common cases, microtasks are processed before timer callbacks after synchronous execution completes.
8. Blocking the JavaScript thread delays callbacks.
9. Timers do not provide exact execution-time guarantees.
10. Concurrency and parallelism are different concepts.

---

# 13. Reproducible Verification

## Environment

Node.js was used to execute the examples.

Check the installed version with:

```bash
node --version
```

## Run Commands

Run each example from the T12 directory:

```bash
node callstack1.js
node callstack2.js
node callstack3.js
node callstack4.js
node callstack5.js
node timer-delay.js
```

## Verification

The output of each example was compared with the predicted output.

The timer-delay experiment demonstrated that a `0 ms` timer can be delayed when the JavaScript thread is blocked.

---

# Conclusion

T12 demonstrates how the JavaScript call stack executes synchronous code and how asynchronous callbacks are scheduled.

The key lesson is that:

```text
setTimeout(..., 0)
```

does not mean immediate execution.

The callback must wait until the current synchronous execution has completed and the runtime is able to process the callback.

Promises use microtasks, while timers use timer/event-loop scheduling mechanisms. Understanding these concepts helps explain the execution order of asynchronous JavaScript programs.
