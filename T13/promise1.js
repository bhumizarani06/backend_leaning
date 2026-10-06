const promise = new Promise((resolve, reject) => {
    resolve("Task completed");
});

promise.then((result) => {
    console.log(result);
});