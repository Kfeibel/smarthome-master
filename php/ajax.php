<?php
   $json = $_POST['json'];

   /* sanity check */
   if (json_decode($json) != null)
   {
   	
     $file = fopen('../json/devices.json','w+');
     fwrite($file, $json);
     fclose($file);
   }
   else
   {
     // user has posted invalid JSON, handle the error 
   }
?>