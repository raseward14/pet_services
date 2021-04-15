document.getElementById("book-btn").addEventListener("click", function(event) {
  event.preventDefault();
  let typeOfService = figureWhatService();
  let timeSlotToRemove = figureWhatTime();

  console.log(typeof timeSlotToRemove);
  //if (typeOfService !== undefined && timeSlotToRemove !== undefined) {
    //const removeTime = await fetch('/api/schedule/dates', {
      //method: 'DELETE',
      //where:
      //body: JSON.stringify({}),
      //headers: { 'Content-Type': 'application/json' },
    //});
  //}
})

function figureWhatService() {
  if (document.querySelector("#walk").checked === true) {
    return "walk";
  } else if (document.querySelector("#groom").checked === true) {
    return "groom";
  } else {
    return alert('Please Select a Service');
  }
}

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



