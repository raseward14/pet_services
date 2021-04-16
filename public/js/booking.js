document.getElementById("book-btn").addEventListener("click", function(event) {
  event.preventDefault();
  let typeOfService = figureWhatService();
  let timeSlotToRemove = figureWhatTime();
  makeAppointment(timeSlotToRemove)
  //deleteTimeSlot();

  console.log(typeof timeSlotToRemove);

  //if (typeOfService !== undefined && timeSlotToRemove !== undefined) {
    //const removeTime = await fetch('/api/schedule/dates', {
      //method: 'DELETE',
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

async function makeAppointment(timeSlotToRemove) {
  let slotIndex;
  if (timeSlotToRemove === "9") {
    slotIndex = "0";
  } else if (timeSlotToRemove === "10") {
    slotIndex = "1";
  } else if (timeSlotToRemove === "12") {
    slotIndex = "2";
  } else if (timeSlotToRemove === "13") {
    slotIndex = "3";
  } else if (timeSlotToRemove === "14") {
    slotIndex = "4";
  } else if (timeSlotToRemove === "15") {
    slotIndex = "5";
  } else if (timeSlotToRemove === "16") {
    slotIndex = "6"
  }
  let person = JSON.parse(localStorage.getItem("user"));
  let appointmentDate = localStorage.getItem("scheduleDate");
  console.log(person.id);
  const make = await fetch('/api/schedule/appointments', {
    method: 'POST',
    body: JSON.stringify({ account_id: person.id, employee_id: "1", time_slot: slotIndex, date: appointmentDate }),
    headers: { 'Content-Type': 'application/json' },
  })
}

function deleteTimeSlot() {

}

