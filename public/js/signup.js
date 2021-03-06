
  const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const petName = document.querySelector('#pet-name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (name && petName && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, petName: petName, role: "user", password}),
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
                email: individual.email
              }
              localStorage.setItem('user', JSON.stringify(user));
            }
          }
        })
        document.location.replace('/info');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.submit')
  .addEventListener('click', signupFormHandler);

