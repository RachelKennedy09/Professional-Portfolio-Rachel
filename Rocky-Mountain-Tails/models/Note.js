//WHAT I AM DOING:
//when a logged-in walker submits a note, we will include their userId in createdBy
//localStorage, when fetching noteSchema, we will filter by createdBy === requestAnimationFrame.user.userId
// Admins will see all, walkers only see their own.




//Imports
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //connects each not to a User
    },
  },
  { timestamps: true }
); //adds a createdAt and updatedAt

const Note = mongoose.model("Note", noteSchema);
export default Note;
