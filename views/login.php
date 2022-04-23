<div>
   <h1>Iniciar Session</h1>
   <form method="post" id="login-form">
      <div class="field">
         <label for="email">Email</label>
         <input type="email" name="email" id="email">
         <div class="error" id="email-error"></div>
      </div>

      <div class="field">
         <label for="password">Password</label>
         <input type="password" name="password" id="password">
         <div class="error" id="password-error"></div>
      </div>

      <div class="field">
         <button type="submit" id="login-btn">LogIn</button>
      </div>
   </form>

   <div class="links">
      <a href="/?p=signup">Aun no tienes una cuenta? Registrate aqui</a>
   </div>
</div>


<?php 
   $script = "<script src='src/js/login.js'></script>";
?>