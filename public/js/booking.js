document.getElementById("book-btn").addEventListener("click", function(event) {
  event.preventDefault();
  let typeOfService = figureWhatService();
  let timeSlotToRemove = figureWhatTime();

  console.log(timeSlotToRemove);
  let person = JSON.parse(localStorage.getItem("user"));
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
  const ele = document.getElementsByName("slots");
  console.log(ele);
  for (j = 0; j < ele.length; j++) {
    if (ele[j].checked === true) {
      return ele[j].value;
    }
  }
}



