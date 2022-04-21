<?php 
   $page = isset($_GET['p']) ? $_GET['p']: 'login';
   require_once 'functions/helper.php';
   require_once 'views/header.php';

   require_once 'view/$page.php';

   require_once 'views/footer.php';