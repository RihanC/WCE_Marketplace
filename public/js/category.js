const params = new URLSearchParams(window.location.search);
const currentCategory = params.get("category");

const filters = document.querySelectorAll(".filter-item");

filters.forEach((item) => {
  const category = item.getAttribute("data-category");

  // highlight active
  if (
    (currentCategory && category === currentCategory) ||
    (!currentCategory && category === "All")
  ) {
    item.classList.add("active");
  }

  // preserve search + sort
  item.addEventListener("click", (e) => {
    e.preventDefault();

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    window.location.href = "/listings?" + params.toString();
  });
});
