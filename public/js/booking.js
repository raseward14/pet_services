document.getElementById("book-btn").addEventListener("click", function(event) {
  //event.preventDefault();

  let timeSlotToRemove = figureWhatTime();
  console.log(timeSlotToRemove);
})

function figureWhatTime() {
  if (document.querySelector("#slots0").checked === true) {
    return 0;
  } else if (document.querySelector("#slots1").checked === true) {
    return 1;
  } else if (document.querySelector("#slots2").checked === true) {
    return 2;
  } else if (document.querySelector("#slots3").checked === true) {
    return 3;
  } else if (document.querySelector("#slots4").checked === true) {
    return 4;
  } else if (document.querySelector("#slots5").checked === true) {
    return 5;
  } else if (document.querySelector("#slots6").checked === true) {
    return 6;
  } else {
    return alert('Please Select an available Time Slot');
  }
}



