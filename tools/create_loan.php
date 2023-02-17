<?php
include 'config.php';



// $sql = "SELECT * FROM User";
// $sql = "CREATE TABLE User (
//     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(30) NOT NULL,
//     password VARCHAR(30) NOT NULL,
//     user_type VARCHAR(50),
//     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )";

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