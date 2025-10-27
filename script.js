const books = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Solomon": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  Jude: 1,
  Revelation: 22
};

const bookSelect = document.getElementById("bookSelect");
const chapterSelect = document.getElementById("chapterSelect");
const downloadBtn = document.getElementById("downloadBtn");
const emailBtn = document.getElementById("emailBtn");
const emailModal = document.getElementById("emailModal");
const closeModal = document.querySelector(".close");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const emailInput = document.getElementById("emailInput");

// Populate book dropdown
Object.keys(books).forEach(book => {
  const option = document.createElement("option");
  option.value = book;
  option.textContent = book;
  bookSelect.appendChild(option);
});

// Update chapters on book selection
bookSelect.addEventListener("change", () => {
  const selectedBook = bookSelect.value;
  chapterSelect.innerHTML = '<option value="">-- Choose a Chapter --</option>';
  if (selectedBook) {
    const chapters = books[selectedBook];
    for (let i = 1; i <= chapters; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Chapter ${i}`;
      chapterSelect.appendChild(option);
    }
    chapterSelect.disabled = false;
  } else {
    chapterSelect.disabled = true;
  }
  downloadBtn.disabled = true;
  emailBtn.disabled = true;
});

// Enable actions when chapter is selected
chapterSelect.addEventListener("change", () => {
  const valid = chapterSelect.value !== "";
  downloadBtn.disabled = !valid;
  emailBtn.disabled = !valid;
});

// Download file
downloadBtn.addEventListener("click", () => {
  const book = bookSelect.value.replace(/\s/g, "_");
  const chapter = chapterSelect.value;
  const filename = `${book}_${chapter}.docx`;
  window.location.href = `/Bible_studies/${filename}`;
});

// Show email modal
emailBtn.addEventListener("click", () => {
  emailModal.classList.remove("hidden");
});

// Close modal
closeModal.addEventListener("click", () => {
  emailModal.classList.add("hidden");
});

// Send email (placeholder for backend integration)
sendEmailBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const book = bookSelect.value.replace(/\s/g, "_");
  const chapter = chapterSelect.value;
  const filename = `${book}_${chapter}.docx`;

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  // Replace with actual backend call
  fetch("/send_bible_study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, filename })
  })
    .then(res => {
      if (res.ok) {
        alert("Email sent successfully!");
        emailModal.classList.add("hidden");
        emailInput.value = "";
      } else {
        alert("Failed to send email.");
      }
    })
    .catch(() => alert("Error sending email."));
});