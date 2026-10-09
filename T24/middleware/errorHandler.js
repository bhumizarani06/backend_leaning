export function errorHandler(err, req, res, next) {
if (res.headersSent) {
return next(err);
}


const isInvalidJson =
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err;

const statusCode = isInvalidJson
    ? 400
    : (err.statusCode || 500);

const code = isInvalidJson
    ? "INVALID_JSON"
    : (err.code || "INTERNAL_ERROR");

let message;

if (isInvalidJson) {
    message = "Invalid JSON request body";
} else if (statusCode >= 500) {
    message = "Internal server error";
} else if (
    err.name === "AppError" &&
    err.isOperational === true
) {
    message = err.message;
} else {
    message = "Request failed";
}

console.error({
    requestId: req.requestId,
    code,
    message: err.message,
    stack: err.stack
});

return res.status(statusCode).json({
    success: false,
    error: {
        code,
        message
    },
    requestId: req.requestId || "unknown"
});


}
