const deleteDialog = document.querySelector(".dialog-delete");
const addFileDialog = document.querySelector(".dialog-add-file");
const shareDialog = document.querySelector(".dialog-share");
const dialog = document.querySelectorAll("dialog");
const dialogSection = document.querySelectorAll(".dialog-section");

const newFolderDialog = () => {
  const newFolderBtn = document.querySelector(".open-button");
  if (newFolderBtn) {
    newFolderBtn.addEventListener("click", () => {
      dialog[0].showModal();
      closeDialogOutsideListener("dialog-add-folder");
    });
  } else return;
};

const editFolderDialog = () => {
  const editBtn = document.querySelector(".edit-btn");
  if (editBtn) {
    const dialogForm = document.querySelector(".dialog-form");

    editBtn.addEventListener("click", (e) => {
      dialog[0].showModal();
      dialogForm.setAttribute("action", `update/${e.currentTarget.id}`);
      closeDialogOutsideListener("dialog-add-folder");
    });
  } else return;
};

const closeDialogOutsideListener = (dialog) => {
  switch (dialog) {
    case "dialog-add-file":
      document
        .querySelector(".dialog-add-file")
        .addEventListener("click", (e) => {
          if (e.target.tagName === "DIALOG") {
            e.target.close();
          }
        });
      break;
    case "dialog-delete":
      document
        .querySelector(".dialog-delete")
        .addEventListener("click", (e) => {
          if (e.target.tagName === "DIALOG") {
            e.target.close();
          }
        });
      break;
    case "dialog-add-folder":
      document
        .querySelector(".dialog-add-folder")
        .addEventListener("click", (e) => {
          if (e.target.tagName === "DIALOG") {
            e.target.close();
          }
        });

      break;
    case "dialog-share":
      document.querySelector(".dialog-share").addEventListener("click", (e) => {
        if (e.target.tagName === "DIALOG") {
          e.target.close();
        }
      });
  }
};

const deleteFolderDialog = () => {
  const deleteBtn = document.querySelector(".delete-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  if (deleteBtn) {
    const dialogForm = document.querySelector(".folder-delete-form");

    deleteBtn.addEventListener("click", (e) => {
      deleteDialog.showModal();
      cancelBtn.setAttribute("type", "button");
      dialogForm.setAttribute("method", "post");
      if (e.currentTarget.classList.contains("folder")) {
        dialogForm.setAttribute("action", `delete/${e.currentTarget.id}`);
      }
      if (e.currentTarget.classList.contains("file")) {
        dialogForm.setAttribute(
          "action",
          `/drive/file/delete/${e.currentTarget.id}`
        );
      }

      closeDialogOutsideListener("dialog-delete");
    });
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        deleteDialog.close();
      });
    }
  } else return;
};

const uploadFolderDialog = () => {
  const addFileBtn = document.querySelector(".add-file-btn");
  if (addFileBtn) {
    addFileBtn.addEventListener("click", (e) => {
      addFileDialog.showModal();
      closeDialogOutsideListener("dialog-add-file");
    });
  } else return;
};

const shadeFolderDialog = () => {
  const shareFolderBtn = document.querySelector(".share-btn");
  const shareForm = document.querySelector(".folder-share-form");
  if (shareFolderBtn) {
    shareFolderBtn.addEventListener("click", (e) => {
      shareDialog.showModal();
      shareForm.setAttribute("action", `share/${e.currentTarget.id}`);
      closeDialogOutsideListener("dialog-share");
    });
  } else return;
};

newFolderDialog();
editFolderDialog();
uploadFolderDialog();
deleteFolderDialog();
shadeFolderDialog();
