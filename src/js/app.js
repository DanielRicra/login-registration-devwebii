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
            const email = JSON.parse(this.response);
            document.cookie = `email=${email}`;
            window.location.href = "?p=inicio";
         } else if (this.getResponseHeader('status').includes('404')) {
            const errorResponse = JSON.parse(this.response);
            console.log(errorResponse);
            if (errorResponse.email) {
               document.querySelector("#email-error").textContent = `${errorResponse.email}`;

            } else if (errorResponse.password) {
               document.querySelector("#password-error").textContent = `${errorResponse.password}`;
            }
         }
      }
      httpRequest.send(`email=${formData.email}&password=${formData.password}`);
   };
  
}