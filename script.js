let comments = [];

fetch("./comments.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    comments = data;
    showContent(0);
  })
  .catch((error) => {
    console.error(`Could not load comments: ${error.message}`);
  });
let currentPage = 0;
const pageContent = document.querySelector(".pageContent");
const pageBtns = document.querySelectorAll(".pageBtn");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

pageBtns.forEach((pageBtn, index) => {
  pageBtn.addEventListener("click", () => {
    currentPage = index;
    showContent(currentPage);
  });
});

nextBtn.addEventListener("click", () => {
  if (currentPage < pageBtns.length - 1) {
    currentPage += 1;
    showContent(currentPage);
  }
});
prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage -= 1;
    showContent(currentPage);
  }
});

function showContent(pageIndex) {
  pageBtns.forEach((btn, index) => {
    if (index === pageIndex) {
      btn.classList.add("bg-blue-500", "text-white");
    } else {
      btn.classList.remove("bg-blue-500", "text-white");
    }
  });

  const content = comments.filter(
    (comment) =>
      comment.id <= (pageIndex + 1) * 10 && comment.id > pageIndex * 10
  );
  pageContent.innerHTML = content
    .map(
      (
        comment
      ) => `<div class="comment text-xs md:min-w-[600px] pl-4 font-semibold p-2 bg-white rounded-md">
                                                  <h4 class="text-blue-500 text-sm">${comment.email}</h4>
                                                  <p>${comment.name}</p>
                                                  </div>`
    )
    .join("");
}
