document.getElementById("info-btn").addEventListener("click", function(event) {
  const infoDiv = document.querySelector(".dogInfo");
  infoDiv.style.display = "hidden";
  const infoForm = document.getElementById('info-form');
  infoForm.style.display = "none";
})