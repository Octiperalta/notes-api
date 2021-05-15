const express = require("express");
const logger = require("./loggerMiddleware");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [
  {
    id: 1,
    content: "Cook dinner",
    type: "personal",
    isChecked: false,
    isImportant: false,
  },
  {
    id: 2,
    content: "Walk the dog",
    type: "personal",
    isChecked: true,
    isImportant: false,
  },
  {
    id: 3,
    content: "Do homework",
    type: "education",
    isChecked: false,
    isImportant: false,
  },
  {
    id: 4,
    content: "wash dishes",
    type: "none",
    isChecked: false,
    isImportant: false,
  },
];

app.get("/", (req, res) => {
  res.send("Hola como estas");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const { content, type, isChecked, isImportant } = req.body;

  if (!req.body || !content) {
    return res.status(400).json({ error: "Incorrect content format" });
  }

  const ids = notes.map(note => note.id);
  const maxID = Math.max(...ids);

  const newNote = {
    id: maxID + 1,
    content,
    type,
    isChecked,
    isImportant,
  };
  notes = [...notes, newNote];

  res.status(201).json(newNote);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Running server on http://localhost:3001/");
});
