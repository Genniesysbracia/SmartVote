// websocket/countdown.js

const COUNTDOWN_SECONDS = 60;
const CUTOFF_SECONDS = 10;

// 🔒 SINGLETON STATE (created once per server start)
let countdownEnd = Date.now() + COUNTDOWN_SECONDS * 1000;
let isCutoff = false;
let intervalStarted = false;

export function setupCountdown(wss) {

  // 🚫 Prevent multiple intervals
  if (!intervalStarted) {
    intervalStarted = true;

    setInterval(() => {
      const now = Date.now();
      let remainingMs = countdownEnd - now;

      if (!isCutoff && remainingMs <= 0) {
        isCutoff = true;
        countdownEnd = now + CUTOFF_SECONDS * 1000;
        remainingMs = CUTOFF_SECONDS * 1000;
      }

      if (isCutoff && remainingMs <= 0) {
        isCutoff = false;
        countdownEnd = now + COUNTDOWN_SECONDS * 1000;
        remainingMs = COUNTDOWN_SECONDS * 1000;
      }

      broadcast(wss, {
        type: 'COUNTDOWN_UPDATE',
        remaining: Math.ceil(remainingMs / 1000),
        isCutoff
      });
    }, 1000);
  }

  // ✅ New clients ONLY receive current state
  wss.on('connection', (ws) => {
    const remaining = Math.ceil((countdownEnd - Date.now()) / 1000);

    ws.send(JSON.stringify({
      type: 'COUNTDOWN_UPDATE',
      remaining,
      isCutoff
    }));
  });
}

function broadcast(wss, data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}
