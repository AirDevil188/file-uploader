export const showToolbar = () => {
  const allData = document.querySelectorAll(".data");
  const toolbar = document.querySelector(".toolbar-section");
  allData.forEach((data) => {
    if (data.classList.contains("clicked")) {
      toolbar.removeAttribute("hidden");
    }
  });
};

export const hideToolbar = () => {
  const allData = document.querySelectorAll(".data");
  const toolbar = document.querySelector(".toolbar-section");
  allData.forEach((data) => {
    if (!data.classList.contains("clicked")) {
      toolbar.setAttribute("hidden", "");
    }
  });
};

export const toolbarControl = (e) => {
  const form = document.querySelector(".toolbar-form");
  const deleteBtn = document.querySelector(".delete-btn");
  const updateBtn = document.querySelector(".edit-btn");
  deleteBtn.setAttribute("id", e.currentTarget.id);
  updateBtn.setAttribute("id", e.currentTarget.id);
};

const closeToolbar = () => {
  const closeBtn = document.querySelector(".close-btn");
  const allData = document.querySelectorAll(".data");
  const toolbar = document.querySelector(".toolbar-section");
  closeBtn.addEventListener("click", () => {
    const clickedIcons = Array.from(allData).find((data) =>
      data.classList.contains("clicked")
    );
    if (clickedIcons) {
      toolbar.setAttribute("hidden", "");
    }
  });
};

closeToolbar();
