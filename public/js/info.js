// variables for input information
let petName = document.getElementById("dog-name");
let petGender = document.getElementById("dog-gender");
let petBirthday = document.getElementById("dog-birthday");
let petBreed = document.getElementById("dog-breed");
let petList = document.getElementById("pet-list");

let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let id = document.getElementById("user-id");
let another = document.getElementById("new-btn");

// on click input field disappears
document.getElementById("info-btn").addEventListener("click", function (event) {
  event.preventDefault();
  //const infoDiv = document.querySelector(".dogInfo");
  //infoDiv.style.display = "none";
  const infoForm = document.getElementById("info-form");
  infoForm.style.display = "none";
  var myPet = {
    name: petName.value,
    gender: petGender.value,
    birthday: petBirthday.value,
    breed: petBreed.value,
  };
  let petArray = [];
  petArray.push(myPet);
  let pets = JSON.parse(localStorage.getItem("yourPets"));
  if (pets !== null) {
    for (var i = 0; i < pets.length; i++) {
      petArray.push(pets[i]);
    }
    localStorage.setItem("yourPets", JSON.stringify(petArray));
  } else {
    localStorage.setItem("yourPets", JSON.stringify(petArray));

  }
  renderPets();
});

// set pet info to local storage


function renderPets() {
  // get pets array
  var myPets = [];
  myPets.push(JSON.parse(localStorage.getItem('yourPets')));




  if (myPets !== null) {
    console.log(myPets);
    document.getElementById("userInfo").style.display = "inline";
    document.getElementById("info-form").style.display = "none";
    for (let i = 0; i < myPets.length; i++) {
      // each pet has an index in array
      var aPet = document.createElement('li');
      console.log('loop doesnt work');
      aPet.textContent = `Name: ${myPets[i].name}, Gender: ${myPets[i].gender}, Birthday: ${myPets[i].birthday}, Breed: ${myPets[i].breed}`;
      aPet.setAttribute('data-index', i)
      aPet.classList.add('pet');
      console.log(aPet);

      // append the list item to the highscores array
      petList.appendChild(aPet);
    }
  } else {
    document.getElementById("info-form").style.display = "inline";
    document.getElementById("userInfo").style.display = "none";
  }
  // for loop creating pet list

}

function renderUser() {
  // gets the user from local storage
  var user = localStorage.getItem('user');

  // if we have a user in local storage, JSON.parse into a js object, otherwise return an empty array
  if (user !== null) {
    user = JSON.parse(user);
  } else {
    user = [];
  }

  var aUserName = document.createElement('p');
  var aUserEmail = document.createElement('p');

  aUserName.textContent = user.name;
  aUserEmail.textContent = user.email;

  console.log(user);

  userName.append(aUserName);
  userEmail.append(aUserEmail);

}

function renderAppointments() {
  let bookingsDiv = document.getElementById('bookings');
  let bookings = JSON.parse(localStorage.getItem("appointments"));
  if (bookings !== null) {
    console.log(bookings);
    for (var i = 0; i < bookings.length; i++) {
      let newAppointment = document.createElement('p');
      newAppointment.textContent = bookings[i].when + " @" + bookings[i].time + " with " + bookings[i].with;
      bookingsDiv.appendChild(newAppointment);
    }
  }
}
another.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("info-form").style.display = "inline";
  document.getElementById("userInfo").style.display = "none";
})

window.onload = function() {
  renderPets();
  renderUser();
  renderAppointments();
}
