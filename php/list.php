<?php
include 'conn.php';
$result_list=$conn->query('select*from list ');
$result_index=$conn->query('select*from bmgoods ');


$arr_list=Array();
$arr_index = Array();

for($i=0;$i<$result_index->num_rows;$i++){
    $arr_list[$i]=$result_index->fetch_assoc();
}
for($i=0;$i<$result_list->num_rows;$i++){
    $arr_list[$i]=$result_list->fetch_assoc();
}
 $obj={
     
 }

echo json_encode($arr);