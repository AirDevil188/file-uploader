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
  const formDownloadFile = document.querySelector(".form-download-file");
  const deleteBtn = document.querySelector(".delete-btn");
  const updateBtn = document.querySelector(".edit-btn");
  const downloadBtn = document.querySelector(".download-btn");
  const shareBtn = document.querySelector(".share-btn");
  if (e.currentTarget.classList.contains("file")) {
    shareBtn.setAttribute("hidden", "");
    deleteBtn.classList.remove("folder");
    deleteBtn.classList.add("file");
    updateBtn.classList.remove("folder");
    updateBtn.classList.add("file");
  }
  if (e.currentTarget.classList.contains("folder")) {
    shareBtn.removeAttribute("hidden");
    deleteBtn.classList.remove("file");
    deleteBtn.classList.add("folder");
    updateBtn.classList.remove("file");
    updateBtn.classList.add("folder");
  }
  deleteBtn.setAttribute("id", e.currentTarget.id);
  updateBtn.setAttribute("id", e.currentTarget.id);
  downloadBtn.setAttribute("id", e.currentTarget.id);
  shareBtn.setAttribute("id", e.currentTarget.id);
  formDownloadFile.setAttribute(
    "action",
    `/drive/file/download/${e.currentTarget.id}`
  );
};

const closeToolbar = () => {
  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
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
  } else return;
};

closeToolbar();
