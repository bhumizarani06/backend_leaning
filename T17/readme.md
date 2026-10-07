# T17 - File System and JSON Product CLI

## Objective

The objective of T17 is to learn how to use Node.js asynchronous File System APIs to store and retrieve product data using a JSON file.

## Concepts Covered

* Node.js `fs/promises`
* Asynchronous file operations
* `readFile()`
* `writeFile()`
* `rename()`
* `mkdir()`
* `path.resolve()`
* `path.join()`
* `process.cwd()`
* JSON `parse()`
* JSON `stringify()`
* Error handling
* Handling missing files with `ENOENT`
* Handling malformed JSON
* CLI arguments using `process.argv`
* Input validation
* Temporary file and rename technique
* Concurrent file write limitations

## Project Structure

```text
T17/
├── data/
│   └── products.json
├── package.json
├── product.js
└── README.md
```

## How It Works

The application stores product data inside:

```text
data/products.json
```

The file path is created using Node.js `path` utilities.

If the file does not exist, the application creates the `data` directory and initializes the file with an empty array.

If the JSON file contains invalid JSON, the application does not silently replace it with an empty array. Instead, the JSON parsing error is thrown.

## Commands

### List Products

```bash
node product.js list-products
```

Example:

```text
Products:
[
  { id: 1, name: 'Laptop', price: 50000 },
  { id: 2, name: 'Mobile', price: 25000 },
  { id: 3, name: 'Keyboard', price: 2000 }
]
```

### Add Product

```bash
node product.js add-product Laptop 50000
```

Example output:

```text
Product added successfully.
{ id: 1, name: 'Laptop', price: 50000 }
```

Another example:

```bash
node product.js add-product Mobile 25000
```

Output:

```text
Product added successfully.
{ id: 2, name: 'Mobile', price: 25000 }
```

## Input Validation

The application validates the product price before saving.

For example:

```bash
node product.js add-product Watch abc
```

Output:

```text
Product price must be a number.
```

The invalid product is not saved.

The application also checks that:

* Product name is provided.
* Product price is provided.
* Product price must be a valid number.
* Product price must be greater than `0`.

## Missing File Handling

If `products.json` does not exist, the application detects the `ENOENT` error.

It then creates the required directory and initializes the file with:

```json
[]
```

This allows the application to start with an empty product list.

## Malformed JSON Handling

If `products.json` contains invalid JSON, the application throws a `SyntaxError`.

Example:

```text
SyntaxError: Expected ',' or '}' after property value
```

The application does not replace the corrupted file with an empty array.

This prevents accidental data loss.

## Safer File Saving

Instead of directly writing to `products.json`, the application first writes the updated data to a temporary file:

```text
products.json.tmp
```

After the write is successful, the temporary file is renamed to:

```text
products.json
```

The process is:

```text
Product Data
     ↓
products.json.tmp
     ↓
Successful Write
     ↓
rename()
     ↓
products.json
```

This reduces the risk of leaving the main JSON file partially written.

## Concurrent Write Limitation

This project uses a JSON file for learning purposes.

It is **not a database** and is not designed for multiple concurrent writers.

For example, two processes may read the same old data, make different changes, and then write their versions. One update can overwrite the other.

This is known as a **lost update** or **last-write-wins** problem.

For real applications with multiple users and concurrent updates, a database such as MongoDB, PostgreSQL, or MySQL should be used.

## Final Test

The application successfully stored:

```text
Laptop - 50000
Mobile - 25000
Keyboard - 2000
```

Invalid input:

```bash
node product.js add-product Watch abc
```

was rejected with:

```text
Product price must be a number.
```

The invalid product was not saved.

## Key Learning

T17 demonstrates how Node.js can:

1. Read data asynchronously from a file.
2. Write data asynchronously to a file.
3. Convert JSON text into JavaScript objects using `JSON.parse()`.
4. Convert JavaScript objects into JSON text using `JSON.stringify()`.
5. Handle missing files using `ENOENT`.
6. Detect malformed JSON.
7. Resolve file paths using the `path` module.
8. Build a simple CLI using `process.argv`.
9. Validate user input.
10. Use a temporary file and `rename()` for safer file saving.
11. Understand why a JSON file is not suitable for concurrent database-style operations.

## Conclusion

T17 provided practical experience with Node.js File System and Path modules by building a CLI application that adds and lists products stored in a JSON file.

The task also demonstrated proper error handling, input validation, malformed JSON handling, and safer file-writing techniques.
