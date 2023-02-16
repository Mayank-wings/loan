<?php 
include 'config.php';



$sql = "SELECT * FROM User";

// $smtm = $conn->prepare($sql);
// $smtm = execute();
// $result =  $stmt->setFetchMode(PDO::FETCH_ASSOC);
// foreach (($stmt->fetchAll()) as $key => $value) {
//     # code...
//     echo $value;
// };

$result = $conn->exec($sql);
echo $result;


?>