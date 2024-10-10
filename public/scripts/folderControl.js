import { toolbarControl, showToolbar, hideToolbar } from "./toolbarControl.js";
// check for outside clicks
document.addEventListener("click", (e) => {
  const clickedFolder = document.querySelector(".clicked");
  const outsideClickFolderSection = !document
    .querySelector(".folder-section")
    .contains(e.target);
  const outsideClickToolbar = !document
    .querySelector(".toolbar-section")
    .contains(e.target);
  const outsideDialogClick = !document
    .querySelector(".dialog")
    .contains(e.target);

  const arrElements = [
    clickedFolder,
    outsideClickFolderSection,
    outsideClickToolbar,
    outsideDialogClick,
  ];

  if (arrElements.every(Boolean)) {
    clickedFolder.classList.remove("clicked");
    hideToolbar();
  }
});

const allFolders = document.querySelectorAll(".folder");
// add eventListeners to the folders
const folderEventListener = () => {
  allFolders.forEach((folder) => {
    folder.addEventListener("click", (e) => {
      filterClickedFolder();
      e.currentTarget.classList.add("clicked");
      toolbarControl(e);
      showToolbar();
    });
  });
};

const filterClickedFolder = () => {
  const clickedIcons = Array.from(allFolders).find((folder) =>
    folder.classList.contains("clicked")
  );
  if (clickedIcons) {
    clickedIcons.classList.remove("clicked");
    return clickedIcons;
  } else {
    return;
  }
};

folderEventListener();
