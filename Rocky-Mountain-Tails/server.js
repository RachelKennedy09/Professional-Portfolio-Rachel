//CRUD STEPS

//step 1.0 imports
import express from "express";
import mongoose from "mongoose";
import Note from "./models/Note.js";
import { verifyUser } from "./middleware/verifyUser.js";

// Step 1: Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/notesDB") // correct colon syntax
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//step 1.2. create the app
// handles incoming requests and send responses
const app = express();

//Step 1.3. Middleware to parse JSON
// this tells express "please read JSON in the request body and turn it into a javascript object we can use "
//we need this when users send new notes to the server
app.use(express.json());

import authRoutes from "./routes/auth.js"; // Import auth file

app.use("/auth", authRoutes); // Any route starting /auth will go to that file

//-----------------------------///
//======STEP 1.0 FRONT END (after step 5 backend)==============//
//--------------------------------------------------------//
//Step 1.0 Serve the front end files
//tell express server where to find and send website files like HTML and JS

// 1.1 These help us find the public folder using __dirname in ES modules
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//1.2this servers the "public" folder as static files
app.use(express.static(path.join(__dirname, "public")));

//STEP 2 Create index.html (frontend)
//This is the actual webpage that the user sees: it has a title, form fields, and a list to display the notes.

// step 1.4. test route
// this sets up a GET request at the homepage "/"
//f you open the browser or use Postman to visit http://localhost:3000 it will respond with "welcome to the note-taking API!"
//it is a basic "is the server working" check and is good for programmers
app.get("/", (req, res) => {
  res.send("welcome to the note taking API!");
});

//step 1.5. set the port (browser)
//we use process.env.PORT for deployment. If it is not available, we use port 3000 on the computer(most common and what I use)
const PORT = process.env.PORT || 3000;

//step 1.6. start the server from terminal
//starts the server and logs a message to say it is running on what port.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Step 2.0 Create a POST route to save notes

// CREATE a note (POST /notes)
// POST /notes - Create a new note in MongoDB
app.post("/notes", verifyUser, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = await new Note({
      title,
      content,
      createdBy: req.user.userId,
    }).save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ all notes (GET /notes)
// GET /notes - Fetch all notes from MongoDB
app.get("/notes", verifyUser, async (req, res) => {
  try {
    const query =
      req.user.role === "admin" ? {} : { createdBy: req.user.userId }; //only return users notes

    const notes = await Note.find(query).sort({ createdAt: -1 }); // newest first
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a note by ID (DELETE /notes/:id)

app.delete("/notes/:id", verifyUser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    //only owner or admin can delete
    if (
      note.createdBy.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: err.message });
  }
});

//SECURE PUT . Ensuring only created note writer can edit notes
app.put("/notes/:id", verifyUser, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Find the note by ID and update it with new values
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    //only owner or admin can update
    if (
      note.createdBy.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this note" });
    }

    //perform update
    note.title = title;
    note.content = content;
    await note.save();

    res.json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
