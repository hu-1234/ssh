<?php
include "conn.php";
// 判断是否已经存在用户名
if(isset($_POST['user'])){
    $usr = $_POST['user'];
    $sql = "select *from registry where username = '$usr'";
    $result=$conn->query($sql);

    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }

}









// 点击submit
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];
    $tel = $_POST['tel'];
    $sql = "insert registry values(null,'$user','$pass','$email','$tel',NOW())";
    $conn->query($sql);
     header("location:http://127.0.0.1/practice/BMitem/src/login.html");
}


    
