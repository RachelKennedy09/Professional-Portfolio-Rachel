const form = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

//TOGGLE
const toggleBtn = document.getElementById("toggleTheme");
const prefersDark = localStorage.getItem("theme") === "dark";

// Load previous theme on page load
if (prefersDark) {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Toggle Theme";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Update button icon
  const isDark = document.body.classList.contains("dark");
  toggleBtn.textContent = isDark ? "☀️ Toggle Theme" : "🌙 Toggle Theme";

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ✅ Step 1: Fetch and display notes
async function loadNotes() {
  const res = await fetch("/notes"); // GET from server
  const notes = await res.json(); // Parse response

  notesContainer.innerHTML = ""; // Clear list

  // ✅ Step 2: Loop inside loadNotes, after fetch
  notes.forEach((note) => {
    const div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `
      <strong>${note.title}</strong><br>
      <p>${note.content}</p>
      <small>${new Date(note.createdAt).toLocaleString()}</small><br>
      <button data-id="${note._id}" class="deleteBtn">Delete</button>
      <button data-id="${note._id}" class="editBtn">Edit</button>
    `;

    // Delete button
    div.querySelector(".deleteBtn").addEventListener("click", async () => {
      const res = await fetch(`/notes/${note._id}`, { method: "DELETE" });
      if (res.ok) loadNotes();
      else alert("Failed to delete note");
    });

    // ✅ Edit button
    div.querySelector(".editBtn").addEventListener("click", () => {
      document.getElementById("title").value = note.title;
      document.getElementById("content").value = note.content;
      form.setAttribute("data-editing-id", note._id);
    });

    notesContainer.appendChild(div);
  });
}

// ✅ Step 4: Form submission to create or edit notes
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const editingId = form.getAttribute("data-editing-id");

  if (editingId) {
    const res = await fetch(`/notes/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      form.reset();
      form.removeAttribute("data-editing-id");
      loadNotes();
    } else {
      alert("Failed to update note");
    }
  } else {
    const res = await fetch("/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      form.reset();
      loadNotes();
    } else {
      alert("Error creating note.");
    }
  }
});

// ✅ Step 5: Initial load
loadNotes();
