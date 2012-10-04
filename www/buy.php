<?php

include ('lib/database.php');

$database = BufetData::getInstance();

$uid = $_GET['user'];
$iid = $_GET['item'];

$user_data = $database->getUser($uid);
$item_data = $database->getItem($iid);

?>
<html>
 <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<body>
<?php
$price = $item_data['amount'] * $item_data['price'] /= 100;
echo ("Ja, $user_data[name], potvrdzujem že si chcem kúpiť 1 $item_data[descr] $item_data[name] za cenu $price €.");
echo ("<form action=\"confirm.php?user=$uid&amp;item=$iid\" method=\"POST\">");
echo ("<input type=\"submit\" value=\"Kúp\"><a href=\"who.php\"><input type=\"button\" name=\"cancel\" value=\"Zruš\"></a><input type=\"hidden\" name=\"amount\" value=\"10\"/><input type=\"hidden\" name=\"price\" value=\"$item_data[price]\"/></form>");
	echo("<img src=\"$user_data[picture_url]\" height=\"100px\" />");
	echo("<img src=\"$item_data[picture_url]\" height=\"100px\" />");
?>

</ul>
</body>
</html>
