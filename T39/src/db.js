const mysql = require("mysql2/promise");
const readline = require("node:readline/promises");

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const password = await rl.question("MySQL root password: ");

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password,
      database: "t39_shop_test",
    });

    console.log("Connected to T39 test database!");

    const [rows] = await connection.execute(
      "SELECT name, price FROM products WHERE price < ?",
      [50]
    );

    console.log("Products priced below 50:", rows);

    await connection.end();
  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();