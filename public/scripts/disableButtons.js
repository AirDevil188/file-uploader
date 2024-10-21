const disableButtons = () => {
  const addFileBtn = document.querySelector(".add-file-btn");
  const newFolderBtn = document.querySelector(".open-button");

  addFileBtn.setAttribute("disabled", "");
  newFolderBtn.setAttribute("disabled", "");
};

disableButtons();
