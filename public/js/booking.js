let appointmentArray = [];
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
  let appointmentTime;
  if (timeSlotToRemove === "9") {
    appointmentTime = "9 AM";
    slotIndex = 9;
  } else if (timeSlotToRemove === "10") {
    appointmentTime = "10 AM";
    slotIndex = 10;
  } else if (timeSlotToRemove === "12") {
    appointmentTime = "12 PM";
    slotIndex = 12;
  } else if (timeSlotToRemove === "13") {
    appointmentTime = "1 PM";
    slotIndex = 13;
  } else if (timeSlotToRemove === "14") {
    appointmentTime = "2 PM";
    slotIndex = 14;
  } else if (timeSlotToRemove === "15") {
    appointmentTime = "3 PM";
    slotIndex = 15;
  } else if (timeSlotToRemove === "16") {
    appointmentTime = "4 PM";
    slotIndex = 16;
  }
  let person = JSON.parse(localStorage.getItem("user"));
  let appointmentDate = localStorage.getItem("scheduleDate");
  console.log(person.id);
  const make = await fetch('/api/schedule/appointments', {
    method: 'POST',
    body: JSON.stringify({ accountId: person.id, employeeId: 1, timeSlot: slotIndex, date: appointmentDate }),
    headers: { 'Content-Type': 'application/json' },
  });
  let datePop = localStorage.getItem("dateToPopulate");
  let appDate = {
    when: datePop,
    time: appointmentTime,
    with: "Johnson"
  }
  appointmentArray.push(appDate);
  localStorage.setItem("appointments", JSON.stringify(appointmentArray))
}

function deleteTimeSlot() {

}

