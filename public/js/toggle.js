// public/js/toggle.js

const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

// Apply saved mode
window.addEventListener("load", () => {
  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark-mode");
  }
});
