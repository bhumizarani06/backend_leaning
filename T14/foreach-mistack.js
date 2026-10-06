// T14 - async forEach mistake

function processTask(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${task} completed`);
      resolve();
    }, 1000);
  });
}

async function main() {
  const tasks = [1, 2, 3];

  tasks.forEach(async (task) => {
    await processTask(task);
  });

  console.log("Done");
}

main();