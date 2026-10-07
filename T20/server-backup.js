/*
const http = require("http");

const PORT = 3000;

let shuttingDown = false;

const server = http.createServer((req, res) => {
    if (shuttingDown) {
        res.statusCode = 503;
        res.end("Server is shutting down. Try again later.");
        return;
    }

    res.end("Server is running.");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

function shutdown(signal) {
    console.log(`\n${signal} received.`);
    console.log("Starting graceful shutdown...");

    shuttingDown = true;

    server.close(() => {
        console.log("Server stopped accepting new requests.");
        console.log("All existing requests completed.");
        console.log("Shutdown complete.");
    });
}

process.on("SIGINT", () => {
    shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});

*/

const http = require("http");

const PORT = 3000;
const DRAIN_TIMEOUT_MS = 10000;

let shuttingDown = false;
let forceTimer = null;
let shutdownFinished = false;

const server = http.createServer((req, res) => {
    if (shuttingDown) {
        res.statusCode = 503;
        res.setHeader("Content-Type", "text/plain");
        res.end("Server is shutting down. Try again later.");
        return;
    }

    if (req.url === "/slow") {
        console.log("Slow request started.");

        setTimeout(() => {
            if (!res.writableEnded) {
                res.end("Slow request completed.");
            }

            console.log("Slow request completed.");
        }, 5000);

        return;
    }

    res.end("Server is running.");
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

function finishShutdown(message) {
    if (shutdownFinished) {
        return;
    }

    shutdownFinished = true;

    if (forceTimer) {
        clearTimeout(forceTimer);
        forceTimer = null;
    }

    console.log(message);
    console.log("Server closed.");
    console.log("Shutdown complete.");
}

function shutdown(signal) {
    if (shuttingDown) {
        return;
    }

    shuttingDown = true;

    console.log(`\n${signal} received.`);
    console.log("Stopping new traffic...");

    server.close(() => {
        finishShutdown("Existing requests drained.");
    });

    forceTimer = setTimeout(() => {
        console.log("Drain timeout reached.");
        console.log("Closing remaining connections.");

        if (typeof server.closeAllConnections === "function") {
            server.closeAllConnections();
        }

        finishShutdown("Remaining connections closed.");
    }, DRAIN_TIMEOUT_MS);

    forceTimer.unref();
}

process.on("SIGINT", () => {
    shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});