<?php
  $root = "/bufet/www";
?>
<!DOCTYPE html>
<html>
  <head>
    <title>M25 Bufet</title>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<?php echo $root; ?>/css/materialize.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $root; ?>/css/bufet.css">
  </head>
  <body>
    <div id="content"/>
    <script type="text/javascript">
      var root = '<?php echo $root; ?>/';
    </script>
    <script src="<?php echo $root; ?>/js/jquery.js"></script>
    <script src="<?php echo $root; ?>/js/materialize.js"></script>
    <script src="<?php echo $root; ?>/js/bufet.js"></script>
  </body>
</html>
