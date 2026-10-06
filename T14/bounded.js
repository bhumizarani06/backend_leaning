// T14 - Bounded concurrency

function processTask(taskNumber) {
  return new Promise((resolve) => {
    const delay = 1000 + Math.random() * 2000;

    console.log(`Task ${taskNumber} started`);

    setTimeout(() => {
      console.log(`Task ${taskNumber} completed`);
      resolve(taskNumber);
    }, delay);
  });
}

async function runWithLimit(tasks, limit) {
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex++;

      results[currentIndex] = await processTask(tasks[currentIndex]);
    }
  }

  const workers = [];

  for (let i = 0; i < limit; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  return results;
}

async function main() {
  const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  console.log("Starting tasks...");

  const results = await runWithLimit(tasks, 3);

  console.log("All tasks completed:");
  console.log(results);
}

main();