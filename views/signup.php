<div>
   <h1>Crear Cuenta</h1>
   <form method="post" id="signup-form" novalidate>
      <div class="field">
         <label for="name">Nombre</label>
         <input type="text" name="name" id="name">
         <div class="error" id="name-error"></div>
      </div>   
      
      <div class="field">
         <label for="email">Email</label>
         <input type="email" name="email" id="email">
         <div class="error" id="email-error"></div>
      </div>

      <div class="field">
         <label for="dni">DNI</label>
         <input type="text" name="dni" id="dni">
         <div class="error" id="dni-error"></div>
      </div>

      <div class="field">
         <label for="dob">Año de nacimiento</label>
         <input type="date" name="dob" max="<?php echo date('Y-m-d') ;?>" id="dob">
         <div class="error" id="dob-error"></div>
      </div>

      <div class="field">
         <label>Genero</label>
         <span>
            <label for="fem">Femenino</label>
            <input type="radio" name="genre" id="fem" value="1" checked>
         </span>
         <span>
            <label for="masc">Masculino</label>
            <input type="radio" name="genre" id="masc" value="2">
         </span>
         <span>
            <label for="other">Otro</label>
            <input type="radio" name="genre" id="other" value="3">
         </span>
      </div>

      <div class="field">
         <label for="password">Password</label>
         <input type="password" name="password" id="password">
         <div class="error" id="password-error"></div>
      </div>

      <div class="field">
         <button type="submit" id="signup-btn">Crear cuenta</button>
      </div>
   </form>

   <div class="links">
      <a href="/">Ya tienes una cuenta? Iniciar session</a>
   </div>
</div>

<?php 
   $script = "<script src='src/js/signup.js'></script>";
?>