document.addEventListener('DOMContentLoaded', () => {
   iniciarAplicacion();
});

const iniciarAplicacion = () => {
   loginEventos();
}

const loginEventos = () => {
   const loginForm =  document.querySelector('#login-form');
   const emailInput = document.querySelector('#email');
   const passwordInput = document.querySelector('#password');

   loginForm.onsubmit = (e) => {
      e.preventDefault();
      let formData = Object.fromEntries(new FormData(loginForm).entries());

      const httpRequest = new XMLHttpRequest();
      const url = 'http://localhost:8000/controllers/LoginController.php';
      httpRequest.open('post', url, true);
      httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      httpRequest.onload = function () {
         if (httpRequest.status === 200 && this.getResponseHeader('status').includes('202')) {
            const userData = JSON.parse(this.response);
            
            sessionStorage.setItem("id", userData.user_id);
            sessionStorage.setItem("email", userData.email);
            sessionStorage.setItem("name", userData.name);
            
            window.location.href = "?p=inicio";
         } else if (this.getResponseHeader('status').includes('404')) {
            const errorResponse = JSON.parse(this.response);

            if (errorResponse.email) {
               const emailError = document.createElement('span');
               emailError.id = "email-error";
               emailError.textContent = `${errorResponse.email}`;
               emailError.classList.add('error-text');
               emailInput.parentElement.appendChild(emailError);

            } else if (errorResponse.password) {
               const passwordError = document.createElement('span');
               passwordError.id = "password-error";
               passwordError.textContent = `${errorResponse.password}`;
               passwordError.classList.add('error-text');
               passwordInput.parentElement.appendChild(passwordError);
            }
         }
      }
      httpRequest.send(`email=${formData.email}&password=${formData.password}`);
   };
  
   emailInput.addEventListener('change', () => {
      borrarElementos('#email-error');
   });

   passwordInput.addEventListener('change', () => {
      borrarElementos('#password-error');
   });
}

function borrarElementos(elemento) {
   let errorText = document.querySelectorAll(elemento);
   if (errorText.length > 0) {
      errorText.forEach(elm => elm.remove());
   }
}