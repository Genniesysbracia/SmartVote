import React from "react";
import "../styles/Home.css";

export default function Home() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [timeRemaining, setTimeRemaining] = React.useState(0);
  const [isCutoff, setIsCutoff] = React.useState(false);

  // Current time update
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
  const socket = new WebSocket("ws://localhost:5000");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "COUNTDOWN_UPDATE") {
      setTimeRemaining(data.remaining);
      setIsCutoff(data.isCutoff);
    }
  };

  return () => socket.close();
}, []);


  const governors = [
    { number: 1, name: "Juan Dela Cruz", percent: 90 },
    { number: 2, name: "Maria Santos", percent: 50 },
    { number: 3, name: "Roberto Reyes", percent: 40 },
    { number: 4, name: "Angela Cruz", percent: 0 },
    { number: 5, name: "Pedro Lim", percent: 0 },
  ];

  const viceGovernors = [
    { number: 1, name: "Carlos Dizon", percent: 75 },
    { number: 2, name: "Janella Robles", percent: 50 },
    { number: 3, name: "Marco Villanueva", percent: 40 },
    { number: 4, name: "Elaine Ramos", percent: 0 },
    { number: 5, name: "Samuel Go", percent: 0 },
  ];

  // Date formatting
  const dateString = currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Format countdown timer as MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timerString = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="home-container">
      {/* LEFT SIDE */}
      <div className="race-panel">
        <h2 className="race-title">LOCAL RACE</h2>

        <div className="race-section">
          <h3 className="position-title">Governor</h3>

          {governors.map((c) => (
            <div key={c.number} className="candidate-row">
              <div className="cand-number">{c.number}</div>
              <div className="cand-info">
                <span className="cand-name">{c.name}</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="race-section">
          <h3 className="position-title">Vice Governor</h3>

          {viceGovernors.map((c) => (
            <div key={c.number} className="candidate-row">
              <div className="cand-number">{c.number}</div>
              <div className="cand-info">
                <span className="cand-name">{c.name}</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="home-right">
        <div className="datetime-box">
          <div className="date">{dateString}</div>
          <div className={`time ${isCutoff ? 'cutoff' : ''}`}>
            {isCutoff ? '00:00' : timerString}
          </div>
          {isCutoff && (
            <div className="cutoff-text">CUTOFF - Restarting in {10 - Math.floor((Date.now() - (currentTime.getTime() - (timeRemaining * 1000)) - 10000) / 1000)}s</div>
          )}
        </div>
      </div>
    </div>
  );
}