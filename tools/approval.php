<?php
include 'config.php';

try {
    $request = json_decode(file_get_contents('php://input'));
    $user = $request->user;
    $user_type = $request->user_type;
    $loanAmount = $request->loanAmount;
    $term = $request->loanTerm;
    $loanStatus = "pending";
    $id = uniqid();

    $sql = $conn->prepare("INSERT INTO loan(email,user_type,amount,term,status,id) VALUES (:email,:user_type,:amount,:term,:status,:id)");
    $sql->bindParam(':email', $user);
    $sql->bindParam(':user_type', $user_type);
    $sql->bindParam(':amount', $loanAmount);
    $sql->bindParam(':term', $term);
    $sql->bindParam(':status', $loanStatus);
    $sql->bindParam(':id', $id);
    $sql->execute();

    // print_r($request->user);
    // print_r(" ");
    // print_r($request->user_type);
    // print_r(" ");
    // print_r($request->loanAmount);
    // print_r(" ");
    // print_r($request->loanTerm);
    // print_r(" ");
    // print_r($loanStatus);

} catch (\Throwable $th) {
    header('HTTP/1.0 403');
    print_r($th);
}
?>