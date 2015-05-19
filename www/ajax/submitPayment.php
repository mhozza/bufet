<?php
include('../lib/database.php');
$database = BufetData::getInstance();
$uid = $_GET['user'];
$price = $_GET['price'];
print(json_encode($database->pay($uid, $price)));
