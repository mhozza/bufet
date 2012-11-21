<!DOCTYPE html>
<html>
  <meta http-equiv='Content-Type' content='text/html; charset=utf8' />
  <head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" ></script>
    <script src="js/main.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <link rel="stylesheet" href="css/main.css" />
    <style type="text/css">
    </style>
    <script>
      $(document).ready(function() {
        loadParameters(<?php if (isset($_GET['uid'])) {
          echo($_GET['uid']);
        } else {
          echo(0);
        }?>, <?php
        if (isset($_GET['iid'])) {
          echo($_GET['iid']);
        } else {
          echo(0);
        }
        ?>);
        loadUsers();
        loadItems();
      })
    </script>
  </head>
  <body>
    <div class="top_bar" id="top_bar"> 
    </div>
    <div class="people_pane" id="people">
    </div>
    <div class="item_pane" id="items">
    </div>
    <div class="confirm_pane" id="confirm">
        <div class="amount" id="amount">
          Množstvo: <span id="amount_val" ></span> <span id="amount_type" ></span> <input type="submit" value="+" onclick="increaseAmount()" /> <input type="submit" value="-" onclick="decreaseAmount()" />
        </div>
        <div class="price" id="price">
          Cena za <span id="amount_type" ></span>: <span id="unit_price" ></span><br/>
          Celková cena: <span id="total_price"></span>
        </div>
        <div class="confirm" id="submit">
          <input type="submit" value="Kúp" onclick="submitOrder()"class="buy" />
        </div>
        <div class="confirm" id="balance">
          Bilancia
        </div>
        <div class="confirm" id="payment">
          Chcem zaplatiť do kasičky <input type="number" value="0" id="payment_input"/> €
          <input type="submit" value="Zaplať" onclick="submitPayment()"/>
        </div>
        <div class="history" id="history">
         História
       </div>
    </div>
  </body>
</html>

