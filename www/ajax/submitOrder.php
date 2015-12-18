<?php
include('../lib/database.php');
$database = BufetData::getInstance();

$uid = $_POST['user'];
$res = array();
foreach ($_POST['items'] as $iid => $info) {
  $amount = 10*$info['amount'];
  $price = $info['price'];
  $res[$iid] = $database->buyItem($uid, $iid, $amount, $price);
}
echo json_encode($res);
