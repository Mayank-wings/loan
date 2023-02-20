<?php

include 'config.php';

try {
    $sql = $conn->prepare("SELECT * FROM loan");
    $sql->execute();
    // $array = $sql->fetch(PDO::FETCH_ASSOC);
    $array = $sql->fetchAll();
    echo json_encode($array);

} catch (\Throwable $th) {
    print_r($th);
}


?>