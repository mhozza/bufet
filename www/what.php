<?php

include ('lib/database.php');

$database = BufetData::getInstance();

$uid = $_GET['user'];

$items = $database->getInventory();
?>
<html>
 <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<body>
<h1>Čo chceš?</h1>
<ul>
<?php

foreach ($items as $value) {
	//$value = $data_fetcher->fetch($value);
	$value[price] /= 100;
	echo("<li><a href=\"buy.php?user=$uid&amp;item=$value[iid]\"> $value[name]<img src=\"$value[picture_url]\" height=\"100px\" /></a> Množstvo: $value[descr] Cena: $value[price] €</li>");

}

?>

</ul>
</body>
</html>
