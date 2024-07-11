const { spawn } = require("child_process");
const express = require("express");
const app = express();
const logger = require("./utils/log.js");
const path = require('path');
const net = require('net');

const PORT = 3002; // Choose a fixed port number (e.g., 3002)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/includes/login/cover/index.html'));
});

console.clear();
startBot(0);

async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.once('close', () => resolve(true)).close();
      })
      .listen(port, '127.0.0.1');
  });
}

function startServer(port) {
  app.listen(port, () => {
    logger.loader(`Bot is running on port: ${port}`);
  });

  app.on('error', (error) => {
    logger(`An error occurred while starting the server: ${error}`, "SYSTEM");
  });
}

async function startBot(index) {
  logger(`Getting Started!`, "STARTER");
  try {
    const isAvailable = await isPortAvailable(PORT);
    if (!isAvailable) {
      logger.loader(`Port ${PORT} is not available.`);
      return;
    }

    startServer(PORT);

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js", "custom.js"], {
      cwd: __dirname,
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        CHILD_INDEX: index,
      },
    });

    child.on("close", (codeExit) => {
      if (codeExit !== 0) {
        startBot(index);
      }
    });

    child.on("error", (error) => {
      logger(`An error occurred while starting the child process: ${error}`, "SYSTEM");
    });
  } catch (err) {
    logger(`Error while starting the bot: ${err}`, "SYSTEM");
  }
}
