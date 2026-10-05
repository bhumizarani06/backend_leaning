# T01 — Editor

## Goal

Install and verify Node.js, create a Node.js project, run JavaScript using Node.js, and create an npm start script.

## Environment

* Operating System: Windows
* Editor: Visual Studio Code
* Node.js: v24.18.0
* npm: 11.18.0

## Project Structure

```text
T01/
├── index.js
├── package.json
└── README.md
```

## Commands Used

### Check current directory

```powershell
pwd
```

### Create project folder

```powershell
mkdir T01
```

### Enter project folder

```powershell
cd T01
```

### Initialize npm project

```powershell
npm init
```

### Check Node.js version

```powershell
node --version
```

Output:

```text
v24.18.0
```

### Check npm version

```powershell
npm --version
```

Output:

```text
11.18.0
```

## JavaScript Code

The `index.js` file contains:

```javascript
console.log("hiii this is my first node.js practicle");
```

## Run JavaScript Directly

Command:

```powershell
node index.js
```

Output:

```text
hiii this is my first node.js practicle
```

## npm Start Script

The `package.json` contains:

```json
"scripts": {
  "start": "node index.js"
}
```

## Run Using npm

Command:

```powershell
npm start
```

Output:

```text
hiii this is my first node.js practicle
```

## Verification

The project was successfully verified by:

1. Running `node index.js`
2. Running `npm start`
3. Confirming that both commands execute `index.js`
4. Confirming the expected message is printed
5. Recording Node.js and npm versions

## Common Mistake

JavaScript code should be written inside a `.js` file such as `index.js`.

Correct:

```javascript
console.log("hiii this is my first node.js practicle");
```

Then run it from the terminal:

```powershell
node index.js
```

JavaScript code should not be typed directly into PowerShell as a terminal command.
