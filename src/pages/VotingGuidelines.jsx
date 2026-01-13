import React from "react";
import styles from "../styles/votingGuide.module.css";

export default function VotingGuidelines() {
  return (
    <div className={styles.guidepage}>

      <div className={styles.voteguide}>
        <h1>OFFICIAL ELECTION – VOTING GUIDELINES</h1>
        <p>Please read carefully before proceeding to vote</p>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>
          📘 <span>Important Information</span>
        </div>
        <p>
          This is your opportunity to elect leaders that represents your country.
          Please take time to review each candidate’s platform and make informed decisions.
        </p>
      </div>

      <div className={styles.sectionTitle}>
        ❓ Voting Guidelines
      </div>

      <div className={styles.guidelines}>
        <div className={styles.guideline}>
          <span className={styles.dot}></span>
          <div>
            <h3>Eligibility</h3>
            <p>
              All registered voter are eligible to vote.
              You must be registered to participate.
            </p>
          </div>
        </div>

        <div className={styles.guideline}>
          <span className={styles.dot}></span>
          <div>
            <h3>One Vote Per Position</h3>
            <p>
              You may select ONE candidate for each position.
              Your selection can be changed until you submit your final ballot.
            </p>
          </div>
        </div>

        <div className={styles.guideline}>
          <span className={styles.dot}></span>
          <div>
            <h3>Review before submitting</h3>
            <p>
              You will have the opportunity to review all your selections before final submission.
              Once submitted, votes cannot be changed.
            </p>
          </div>
        </div>

        <div className={styles.guideline}>
          <span className={styles.dot}></span>
          <div>
            <h3>Confidentiality</h3>
            <p>
              All votes are confidential and anonymous.
              Your choice will not be shared or linked to your identity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
