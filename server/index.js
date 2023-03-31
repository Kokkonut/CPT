const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const db = require("./config/connection");
const passport = require("passport");
const bodyParser = require("body-parser");

const BUILD_DIR = path.join(__dirname, "../build");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression());
app.disable("x-powered-by");

// API routes
app.use('/api', apiRoutes);

// Static assets
app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }));
app.use(express.static("public", { maxAge: "1h" }));

// Logging
app.use(morgan("tiny"));

// Remix request handler
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

const port = process.env.PORT || 3000;

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
});

function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
