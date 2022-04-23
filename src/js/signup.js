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
   const passwordInput = document.querySelector('#password');
   const dniInput = document.querySelector('#dni');
   const dobInput = document.querySelector('#dob');

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
               const emailError = document.createElement('span');
               emailError.id = "email-error";
               emailError.textContent = `${errorResponse.email}`;
               emailError.classList.add('error-text');
               emailInput.parentElement.appendChild(emailError);
            } 
            if (errorResponse.dni) {
               const dniError = document.createElement('span');
               dniError.id = "dni-error";
               dniError.textContent = `${errorResponse.dni}`;
               dniError.classList.add('error-text');
               dniInput.parentElement.appendChild(dniError);
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
      esUnNombreValido(nombre);
   });

   emailInput.addEventListener('change', (e) => {
      esUnEmailValido(e.target.value);
   });

   dniInput.addEventListener('change', (e) => {
      esUnDniValido(e.target.value);
   });

   dobInput.addEventListener('input', (e) => {
      esUnaFechaValida(e.target.value);
   });
   
   passwordInput.addEventListener('change', (e) => {
      let password = e.target.value;
      esUnPasswordValido(password);
   });

}
//=========================Funciones de validacion===============================
function validarFormData(formData) {
   esUnEmailValido(formData.email);
   esUnDniValido(formData.dni);
   esUnaFechaValida(formData.dob);
   esUnPasswordValido(formData.password) ;
   esUnNombreValido(formData.name);
   if (esUnEmailValido(formData.email) && esUnDniValido(formData.dni)
   && esUnaFechaValida(formData.dob) && esUnPasswordValido(formData.password) 
   && esUnNombreValido(formData.name)) {
      return true;
   }
   return false;

}

function esUnNombreValido(name) {
   const nameInput = document.querySelector('#name');

   borrarElementos('.error-name');

   if (name.length >= 3) {
      nameInput.classList.remove('error');
      return true;
   }
   const span = document.createElement('SPAN');
   span.textContent = "Nombre debe tener al menos 3 caracteres";
   span.className = 'error-text error-name';
   nameInput.parentElement.appendChild(span);
   nameInput.classList.add('error');
   return false;
}

function esUnPasswordValido(password) {
   const passwordInput = document.querySelector('#password');

   borrarElementos('.error-password');

   if (password.length >= 6) {
      passwordInput.classList.remove('error');
      return true;
   } 
   const span = document.createElement('SPAN');
   span.textContent = "Contraseña debe tener al menos 6 caracteres";
   span.className = 'error-text error-password';
   passwordInput.parentElement.appendChild(span);
   passwordInput.classList.add('error');
   return false;
}

function esUnEmailValido(email) {
   const emailInput = document.querySelector('#email');
   const formatoEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   
   borrarElementos('.error-email');
   borrarElementos('#email-error');

   if (formatoEmail.test(email)) {
      emailInput.classList.remove('error');
      return true;
   }
   const span = document.createElement('SPAN');
   span.textContent = "Email no valido";
   span.className = 'error-text error-email';
   emailInput.parentElement.appendChild(span);
   emailInput.classList.add('error');
   return false;
}

function esUnDniValido(dni) {
   const dniInput = document.querySelector('#dni');
   const formatoDni = /^[0-9]*$/;
   
   borrarElementos('.error-dni');
   borrarElementos('#dni-error');
   
   if (dni.length === 8 && formatoDni.test(dni)) {
      dniInput.classList.remove('error');
      return true;
   }
   
   const span = document.createElement('SPAN');
   span.textContent = "DNI no valido";
   span.className = 'error-text error-dni';
   dniInput.parentElement.appendChild(span);
   dniInput.classList.add('error');
   return false;
}

function esUnaFechaValida(date) {
   const fechaInput = document.querySelector('#dob');
   let esFechaValida = Date.parse(date);

   borrarElementos('.error-date');

   if (isNaN(esFechaValida)){ 
      const span = document.createElement('SPAN');
      span.textContent = "Fecha no valida";
      span.className = 'error-text error-date';
      fechaInput.parentElement.appendChild(span);
      fechaInput.classList.add('error');
      return false;
   } 
   fechaInput.classList.remove('error');
   return true;
}

function borrarElementos(elemento) {
   let errorText = document.querySelectorAll(elemento);
   if (errorText.length > 0) {
      errorText.forEach(elm => elm.remove());
   }
}