<!DOCTYPE html>
<html>
  <meta http-equiv='Content-Type' content='text/html; charset=utf8' />
  <head>
    <script src="js/jquery.js"></script>
    <script src="js/main.js"></script>
    <link rel="stylesheet" href="css/main.css" />
    <style type="text/css">
    </style>
    <script>
      $(document).ready(function() {
        loadUsers();
        loadItems();
       // loadUser(4);
      })
    </script>
  </head>
  <body>
    <div class="people_pane" id="people">
      People
    </div>
    <div class="item_pane" id="items">
      Items
    </div>
    <div class="confirm_pane" id="confirm">
        <div class="amount" id="amount">
          Amount: <span id="amount_val" ></span> <span id="amount_type" ></span> <input type="submit" value="+" onclick="increaseAmount()" /> <input type="submit" value="-" onclick="decreaseAmount()" />

        </div>
        <div class="price" id="price">
          Price per <span id="amount_type" ></span>: <span id="unit_price" ></span><br/>
          Total price: <span id="total_price"></span>
        </div>
        <div class="confirm" id="submit">
          <form action="#">
            <input type="submit" value="Place order" onclick="submitOrder()" />
          </form>
        </div>
        <div class="history" id="history">
         History
       </div>
    </div>
  </body>
</html>

