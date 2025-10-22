function myLogger(req, res, next) {
  console.log(`Received request for: ${req.url}`);

  if (req.url === "/users") {
    next();
  }
}

export default myLogger;
