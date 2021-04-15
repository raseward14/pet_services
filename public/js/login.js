const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      fetch('/api/users/info')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            let individual = data[i];
            if (individual.email === email) {
              let user = {
                id: individual.id,
                name: individual.name,
                email: individual.email,
                pet: individual.pet_name
              }
              localStorage.setItem('user', JSON.stringify(user));
            }
          }
        })
      //localStorage.setItem('user', email);
      //document.location.replace('/info');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);