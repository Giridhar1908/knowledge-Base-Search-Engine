import React, { useState } from "react";
import axios from "axios";

function QueryBox({ setAnswer }) {
  const [question, setQuestion] = useState("");

  const askQuestion = async () => {
    const res = await axios.post("http://localhost:5000/api/query", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={askQuestion}>Search</button>
    </div>
  );
}

export default QueryBox;
