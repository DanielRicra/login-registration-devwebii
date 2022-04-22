document.addEventListener('DOMContentLoaded', () => {
   iniciarAplicacion();
});

const iniciarAplicacion = () => {
   loginEvento();
}

const loginEvento = () => {
   const loginButton =  document.querySelector('#login-btn');

   loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      const httpRequest = new XMLHttpRequest();
      const url = 'http://localhost/controllers/LoginController.php';
      httpRequest.open('post', url, true);

      httpRequest.onload = function () {
         if (httpRequest.status == 200) {
            console.log(this.response);
         }
      }

      httpRequest.send();
   });
}