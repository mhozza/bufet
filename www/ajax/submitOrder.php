<?php
include('../lib/database.php');
$database = BufetData::getInstance();

$uid = $_GET['user'];
$iid = $_GET['item'];
$amount = $_GET['amount'];
$price = $_GET['price'];
print(json_encode($database->buyItem($uid, $iid, $amount, $price)));


