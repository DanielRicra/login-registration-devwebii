<?php
   $db = mysqli_connect('localhost', 'root', '', 'login_registration');

   if (!$db) {
      echo "Error: No se pudo conectar a MySQL";
      echo "error " . mysqli_connect_error();
      exit;
   }