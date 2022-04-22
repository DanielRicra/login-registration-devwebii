<?php
   if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $respuesta = array();
      $respuesta["exito"] = true;
      $respuesta["mensaje"] = "Usuario creado con exito";
      echo json_encode($respuesta);
   }

   
