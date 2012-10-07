<?php
require_once('../lib/ajaxHeader.php');
require_once('../lib/database.php');
$database = BufetData::getInstance();
$uid = $_GET['user'];
print(json_encode($database->getTransactionsOfUser($uid)));
