const newFolderBtn = document.querySelector(".open-button");

const dialog = document.querySelector("dialog");
const dialogSection = document.querySelector(".dialog-section");
const overlay = document.querySelector(".overlay");

const newFolderDialog = () => {
  newFolderBtn.addEventListener("click", () => {
    dialog.showModal();
  });
};

const editFolderDialog = () => {
  const editBtn = document.querySelector(".edit-btn");
  const dialogForm = document.querySelector(".dialog-form");

  editBtn.addEventListener("click", (e) => {
    dialog.showModal();
    dialogForm.setAttribute("action", `update/${e.currentTarget.id}`);
  });
};

// close dialog if the event listener is detected outside of the dialog element
if (dialogSection.contains(dialog)) {
  document.querySelector("dialog").addEventListener("click", (e) => {
    if (e.target.tagName === "DIALOG") {
      e.target.close();
    }
  });
}

newFolderDialog();
editFolderDialog();
