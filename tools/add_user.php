<?php
include 'config.php';

try {
    //code...
    $request = json_decode(file_get_contents('php://input'));
    // print_r($request->userEmail);
    // $variable = $request->data;
    // echo $variable;

    $sql = $conn->prepare("INSERT INTO User (email,password,user_type) VALUES (:email,:password,:user_type)");
    $sql->bindParam(':email', $email);
    $sql->bindParam(':password', $password);
    $sql->bindParam(':user_type', $user_type);



    $email = $request->userEmail;
    $password = $request->userPass;
    $user_type = "user";
    $sql->execute();


} catch (\Throwable $th) {
    //throw $th;
    print_r($th);
}

?>