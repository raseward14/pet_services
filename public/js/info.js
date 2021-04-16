// variables for input information
let petName = document.getElementById("dog-name");
let petGender = document.getElementById("dog-gender");
let petBirthday = document.getElementById("dog-birthday");
let petBreed = document.getElementById("dog-breed");
let petList = document.getElementById("pet-list");

let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let id = document.getElementById("user-id");


// on click input field disappears
document.getElementById("info-btn").addEventListener("click", function (event) {
  event.preventDefault();
  const infoDiv = document.querySelector(".dogInfo");
  infoDiv.style.display = "hidden";
  const infoForm = document.getElementById("info-form");
  infoForm.style.display = "hidden";
  storePet();
});

// set pet info to local storage
function storePet() {
  // array of pets
  var petArray = savedPets();

  // constructor function for the entered pet creates object
  var myPet = {
    name: petName.value,
    gender: petGender.value,
    birthday: petBirthday.value,
    breed: petBreed.value,
  };

  // push my pet into the array
  petArray.push(myPet);
  localStorage.setItem("yourPets", JSON.stringify(petArray));

  renderPets();
}

// get from local storage on load
function savedPets() {

  var myPets = localStorage.getItem('yourPets');

  // if we have pets in local storage, JSON.parse into an array
  if (myPets !== null) {
    myPets = JSON.parse(myPets);
  } else {
    myPets = [];
  }

  // returns myPets array for the myPets var above
  return myPets;
}

function renderPets() {
  // get pets array
  var myPets = savedPets();
  // sets pet-list innerHTML to empty
  petList.innerHTML = '';

  console.log(myPets);
  // for loop creating pet list
  for(let i=0; i < myPets.length; i++) {
    // each pet has an index in array
    var aPet = document.createElement('li');
    aPet.textContent = `Name: ${myPets[i].name}, Gender: ${myPets[i].gender}, Birthday: ${myPets[i].birthday}, Breed: ${myPets[i].breed}`;
    aPet.setAttribute('data-index', i)
    aPet.classList.add('pet');
    console.log(aPet);
   
    // append the list item to the highscores array
    petList.prepend(aPet);
  }
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

window.onload = function() {
  renderPets();
  renderUser();
}
