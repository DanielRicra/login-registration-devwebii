document.addEventListener('DOMContentLoaded', () => {
   iniciarAplicacion();
});

const iniciarAplicacion = () => {
   const email = sessionStorage.getItem("email");
   const logout = document.querySelector("#logout");
   const userBar = document.querySelector('#user-bar')

   const httpRequest = new XMLHttpRequest();
   const url = 'http://localhost:8000/controllers/UserController.php?email=' + email;
   httpRequest.open('get', url, true);
   httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

   httpRequest.onload = function () {
      if (httpRequest.status === 200 && this.getResponseHeader('status').includes('202')) {
         const userData = JSON.parse(this.response);
         const userName = document.querySelector('#user-name');
         userName.textContent = `${userData.name}`;
      } 
   }
   httpRequest.send();

   userBar.addEventListener('click', () =>{ 
      logout.parentElement.classList.toggle('hide');

   });

   logout.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = "/";
   });
}