const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Shardul", email: "shardul@example.com", password: "aimerz" },
  { id: 2, name: "Demo", email: "demo@example.com", password: "demo" },
  { id: 3, name: "Riya", email: "riya@example.com", password: "riya123" },
  { id: 4, name: "Amit", email: "amit@gmail.com", password: "amit456" },
  { id: 5, name: "Sneha", email: "sneha@example.com", password: "sneha789" },
  { id: 6, name: "Rahul", email: "rahul@gmail.com", password: "rahul321" },
  { id: 7, name: "Priya", email: "priya@example.com", password: "priya654" },
  { id: 8, name: "Karan", email: "karan@gmail.com", password: "karan987" },
  { id: 9, name: "Tanya", email: "tanya@example.com", password: "tanya111" },
  { id: 10, name: "Vikram", email: "vikram@gmail.com", password: "vikram222" }
];

let topics = [
  {
    id: 1,
    title: "React Basics",
    summary: "Learn components, state, and props",
    media: [
      { type: "video", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
      { type: "image", url: "https://via.placeholder.com/400x200.png?text=React" }
    ],
    questions: [
      { q: "React is a ___ library?", options: ["Backend", "Frontend", "Database"], answer: 1 },
      { q: "Props are used to ___?", options: ["Change state", "Pass data", "Store DB"], answer: 1 },
      { q: "Which hook is for state?", options: ["useEffect", "useState", "useContext"], answer: 1 },
      { q: "Components start with ___?", options: ["Lowercase", "Uppercase", "Number"], answer: 1 },
      { q: "JSX stands for?", options: ["JavaScript XML", "JavaScript X", "Java Style"], answer: 0 }
    ]
  },
  {
    id: 2,
    title: "JavaScript Basics",
    summary: "Learn variables, functions, loops in JS",
    media: [
      { type: "video", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
      { type: "image", url: "https://via.placeholder.com/400x200.png?text=JS+Variables" }
    ],
    questions: [
      { q: "JS stands for?", options: ["JavaScript", "Java Style", "Just Script"], answer: 0 },
      { q: "Which keyword declares variable?", options: ["let", "var", "both"], answer: 2 },
      { q: "Function defined by ___?", options: ["func", "function", "def"], answer: 1 },
      { q: "Strict equality symbol?", options: ["==", "===", "="], answer: 1 },
      { q: "JS is ___ typed?", options: ["Strongly", "Weakly", "Both"], answer: 1 }
    ]
  }
];

let userBatches = {
  1: [
    { topic: "React Basics", status: "Completed", certificate: "https://example.com/react-cert.pdf" },
    { topic: "JS Basics", status: "In Progress", certificate: null }
  ]
};

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) res.json({ success: true, userId: user.id, name: user.name });
  else res.json({ success: false, message: "Invalid credentials" });
});

// Get topics
app.get("/api/topics", (req, res) => {
  res.json(topics);
});

// Get batches
app.get("/api/user/:id/batches", (req, res) => {
  const userId = req.params.id;
  res.json(userBatches[userId] || []);
});

// Submit test
app.post("/api/user/:id/submit-test", (req, res) => {
  const userId = req.params.id;
  const { topicId, answers } = req.body;
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return res.status(400).json({ error: "Topic not found" });

  let score = 0;
  topic.questions.forEach((q, idx) => { if (answers[idx] === q.answer) score++; });

  const batch = userBatches[userId]?.find(b => b.topic === topic.title);
  if (batch && score >= 3) {
    batch.status = "Completed";
    batch.certificate = `https://example.com/${topic.title.replace(" ", "-")}-cert.pdf`;
  }

  res.json({ score, reward: score >= 3 ? "Mystery Box" : null });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
