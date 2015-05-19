<?php
require_once('../lib/ajaxHeader.php');
require_once('../lib/database.php');
$database = BufetData::getInstance();
print(json_encode($database->getUsers()));
