<?php
include('../lib/database.php');
$database = BufetData::getInstance();
print(json_encode($database->getInventory()));
