<?php
include("../lib/database.php");
$database = BufetData::getInstance();
$uid = $_GET['user'];
print(json_encode($database->getTransactionsOfUser($uid)));
