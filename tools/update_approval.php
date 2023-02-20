<?php 

include 'config.php';

try {
    $request = json_decode(file_get_contents('php://input'));
    $user = $request->email;

    $sql="UPDATE loan SET status='approved' WHERE status='pending' AND email=':email'"
} catch (\Throwable $th) {
  print_r($th);    
}

?>