/*
import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("Request received");

  res.end("Hello from Node.js HTTP server");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
*/

/*

import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  res.end("Request received");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
*/

/*
import http from "http";
const server =http. createServer((req,res) =>{
    const url = new URL(req.url,"http://localhost:3000");
  
    console.log("method:",req.method);
    console.log("path:",url.Pathname);
    console.log("name:",url.searchParams.get("name"));

    res.end("req received");
});

server.listen(3000,()=>
{
console.log("server is running");
});
*/

/*
import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  let body = "";

  req.on("data", (chunk) => {
    console.log("Chunk received:", chunk.toString());
    body += chunk.toString();
  });

  req.on("end", () => {
    console.log("Complete body:", body);

    res.end("Body received");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

*/
/*
import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    if (req.method === "POST") {
      try {
        const product = JSON.parse(body);

        console.log("Product:", product);
        console.log("Product name:", product.name);
        console.log("Product price:", product.price);

        res.statusCode = 200;
        res.end("JSON parsed successfully");
      } catch (error) {
        console.log("Invalid JSON");

        res.statusCode = 400;
        res.end("Invalid JSON");
      }

      return;
    }

    res.end("Request received");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
*/

/*
import http from "node:http";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },
  {
    id: 2,
    name: "Mobile",
    price: 25000
  }
];

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;

  res.setHeader(
    "Content-Type",
    "application/json"
  );

  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const url = new URL(
    req.url,
    "http://localhost:3000"
  );

  // GET /health
  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, {
      status: "ok"
    });

    return;
  }

  // GET /products
  if (req.method === "GET" && url.pathname === "/products") {
    sendJson(res, 200, products);

    return;
  }

  // POST /products
  if (req.method === "POST" && url.pathname === "/products") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const product = JSON.parse(body);

        const newProduct = {
          id: products.length + 1,
          name: product.name,
          price: product.price
        };

        products.push(newProduct);

        sendJson(res, 201, newProduct);
      } catch (error) {
        sendJson(res, 400, {
          error: "Invalid JSON"
        });
      }
    });

    return;
  }

  // Unknown route
  sendJson(res, 404, {
    error: "Route not found"
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
*/
import http from "node:http";

const MAX_BODY_SIZE = 10 * 1024; // 10 KB

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },
  {
    id: 2,
    name: "Mobile",
    price: 25000
  }
];

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.statusCode = statusCode;

  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  for (const [name, value] of Object.entries(extraHeaders)) {
    res.setHeader(name, value);
  }

  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const url = new URL(
    req.url,
    "http://localhost:3000"
  );

  console.log("Method:", req.method);
  console.log("Path:", url.pathname);

  // GET /health
  if (
    req.method === "GET" &&
    url.pathname === "/health"
  ) {
    sendJson(res, 200, {
      status: "ok"
    });

    return;
  }

  // GET /products
  if (
    req.method === "GET" &&
    url.pathname === "/products"
  ) {
    const search = url.searchParams.get("name");

    let result = products;

    if (search) {
      result = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    sendJson(res, 200, result);

    return;
  }

  // POST /products
  if (
    req.method === "POST" &&
    url.pathname === "/products"
  ) {
    let body = "";
    let bodySize = 0;
    let tooLarge = false;

    req.on("data", (chunk) => {
      if (tooLarge) {
        return;
      }

      bodySize += chunk.length;

      if (bodySize > MAX_BODY_SIZE) {
        tooLarge = true;

        sendJson(res, 413, {
          error: "Request body too large"
        });

        req.resume();

        return;
      }

      body += chunk.toString("utf8");
    });

    req.on("end", () => {
      if (tooLarge) {
        return;
      }

      let product;

      // JSON parsing
      try {
        product = JSON.parse(body);
      } catch (error) {
        sendJson(res, 400, {
          error: "Invalid JSON"
        });

        return;
      }

      // Validate product object
      if (
        typeof product !== "object" ||
        product === null ||
        Array.isArray(product)
      ) {
        sendJson(res, 400, {
          error: "Product must be a JSON object"
        });

        return;
      }

      // Validate name
      if (
        typeof product.name !== "string" ||
        product.name.trim() === ""
      ) {
        sendJson(res, 400, {
          error: "Product name is required"
        });

        return;
      }

      // Validate price
      if (
        typeof product.price !== "number" ||
        Number.isNaN(product.price) ||
        product.price <= 0
      ) {
        sendJson(res, 400, {
          error: "Product price must be a positive number"
        });

        return;
      }

      // Create product
      const newProduct = {
        id: products.length + 1,
        name: product.name.trim(),
        price: product.price
      };

      products.push(newProduct);

      sendJson(res, 201, newProduct);
    });

    return;
  }

  // Known route but unsupported method
  if (
    url.pathname === "/health" ||
    url.pathname === "/products"
  ) {
    const allowedMethods =
      url.pathname === "/health"
        ? "GET"
        : "GET, POST";

    sendJson(
      res,
      405,
      {
        error: "Method not allowed"
      },
      {
        Allow: allowedMethods
      }
    );

    return;
  }

  // Unknown route
  sendJson(res, 404, {
    error: "Route not found"
  });
});

server.listen(3000, () => {
  console.log(
    "Server is running on http://localhost:3000"
  );
});