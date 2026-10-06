# T16 - Runtime vs Browser and Node.js CLI

## Objective

Understand the difference between Browser JavaScript and Node.js runtime, and build a simple command-line cart calculator using Node.js.

## Topics Covered

* Browser APIs vs Node.js APIs
* `package.json`
* npm scripts
* Dependencies
* `package-lock.json`
* `node_modules`
* ESM (ECMAScript Modules)
* `process.argv`
* `process.env`
* Input validation
* `NaN`
* Exit codes
* Clean installation using `npm install`

---

## 1. Browser vs Node.js

Browser JavaScript can use browser APIs such as:

* `document`
* `window`
* DOM

Node.js provides runtime APIs such as:

* `fs`
* `process`
* `path`

### Node.js Example

```js
import fs from "node:fs";

fs.writeFileSync("test.txt", "Hello from Node.js");

console.log("File created");
```

---

## 2. ESM - ECMAScript Modules

This project uses ECMAScript Modules.

The following setting is present in `package.json`:

```json
"type": "module"
```

This allows the use of:

```js
import fs from "node:fs";
```

and:

```js
export function add(a, b) {
    return a + b;
}
```

---

## 3. package.json

`package.json` contains project information, scripts, and dependencies.

### npm Scripts

```json
"scripts": {
    "start": "node cart.js",
    "test": "node cart.js 3"
}
```

### Start Command

```bash
npm start
```

This runs:

```bash
node cart.js
```

### Test Command

```bash
npm test
```

This runs:

```bash
node cart.js 3
```

---

## 4. Dependencies

This project uses `lodash` as a dependency.

Dependencies can be installed using:

```bash
npm install
```

Installed packages are stored inside:

```text
node_modules/
```

---

## 5. package-lock.json

`package-lock.json` records the resolved dependency information used by npm.

It helps make installations more reproducible.

The project contains:

```text
package.json
package-lock.json
node_modules/
```

---

## 6. process.argv

`process.argv` is used to read command-line arguments.

Example:

```bash
node cart.js 5
```

Here:

```text
process.argv[2] = "5"
```

Command-line arguments are received as strings.

Therefore, the value is converted to a number:

```js
const quantity = Number(process.argv[2]);
```

Example:

```text
"5" → 5
```

---

## 7. process.env

`process.env` is used to read environment variables.

Example in PowerShell:

```powershell
$env:PRICE="100"
```

Then run:

```bash
node cart.js 5
```

Output:

```text
Quantity: 5
Price: 100
Total: 500
```

The price can be changed without modifying the source code:

```powershell
$env:PRICE="200"
```

Then:

```bash
node cart.js 5
```

Output:

```text
Quantity: 5
Price: 200
Total: 1000
```

---

## 8. Cart Calculation

The application calculates the cart total using:

```text
Total = Quantity × Price
```

Example:

```powershell
$env:PRICE="100"
node cart.js 10
```

Output:

```text
Quantity: 10
Price: 100
Total: 1000
```

---

## 9. Input Validation

The application validates the quantity before calculating the total.

### Invalid Examples

```bash
node cart.js
node cart.js abc
node cart.js -5
node cart.js 0
```

Output:

```text
Error: Please enter a valid quantity.
```

The application uses `Number.isFinite()` and a positive quantity check.

---

## 10. NaN

`NaN` means **Not a Number**.

For example:

```js
Number("abc")
```

returns:

```text
NaN
```

Therefore, invalid command-line input must be checked before performing the calculation.

---

## 11. Exit Codes

A successful program normally finishes with exit code:

```text
0
```

Invalid input sets:

```js
process.exitCode = 1;
```

To check the exit code in PowerShell:

```powershell
$LASTEXITCODE
```

### Successful Example

```bash
node cart.js 100
```

Then:

```powershell
$LASTEXITCODE
```

Output:

```text
0
```

### Invalid Example

```bash
node cart.js abc
```

Then:

```powershell
$LASTEXITCODE
```

Output:

```text
1
```

---

## 12. Clean Installation

The project was tested with a clean installation.

First remove `node_modules`:

```powershell
Remove-Item -Recurse -Force node_modules
```

Then install dependencies again:

```powershell
npm install
```

Set the price:

```powershell
$env:PRICE="100"
```

Run the test:

```powershell
npm test
```

Expected output:

```text
Quantity: 3
Price: 100
Total: 300
```

This verifies that the project can be installed and executed again using the project configuration.

---

## 13. Project Structure

```text
T16/
│
├── browser.html
├── cart.js
├── env-test.js
├── node-test.js
├── package.json
├── package-lock.json
├── README.md
└── node_modules/
```

---

## 14. How to Run

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Set the price

PowerShell:

```powershell
$env:PRICE="100"
```

### Step 3: Run the CLI

```bash
node cart.js 5
```

Expected output:

```text
Quantity: 5
Price: 100
Total: 500
```

### Step 4: Run using npm

```bash
npm test
```

Expected output:

```text
Quantity: 3
Price: 100
Total: 300
```

---

## 15. Verification

The following functionality was successfully tested:

* Browser vs Node.js runtime
* Node.js file system API
* ESM configuration
* `package.json`
* npm scripts
* Dependencies
* `package-lock.json`
* `process.argv`
* Quantity conversion
* Cart total calculation
* Input validation
* `NaN` handling
* `process.env`
* Exit code `0` for successful execution
* Exit code `1` for invalid input
* `npm start`
* `npm test`
* Clean `npm install`

---

## Conclusion

T16 demonstrated how JavaScript behaves differently in the browser and Node.js runtime. A Node.js command-line cart calculator was created using `process.argv` for user input and `process.env` for configuration.

The project also covered npm scripts, dependencies, lockfiles, ESM, input validation, exit codes, and reproducible installation.
