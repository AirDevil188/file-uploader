import { toolbarControl, showToolbar, hideToolbar } from "./toolbarControl.js";
// check for outside clicks
document.addEventListener("click", (e) => {
  const clickedFolder = document.querySelector(".clicked");
  const outsideClickFolderSection = !document
    .querySelector(".data-section")
    .contains(e.target);
  const outsideClickToolbar = !document
    .querySelector(".toolbar-section")
    .contains(e.target);
  const outsideEditDialogClick = !document
    .querySelector(".dialog")
    .contains(e.target);
  const outsideDeleteDialogClick = !document
    .querySelector(".dialog-delete")
    .contains(e.target);

  const outsideAddFileDialogClick = !document
    .querySelector(".dialog-add-file")
    .contains(e.target);
  const outsideShareFolderDialogClick = !document
    .querySelector(".dialog-share")
    .contains(e.target);
  const arrElements = [
    clickedFolder,
    outsideClickFolderSection,
    outsideClickToolbar,
    outsideEditDialogClick,
    outsideDeleteDialogClick,
    outsideAddFileDialogClick,
    outsideShareFolderDialogClick,
  ];

  if (arrElements.every(Boolean)) {
    clickedFolder.classList.remove("clicked");
    hideToolbar();
  }
});

const allData = document.querySelectorAll(".data");
// add eventListeners to the folders
const folderEventListener = () => {
  allData.forEach((file) => {
    file.addEventListener("click", (e) => {
      filterClickedFolder();
      e.currentTarget.classList.add("clicked");
      toolbarControl(e);
      if (e.target.tagName === "A") {
        return;
      }
      showToolbar();
    });
  });
};

const filterClickedFolder = () => {
  const clickedIcons = Array.from(allData).find((file) =>
    file.classList.contains("clicked")
  );
  if (clickedIcons) {
    clickedIcons.classList.remove("clicked");
    return clickedIcons;
  } else {
    return;
  }
};

folderEventListener();
