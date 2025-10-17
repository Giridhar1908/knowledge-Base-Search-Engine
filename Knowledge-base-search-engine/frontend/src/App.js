import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import QueryBox from "./components/QueryBox";
import AnswerDisplay from "./components/AnswerDisplay";

function App() {
  const [answer, setAnswer] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>📘 Knowledge-base Search Engine</h2>
      <FileUpload />
      <QueryBox setAnswer={setAnswer} />
      <AnswerDisplay answer={answer} />
    </div>
  );
}

export default App;
