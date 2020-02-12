const inputFile = document.getElementById("file");
const selectedPop = document.getElementById("selectedPop");
const btnSubmit = document.getElementById("btnSubmit");

inputFile.addEventListener("change", e => {
  btnSubmit.disabled = false;
  selectedPop.style.bottom = 0;

  setTimeout(() => {
    selectedPop.style.bottom = "-450px";
  }, 2000);
});
