<?php
  $root = "/bufet/www";
?>
<!DOCTYPE html>
<html>
  <head>
    <title>M25 Bufet</title>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<?php echo $root; ?>/css/materialize.min.css">
    <style>
      .user .row {
        margin-bottom:0px;
      }
      .user-name {
        font-size: 1.5em;
      }
      img.item-image {
        object-fit:cover;
        height:120px;
      }
      .item, .user {
        width:95%;
      }
      .item-content.card-content {
        padding-top: 0;
        padding-bottom: 0;
      }
      .item-title{
        float:left;
        margin:0;
      }
      p.item-price {
        text-align: right;
        padding-top:1em;
      }

    </style>
  </head>
  <body>
    <div id="example"></div>
    <div id="content"/>

    <script type="text/javascript">
      var root = '<?php echo $root; ?>';
    </script>
    <script src="<?php echo $root; ?>/js/jquery.js"></script>
    <script src="<?php echo $root; ?>/js/materialize.js"></script>
    <script src="<?php echo $root; ?>/js/bufet.js"></script>
  </body>
</html>
