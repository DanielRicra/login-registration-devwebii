<?php 
   require '../functions/database.php';

   if ($_SERVER["REQUEST_METHOD"] === "GET") {
      
      $email = $_GET["email"] ?? "nada";

      $query = "SELECT * FROM users WHERE email='" . $email . "'";
      $respuesta = $db->query($query);
      $userData = [];
      while ($user = $respuesta->fetch_assoc()) {
         $userData[] = $user;
      }
      if (!empty($userData)){
         header("status: 202 Accepted");
         unset($userData[0]["password"]);   
         echo json_encode($userData[0]);
         exit;
      }

      header("status: 404 Not found");
      echo json_encode(["error" => "Usuario no encontrado"]);
      exit;
   }