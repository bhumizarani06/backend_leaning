
const rawPort = process.env.PORT ?? "5000";

const port = Number(rawPort);

if (
  rawPort.trim() === "" ||
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535
) {
  throw new Error(
    "Invalid PORT. Please provide a port between 1 and 65535."
  );
}

export const config = {
  port
};
