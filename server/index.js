// Import required modules
const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const db = require("./config/connection");

// Set the path to the build directory (where the Remix application's static files are located)
const BUILD_DIR = path.join(__dirname, "../build");

// Create an instance of the Express application
const app = express();

// Use the compression middleware to enable gzip compression of HTTP responses
app.use(compression());

// Disable the "x-powered-by" header for security reasons
app.disable("x-powered-by");

// Serve static assets from the build directory, with a cache expiration of 1 year
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

app.use(express.static("public", { maxAge: "1h" }));


// Serve other static assets (such as favicon.ico) from the public directory, with a cache expiration of 1 hour
app.use(express.static("public", { maxAge: "1h" }));

// Use the Morgan middleware to log HTTP requests in a "tiny" format to the console
app.use(morgan("tiny"));

// Handle all HTTP requests with the Remix application's request handler
app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);

// Start the Express application on the specified port
const port = process.env.PORT || 3000;

db.once("open", () => {
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
});

// A helper function to purge the Node.js require cache for the build directory
function purgeRequireCache() {
  // This purges the require cache on requests for "server side HMR" (Hot Module Replacement).
  // This prevents in-memory objects from persisting between requests in development mode.
  // In production mode, the require cache is not purged between requests.
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
