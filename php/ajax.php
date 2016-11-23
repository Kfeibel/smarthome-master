<?php   
   $json = $_POST['json'];
   
   /* sanity check */
   if (json_decode($json) != null)
   {
     $file = fopen('../json/devices.json','w+');
     var_dump($json); 
     fwrite($file, $json);
     fclose($file);
   }
   else
   {
    var_dump('error'); 
     // user has posted invalid JSON, handle the error 
   }
?>