<?php
require_once('../lib/ajaxHeader.php');
require_once('../lib/database.php');
$database = BufetData::getInstance();
$iid = $_GET['item'];
print(json_encode($database->getItem($iid)));
