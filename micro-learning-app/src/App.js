import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then(res => res.json())
      .then(data => setTopics(data));
  }, []);

  const convertToEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const handleLogin = () => {
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({ id: data.userId, name: data.name });
          setPage("list");
          setLoginError("");
        } else setLoginError(data.message);
      });
  };

  const startTopic = (topic) => {
    setCurrentTopic(topic);
    setCurrentMediaIndex(0);
    setAnswers([]);
    setScore(0);
    setPage("content");
  };

  const nextMedia = () => {
    if (currentMediaIndex < currentTopic.media.length - 1)
      setCurrentMediaIndex(currentMediaIndex + 1);
    else setPage("test");
  };

  const selectAnswer = (index, selected) => {
    const newAnswers = [...answers];
    newAnswers[index] = selected;
    setAnswers(newAnswers);
  };

  const submitTest = () => {
    fetch(`http://localhost:5000/api/user/${user.id}/submit-test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId: currentTopic.id, answers }),
    })
      .then(res => res.json())
      .then(data => {
        setScore(data.score);
        setPage("summary");
        fetch(`http://localhost:5000/api/user/${user.id}/batches`)
          .then(res => res.json())
          .then(data => setBatches(data));
      });
  };

  const resetAll = () => {
    setPage("list");
    setCurrentTopic(null);
    setCurrentMediaIndex(0);
    setAnswers([]);
    setScore(0);
  };

  return (
    <div className="App">
      {!user && page === "login" && (
        <div className="login-card">
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </div>
      )}

      {user && page === "list" && (
        <div>
          <h1>Topics / Exams</h1>
          {topics.map(t => (
            <div key={t.id} className="topic-card">
              <h3>{t.title}</h3>
              <p>{t.summary}</p>
              <button onClick={() => startTopic(t)}>Start</button>
            </div>
          ))}
          <button style={{ marginTop: "20px" }} onClick={() => setPage("batches")}>
            My Batches & Certificates
          </button>
        </div>
      )}

      {page === "content" && currentTopic && (
        <div>
          <h2>{currentTopic.title} - Study Material</h2>
          {currentTopic.media[currentMediaIndex].type === "video" ? (
            <iframe width="560" height="315" src={convertToEmbedUrl(currentTopic.media[currentMediaIndex].url)}
              title="YouTube video" frameBorder="0" allowFullScreen></iframe>
          ) : (
            <img src={currentTopic.media[currentMediaIndex].url} alt="media" style={{ maxWidth: "100%", height: "auto" }} />
          )}
          <button style={{ marginTop: "20px" }} onClick={nextMedia}>
            {currentMediaIndex < currentTopic.media.length - 1 ? "Next" : "Go to Test"}
          </button>
        </div>
      )}

      {page === "test" && currentTopic && (
        <div>
          <h2>{currentTopic.title} - Test</h2>
          {currentTopic.questions.map((q, idx) => (
            <div key={idx} style={{ marginBottom: "15px" }}>
              <p>{idx + 1}. {q.q}</p>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => selectAnswer(idx, i)} style={{ background: answers[idx] === i ? "lightgreen" : "", marginRight: "10px" }}>{opt}</button>
              ))}
            </div>
          ))}
          <button onClick={submitTest}>Submit Test</button>
        </div>
      )}

      {page === "summary" && currentTopic && (
        <div>
          <h2>{currentTopic.title} - Summary</h2>
          <p>Score: {score} / {currentTopic.questions.length}</p>
          {score >= 3 ? <p>🎉 You earned a Mystery Box!</p> : <p>Keep practicing to earn rewards.</p>}
          <h3>Improvement Points:</h3>
          <ul>{currentTopic.questions.map((q, idx) => answers[idx] !== q.answer ? <li key={idx}>{q.q}</li> : null)}</ul>
          <button onClick={resetAll} style={{ marginTop: "20px" }}>Back to Topics</button>
        </div>
      )}

      {page === "batches" && (
        <div>
          <h2>My Batches & Certificates</h2>
          {batches.length === 0 ? <p>No batch info available.</p> :
            batches.map((b, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <p>Topic: {b.topic}</p>
                <p>Status: {b.status}</p>
                {b.certificate && <a href={b.certificate} target="_blank" rel="noreferrer">View Certificate</a>}
              </div>
            ))}
          <button style={{ marginTop: "20px" }} onClick={resetAll}>Back to Topics</button>
        </div>
      )}
    </div>
  );
}

export default App;
// Note: This is a simplified version focusing on core functionality. In a production app, consider better state management, routing, and styling.