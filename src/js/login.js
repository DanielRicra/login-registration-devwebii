document.addEventListener('DOMContentLoaded', () => {
   iniciarAplicacion();
});

const iniciarAplicacion = () => {
   loginEventos();
}

const loginEventos = () => {
   const loginForm =  document.querySelector('#login-form');

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
               const emailError = document.querySelector("#email-error");
               emailError.textContent = `${errorResponse.email}`;
               emailError.classList.add('show-error');

            } else if (errorResponse.password) {
               const passwordError = document.querySelector("#password-error");
               passwordError.textContent = `${errorResponse.password}`;
               passwordError.classList.add('show-error');
            }
         }
      }
      httpRequest.send(`email=${formData.email}&password=${formData.password}`);
   };
  
}