<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Include the database connection file
include 'db_connect.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = $_POST['name'];
    $category = $_POST['category'];
    $course_name = $_POST['course_name'];
    $level = $_POST['level'];

    // Insert into database
    $sql = "INSERT INTO user_skills (name, category, course_name, level)
            VALUES ('$name', '$category', '$course_name', '$level')";

    if ($conn->query($sql) === TRUE) {
        echo "Enrollment successful!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
