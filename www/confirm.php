<?php

include('lib/database.php');

$database = BufetData::getInstance();

$uid = $_GET['user'];
$iid = $_GET['item'];
$amount = $_POST['amount'];
$price = $_POST['price'];

$database->buyItem($uid, $iid, $amount, $price);

header( 'Location: who.php' ) ;
