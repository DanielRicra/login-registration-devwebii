<h1>Login</h1>
<form method="post">
   <div class="field">
      <label for="username">Usuario</label>
      <input type="text" name="username" id="username">
   </div>

   <div class="field">
      <label for="password">Password</label>
      <input type="password" name="password" id="password">
   </div>

   <div class="field">
      <button type="submit" id="login-btn">Login</button>
   </div>
</form>

<?php 
   $script = "<script src='src/js/app.js'></script>";
?>