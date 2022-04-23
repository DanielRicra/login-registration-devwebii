document.addEventListener('DOMContentLoaded', () => {
   iniciarAplicacion();
});

const iniciarAplicacion = () => {
   signupEventos();
}

const signupEventos = () => {
   const signupForm =  document.querySelector('#signup-form');
   const nombreInput = document.querySelector('#name');
   const emailInput = document.querySelector('#email');
   const dniInput = document.querySelector('#dni');
   const dobInput = document.querySelector('#dob');
   const passwordInput = document.querySelector('#password');

   signupForm.onsubmit = (e) => {
      e.preventDefault();

      let formData = Object.fromEntries(new FormData(signupForm).entries());
      if(!validarFormData(formData)){
         return;
      } 

      const httpRequest = new XMLHttpRequest();
      const url = 'http://localhost:8000/controllers/SignupController.php';
      httpRequest.open('post', url, true);
      httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      httpRequest.onload = function () {
         if (httpRequest.status === 200 && this.getResponseHeader('status').includes('202')) {
            const userData = JSON.parse(this.response);
            
            sessionStorage.setItem("id", userData.user_id);
            sessionStorage.setItem("email", userData.email);
            sessionStorage.setItem("name", userData.name);
            
            window.location.href = "?p=inicio";

         } else {
            const errorResponse = JSON.parse(this.response);
            console.log(errorResponse);
            if (errorResponse.email) {
               const emailError = document.querySelector("#email-error");
               emailError.textContent = `${errorResponse.email}`;
               emailError.classList.add('show-error');

            } 
            if (errorResponse.dni) {
               const passwordError = document.querySelector("#dni-error");
               passwordError.textContent = `${errorResponse.dni}`;
               passwordError.classList.add('show-error');
            }
         }
      }
      httpRequest.send(`email=${formData.email}&password=${formData.password}`
                        + `&name=${formData.name}&dni=${formData.dni}` 
                        + `&dob=${formData.dob}&genre=${formData.genre}`);
   };
   //===================EVENTOS INPUTS ========================
   nombreInput.addEventListener('change', (e) => {
      let nombre = e.target.value;
      if (esUnNombreValido(nombre)) {
         console.log("Ok name")
      } else {
         console.log("Nombre debe ser mayor a 2 caracteres")
      }
   });

   emailInput.addEventListener('change', (e) => {
      if(esUnEmailValido(e.target.value)) {
         console.log("Valid email")
      } else {
         console.log("invalid emaiñ")
      }
   });

   dniInput.addEventListener('change', (e) => {
      if(esUnDniValido(e.target.value)) {
         console.log("Valid DNI")
      } else {
         console.log("invalid DNI")
      }
   });

   dobInput.addEventListener('change', (e) => {
      if  (esUnaFechaValida(e.target.value)) {
         console.log("fecha valida");
      } else {
         console.log("fecha invalida");
      }
   });
   
   passwordInput.addEventListener('change', (e) => {
      let password = e.target.value;
      if (esUnPasswordValido(password)) {
         console.log("Ok password")
      } else {
         console.log("Password debe tener al menos 6 caracteres")
      }
   });

}
//=========================Funciones de validacion===============================
function validarFormData(formData) {
   if (esUnEmailValido(formData.email) && esUnDniValido(formData.dni)
   && esUnaFechaValida(formData.dob) && esUnPasswordValido(formData.password) 
   && esUnNombreValido(formData.name)) {
      return true;
   }
   return false;

}

function esUnNombreValido(name) {
   if (name.length >= 3) {
      return true;
   }
   return false;
}

function esUnPasswordValido(password) {
   if (password.length >= 6) {
      return true;
   } 
   return false;
}

function esUnEmailValido(email) {
   const formatoEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   if (formatoEmail.test(email)) {
      return true;
   }
   return false;
}

function esUnDniValido(dni) {
   const formatoDni = /^[0-9]*$/;
   if (dni.length === 8 && formatoDni.test(dni)) {
      return true;
   }
   return false;
}

function esUnaFechaValida(date) {
   let esFechaValida = Date.parse(date);

   if (isNaN(esFechaValida)){ 
      return false;
   } 
   return true;
}