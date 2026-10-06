const http = require("http");

let temporaryAttempts = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/success") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: true,
      message: "Request successful"
    }));
  }

  else if (req.url === "/invalid-json") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end("{ invalid json }");
  }

  else if (req.url === "/slow") {
    setTimeout(() => {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: true,
        message: "Slow response"
      }));
    }, 5000);
  }

  else if (req.url === "/unavailable") {
    res.writeHead(503, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: false,
      message: "Service temporarily unavailable"
    }));
  }

  else if (req.url === "/temporary") {
    temporaryAttempts++;

    if (temporaryAttempts < 3) {
      res.writeHead(503, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: false,
        message: "Temporary failure"
      }));
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        success: true,
        message: "Request succeeded after retry"
      }));
    }
  }

  else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      success: false,
      message: "Route not found"
    }));
  }
});

server.listen(3000, () => {
  console.log("Mock server running on http://localhost:3000");
});