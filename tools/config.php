<?php
$servername = "localhost";
// $username = "root";
// $password = "mayank@111";
// $dbname = "Loan";
$username = 'mayank';
$password = 'wings123';
$dbname = 'Loan';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Database is Connected!<br>";
    return $conn;
} catch (\Throwable $th) {
    //throw $th;
    print_r($th);
}
?>