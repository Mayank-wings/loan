<?php

include 'config.php';

try {
  $request = json_decode(file_get_contents('php://input'));
  $data = $request;
  // print_r($data);

  foreach ($data as $email => $status) {
    $sql = $conn->prepare("UPDATE loan SET status=:status WHERE email=:email");
    $sql->bindParam(':status', $status);
    $sql->bindParam(':email', $email);
    $sql->execute();
  }

} catch (\Throwable $th) {
  header('HTTP/1.0 403 SOMETHING_WENT_WRONG');
  print_r($th);
}

?>