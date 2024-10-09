export const showToolbar = () => {
  const folders = document.querySelectorAll(".folder");
  const toolbar = document.querySelector(".toolbar-section");
  folders.forEach((folder) => {
    if (folder.classList.contains("clicked")) {
      console.log("contains");
      toolbar.removeAttribute("hidden");
    }
  });
};

export const hideToolbar = () => {
  const folders = document.querySelectorAll(".folder");
  const toolbar = document.querySelector(".toolbar-section");
  folders.forEach((folder) => {
    if (!folder.classList.contains("clicked")) {
      toolbar.setAttribute("hidden", "");
    }
  });
};

export const toolbarControl = (e) => {
  const form = document.querySelector(".toolbar-form");
  const deleteHyperLink = document.querySelector(".delete-link");
  const updateHyperlink = document.querySelector(".update-link");
  form.setAttribute("action", `delete/${e.currentTarget.id}`);
  deleteHyperLink.setAttribute("href", `delete/${e.currentTarget.id}`);
  updateHyperlink.setAttribute("href", `update/${e.currentTarget.id}`);
};

const closeToolbar = () => {
  const closeBtn = document.querySelector(".close-btn");
  const folders = document.querySelectorAll(".folder");
  const toolbar = document.querySelector(".toolbar-section");
  closeBtn.addEventListener("click", () => {
    const clickedIcons = Array.from(folders).find((folder) =>
      folder.classList.contains("clicked")
    );
    if (clickedIcons) {
      toolbar.setAttribute("hidden", "");
    }
  });
};

closeToolbar();
