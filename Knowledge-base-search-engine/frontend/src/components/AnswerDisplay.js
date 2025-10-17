import React from "react";

function AnswerDisplay({ answer }) {
  return (
    <div style={{ marginTop: "20px", padding: "10px" }}>
      <h4>🧩 Answer:</h4>
      <p>{answer}</p>
    </div>
  );
}

export default AnswerDisplay;
