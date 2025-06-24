<?php
$servername = "localhost";
$username = "root";
$password = "root"; // for MAMP
$dbname = "skillforge_db"; // ✅ must match phpMyAdmin database name exactly

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
