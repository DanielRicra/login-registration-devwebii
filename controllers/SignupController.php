<?php
   require '../functions/database.php';

   if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $error = array();
      $status = "";

      $email = $_POST["email"];
      $password = $_POST["password"];
      $name = $_POST["name"];
      $dni = $_POST["dni"];
      $genreId = $_POST["genre"];
      $dob = $_POST["dob"];

      $queryBuscarConEmail = "SELECT * FROM users WHERE email='" . $email . "'";

      $respuesta = $db->query($queryBuscarConEmail);
      $userEmail = [];
      while ($user = $respuesta->fetch_assoc()) {
         $userEmail[] = $user;
      }

      $queryBuscarConDni = "SELECT * FROM users WHERE dni='" . $dni . "'";

      $respuesta = $db->query($queryBuscarConDni);
      $userDni = [];
      while ($user = $respuesta->fetch_assoc()) {
         $userDni[] = $user;
      }

      if (empty($userEmail)) {
         if (empty($userDni)){
            if (esUnEmailValido($email)) {

               $queryInsertarUsuario = "INSERT INTO users(name, password, email, dni, genre_id, dob)"
                                       ." VALUES ('"
                                       . $db->escape_string($name). "', '"
                                       . password_hash($password, PASSWORD_BCRYPT) ."', '"
                                       . $email ."', '"
                                       . $dni ."', "
                                       . $genreId .",'"
                                       . $dob ."')";
            
               $result = $db->query($queryInsertarUsuario);  
               if ($result) {
                  header("status: 202 Accepted");
                  echo json_encode(['user_id' => null, 'email' => $email, 'name' => $name]);
                  exit;
               } else {
                  $status = "status: 500";
                  $error = "Algo salio mal";
               }                               
            } else {
               $error["email"] = "Email invalido";
               $status = "status: 409 Conflict";
            }
         } else {
            $error["dni"] = "Este DNI ya esta en uso";
            $status = "status: 409 Conflict";
         }
         
      } else {
         $error["email"] = "Este correo electronico ya esta en uso";
         $status = "status: 409 Conflict";
      }

      header($status);
      echo json_encode($error);
      exit;

   }

   function esUnEmailValido($email) {
      return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
   }