<?php
include 'conn.php';
$result_indexone=$conn->query('select*from bmone ');
$result_indextwo=$conn->query('select*from bmtwo ');
$result_list=$conn->query('select*from list ');

$arr_indexone = Array();
$arr_indextwo = Array();
$arr_list=Array();



for($i=0;$i<$result_indexone->num_rows;$i++){
    $arr_indexone[$i]=$result_indexone->fetch_assoc();
}
for($i=0;$i<$result_indextwo->num_rows;$i++){
    $arr_indextwo[$i]=$result_indextwo->fetch_assoc();
}
for($i=0;$i<$result_list->num_rows;$i++){
    $arr_list[$i]=$result_list->fetch_assoc();
}

class Data{

}
$d1 =  new Data();//实例化
$d1->data1= $arr_indexone;
$d1->data2= $arr_indextwo;
$d1->data3= $arr_list;

echo json_encode($d1);