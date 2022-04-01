const express = require('express');
const cors = require('cors');
const wa = require('@open-wa/wa-automate');
const { Client } = require('@open-wa/wa-automate');

wa.create({
  sessionId: 'fraxinus',
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0,
  headless: true,
}).then(client => start(client));

const app = express();

app.use(express.json());
app.use(cors());

/**
 * @param {Client} client
 */
function start(client) {
  app.post('/send/:number', async (req, res) => {
    const { number } = req.params;
    const { values } = req.body;
    await client.sendText(
      `91${number}@c.us`,
      'HELLO THIS IS WORKING' + values.name
    );
    res.send({ success: true, message: 'Message sent' });
  });
  app.listen(5000, async () => {
    console.log('Listening on port 5000');
  });
}
