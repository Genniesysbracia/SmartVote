import React from "react";
import styles from "../styles/Vote.module.css";

export default function Vote() {
  const governorCandidates = [
    { id: 1, name: "Juan Dela Cruz" },
    { id: 2, name: "Maria Santos" },
    { id: 3, name: "Roberto Reyes" },
    { id: 4, name: "Angela Cruz" },
    { id: 5, name: "Pedro Lim" },
  ];

  const viceGovernorCandidates = [
    { id: 1, name: "Carlos Dizon" },
    { id: 2, name: "Janella Robles" },
    { id: 3, name: "Marco Villanueva" },
    { id: 4, name: "Elaine Ramos" },
    { id: 5, name: "Samuel Go" },
  ];

    const senatorCandidates = [
    { id: 1, name: "Carlos Dizon" },
    { id: 2, name: "Janella Robles" },
    { id: 3, name: "Marco Villanueva" },
    { id: 4, name: "Elaine Ramos" },
    { id: 5, name: "Samuel Go" },
  ];

  const [selectedGovernorId, setSelectedGovernorId] = React.useState(null);
  const [selectedViceGovernorId, setSelectedViceGovernorId] = React.useState(null);
  const [selectedSenatorId, setSelectedSenatorId] = React.useState(null);

  return (
    <div className={styles["vote-page"]}>
      <div className={styles["vote-shell"]}>
        <div className={styles["vote-header"]}>
          <div className={styles["vote-header-left"]}>
            <div className={styles["vote-doc-icon"]} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V7L14 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M14 2V7H19" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M8 16H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles["vote-header-title"]}>OFFICIAL ELECTION BALLOT</div>
          </div>

          <div className={styles["vote-secured"]}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17 11H7V8.5C7 5.46243 9.46243 3 12.5 3C15.5376 3 18 5.46243 18 8.5V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 11H17C18.1046 11 19 11.8954 19 13V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V13C5 11.8954 5.89543 11 7 11Z" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            <span>Secured Voting</span>
          </div>
        </div>

        <div className={styles["vote-card"]}>
          <div className={styles["vote-scroll"]}>
            <BallotSection
              title="Governor"
              subtitle="Select one candidate"
              candidates={governorCandidates}
              selectedId={selectedGovernorId}
              onSelect={setSelectedGovernorId}
            />

            <BallotSection
              title="Vice Governor"
              subtitle="Select one candidate"
              candidates={viceGovernorCandidates}
              selectedId={selectedViceGovernorId}
              onSelect={setSelectedViceGovernorId}
            />

            <BallotSection
              title="Senator"
              subtitle="Select one candidate"
              candidates={senatorCandidates}
              selectedId={selectedSenatorId}
              onSelect={setSelectedSenatorId}
            />
          </div>

          <div className={styles["vote-footer"]}>
            <input
              className={styles["vote-footer-input"]}
              placeholder=""
              value={""}
              readOnly
              aria-label="Ballot notes"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BallotSection({ title, subtitle, candidates, selectedId, onSelect }) {
  return (
    <section className={styles["ballot-section"]}>
      <header className={styles["ballot-section-header"]}>
        <div className={styles["ballot-section-title"]}>{title}</div>
        <div className={styles["ballot-section-subtitle"]}>{subtitle}</div>
      </header>

      <div className={styles["ballot-section-body"]}>
        {candidates.map((c) => {
          const isSelected = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              className={`${styles["candidate-row"]} ${isSelected ? styles.selected : ""}`}
              onClick={() => onSelect(c.id)}
            >
              <div className={`${styles["candidate-radio"]} ${isSelected ? styles.checked : ""}`} aria-hidden="true">
                {isSelected ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : null}
              </div>

              <div className={styles["candidate-name"]}>{c.name}</div>

              {isSelected ? <div className={styles["candidate-pill"]}>Selected</div> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
