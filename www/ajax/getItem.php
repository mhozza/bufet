<?php
include('../lib/database.php');
$database = BufetData::getInstance();
$iid = $_GET['item'];
print(json_encode($database->getItem($iid)));
