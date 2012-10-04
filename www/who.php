<?php

include ('lib/database.php');

$database = BufetData::getInstance();
//$data_fetcher = $GLOBALS['fetcher'];

$people = $database->getUsers();
?>
<html>
 <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<body>
<h1>Kto si?</h1>
<ul>
<?php

foreach ($people as $value) {
	//$value = $data_fetcher->fetch($value);

	echo("<li><a href=\"what.php?user=$value[uid]\"> $value[name]<img src=\"$value[picture_url]\" /></a></li>");

}

?>

</ul>
</body>
</html>
