const newFolderBtn = document.querySelector(".open-button");
const deleteDialog = document.querySelector(".dialog-delete");

const dialog = document.querySelectorAll("dialog");
const dialogSection = document.querySelectorAll(".dialog-section");
const overlay = document.querySelector(".overlay");

const newFolderDialog = () => {
  newFolderBtn.addEventListener("click", () => {
    dialog[0].showModal();
  });
};

const editFolderDialog = () => {
  const editBtn = document.querySelector(".edit-btn");
  const dialogForm = document.querySelector(".dialog-form");

  editBtn.addEventListener("click", (e) => {
    dialog[0].showModal();
    dialogForm.setAttribute("action", `update/${e.currentTarget.id}`);
  });
};

const closeDialogOutsideListener = (para) => {
  // close dialog if the event listener is detected outside of the dialog element
  if (dialogSection[para].contains(dialog[para])) {
    document.querySelectorAll("dialog")[para].addEventListener("click", (e) => {
      if (e.target.tagName === "DIALOG") {
        e.target.close();
      }
    });
  }
};

const deleteFolderDialog = () => {
  const deleteBtn = document.querySelector(".delete-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  const dialogForm = document.querySelector(".folder-delete-form");

  deleteBtn.addEventListener("click", (e) => {
    deleteDialog.showModal();
    cancelBtn.setAttribute("type", "button");
    // cancelBtn.setAttribute("onClick", `${deleteDialog.close}`)
    dialogForm.setAttribute("method", "post");
    dialogForm.setAttribute("action", `delete/${e.currentTarget.id}`);
  });
};
newFolderDialog();
editFolderDialog();
deleteFolderDialog();
closeDialogOutsideListener(0);
closeDialogOutsideListener(1);
