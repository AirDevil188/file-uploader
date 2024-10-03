const newFolderBtn = document.querySelector(".open-button");

const dialog = document.querySelector("dialog");
const dialogSection = document.querySelector(".dialog-section");
const overlay = document.querySelector(".overlay");

newFolderBtn.addEventListener("click", () => {
  dialog.showModal();
});

if (dialogSection.contains(dialog)) {
  document.querySelector("dialog").addEventListener("click", (e) => {
    if (e.target.tagName === "DIALOG") {
      e.target.close();
    }
  });
}
