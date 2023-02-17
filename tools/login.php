<?php
include 'config.php';

session_start();
try {
    $request = json_decode(file_get_contents('php://input'));
    // print_r($request->userEmail);
    // print_r($request->passWord);

    $email = $request->userEmail;
    $password = $request->passWord;

    $sql = $conn->prepare("SELECT * FROM User WHERE email=:email AND password=:password");

    $sql->execute(array(':email' => $email, ':password' => $password));
    $count = $sql->rowCount();
    $array = $sql->fetch();
    echo json_encode($array);
    if ($count > 0) {
        // $_SESSION["username"] = "$email";
        return json_encode($array);
    } else {
        header('HTTP/1.0 403 UNAUTORIZED');
    }
    // echo $result;

} catch (\Throwable $th) {
    print_r($th);
}

?>