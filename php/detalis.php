<?php
//获取前端传过来的sid
include "conn.php";
if(isset($_GET['sid'])){
    $arr =$_GET['sid'];
    $sql ="select *from list where sid = $arr";
    $result =$conn->query($sql);
    $data = $result->fetch_assoc();
    echo json_encode($data);
}