const http = require("http");
const { readFile } = require("fs").promises;

const PORT = 3000;
const FILE = "./products.json";
const DRAIN_TIMEOUT_MS = 10000;

let shuttingDown = false;
let forceTimer = null;
let shutdownFinished = false;

async function readProducts() {
    const data = await readFile(FILE, "utf-8");
    return JSON.parse(data);
}

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
    if (shuttingDown) {
        sendJson(res, 503, {
            error: "Server is shutting down"
        });
        return;
    }

    try {
        if (req.method === "GET" && req.url === "/") {
            sendJson(res, 200, {
                message: "Product API is running"
            });
            return;
        }

        if (req.method === "GET" && req.url === "/products") {
            const products = await readProducts();

            sendJson(res, 200, products);
            return;
        }

        if (
            req.method === "GET" &&
            req.url.startsWith("/products/")
        ) {
            const idText = req.url.split("/")[2];
            const id = Number(idText);

            if (!Number.isInteger(id)) {
                sendJson(res, 400, {
                    error: "Product ID must be a number"
                });
                return;
            }

            const products = await readProducts();

            const product = products.find(
                (item) => item.id === id
            );

            if (!product) {
                sendJson(res, 404, {
                    error: "Product not found"
                });
                return;
            }

            sendJson(res, 200, product);
            return;
        }

        if (req.method === "GET" && req.url === "/slow") {
            console.log("Slow request started.");

            setTimeout(() => {
                if (!res.writableEnded) {
                    res.end("Slow request completed.");
                }

                console.log("Slow request completed.");
            }, 5000);

            return;
        }

        sendJson(res, 404, {
            error: "Route not found"
        });

    } catch (error) {
        console.log("Request error:", error.message);

        if (!res.writableEnded) {
            sendJson(res, 500, {
                error: "Internal server error"
            });
        }
    }
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