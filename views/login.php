<h1>Login</h1>
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
      <button type="submit" id="login-btn">Login</button>
   </div>
</form>

<?php 
   $script = "<script src='src/js/app.js'></script>";
?>