<div class="flex-center column min-h-100">
   <h1 class="title">Iniciar Session</h1>
   <form method="post" id="login-form" class="form">
      <div class="field">
         <label for="email">Email</label>
         <input type="email" name="email" id="email" class="primary-p input" autofocus>
      </div>

      <div class="field">
         <label for="password">Password</label>
         <input type="password" name="password" id="password" class="primary-p input">
      </div>

      <div class="field">
         <button type="submit" id="login-btn" class="primary-p button">LogIn</button>
      </div>
   </form>

   <div class="links">
      <a href="/?p=signup">Aun no tienes una cuenta? Registrate aqui</a>
   </div>
</div>

<?php 
   $script = "<script src='src/js/login.js'></script>";
?>