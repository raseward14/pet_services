function favTutorial() {  
    var mylist = document.getElementById("myList");  
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
    } 
    console.log('something');
const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const petName = document.querySelector('#pet-name-signup').value.trim();
    const role = document.querySelector('#favourite').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (name && petName && role && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, petName: petName, role: role, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/calendar');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.submit')
  .addEventListener('click', signupFormHandler);

  favTutorial();