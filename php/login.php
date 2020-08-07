<?php
include "conn.php";
$user = $_POST['username'];
$pass = $_POST['password'];
if(isset($user) && isset($pass)){
    $result= $conn->query("select*from registry where username ='$user'and password = '$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}