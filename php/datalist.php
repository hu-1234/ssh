<?php
include "conn.php";
$pagesize = 18; //每一页显示的条数
$sql = "select *from list";
$result= $conn->query($sql);
$num = $result->num_rows;
$pagenum = ceil($num/$pagesize);//求有几页


if(isset($_GET['page'])){//判断是否列表页传送page，默认不传送是1
    $pagevalue = $_GET['page'];

}else{
    $pagevalue = 1;
}
$page = ($pagevalue-1)*$pagesize;

$res = $conn->query("select*from list limit $page,$pagesize");

$arr=array();
for($i=0;$i<$res->num_rows;$i++){
    $arr[$i]= $res->fetch_assoc();
}
echo json_encode($arr);