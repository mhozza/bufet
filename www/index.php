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
      .row.no-margin, .user .row, .card-action .row {
        margin-bottom:0px;
      }
      .user-name {
        font-size: 1.3em;
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
      .item-title {
        margin:0;
      }
      .item-price {
        text-align: right;
      }

      .panel-user {
        margin-bottom:0px;
        padding-right: 1em;
        height: 64px;
      }

      .panel-user .user-picture {
        height: 64px;
      }

      .panel-user img {
        height: 30px;
        margin:17px;
      }

    </style>
  </head>
  <body>
    <div id="example"></div>
    <div id="content"/>

    <script type="text/javascript">
      var root = '<?php echo $root; ?>/';
    </script>
    <script src="<?php echo $root; ?>/js/jquery.js"></script>
    <script src="<?php echo $root; ?>/js/materialize.js"></script>
    <script src="<?php echo $root; ?>/js/bufet.js"></script>
  </body>
</html>
