<?php
   require '../functions/database.php';

   if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $error = array();

      $email = $_POST["email"];
      $password = $_POST["password"];

      $query = "SELECT * FROM users WHERE email='" . $email . "'";
      $respuesta = $db->query($query);
      $userData = [];
      while ($user = $respuesta->fetch_assoc()) {
         $userData[] = $user;
      }

      if (!empty($userData)) {
         if (password_verify($password, $userData[0]["password"])){
            header("status: 202 Accepted");
            unset($userData[0]["password"]);   
            echo json_encode($userData[0]);
            exit;
         } else {
            $error["password"] = "Contraseña incorrecta";
         }
      } else {
         $error["email"] = "Este correo electronico no existe";
      }

      header("status: 404 Not found");
      echo json_encode($error);
      exit;

   }


   
