var selected_uid = 0;
var selected_iid = 0;
var selected_amount = 10;
var userData = null;
var userDataMap = new Array();
var itemData = null;
var itemDataMap = new Array();

// Loading stuff

function submitPayment() {
    if (selected_uid <= 0) {
        alert('Chyba! Nie je vybraty uzivatel! (To ze si vyvolal tuto akciu je bug)');
        return;
    }
    var price = $('input#payment_input').attr('value') * 1000;
    if (price <= 0) {
        alert('Nemozes zaplatit 0 alebo menej!');
        return;
    }
    $.ajax({
        url:"ajax/submitPayment.php?" + $.param({
            "user":selected_uid,
            "price":price
        }),
        success:function(result){
            result = result;
            if (result) {
                alert('Tvoja platba bola zaznamenana');
            } else {
                alert('Doslo k chybe pri zaznamenani platby!');
            }
            redrawEverything();
        }
    });
}

function submitOrder() {
  $.ajax(
    {
      url:"ajax/submitOrder.php?" + $.param({
          "user":selected_uid,
          "item":selected_iid,
          "amount":selected_amount,
          "price":itemData[itemDataMap[selected_iid]].price
      }),
      success:function(result){
        result = result;
        loadTransactions();
        loadItems();
        loadUsers();
        if (result) {
          alert('Dakujem za nakup!');
        } else {
          alert('Nastala chyba! Skus znova alebo sa zapis na papier!');
        }
        selected_iid = 0;
        selected_uid = 0;
        selected_amount = 10;
        redrawEverything();
      }
    }
  );
}

function increaseAmount() {
  selected_amount = parseInt(selected_amount, 10) + parseInt(itemData[itemDataMap[selected_iid]].divisible, 10);
  reloadConfirmDialog();
}

function decreaseAmount() {
  var prev = selected_amount;
  selected_amount = parseInt(selected_amount, 10) - parseInt(itemData[itemDataMap[selected_iid]].divisible, 10);
  if (selected_amount <= 0) {
    selected_amount = prev;
  }
  reloadConfirmDialog();
}

function reloadConfirmDialog() {
  // If there is something selected, show third pane
  if (selected_uid > 0 || selected_iid > 0) {
    $("div#confirm").show();
    $("div#items").css("width", "40%");
  } else {
    $("div#confirm").hide('');
    $("div#items").css("width", "70%");
  }
  // If both are selected, we can submit
  if (selected_uid > 0 && selected_iid > 0) {
    $("div#submit").show();
  } else {
    $("div#submit").hide();
  }
  // Show user history if user is selected
  if (selected_uid > 0) {
    $("div#history").show();
    $("div#balance").show();
    $("div#payment").show();
  } else {
    $("div#history").hide();
    $("div#balance").hide();
    $("div#payment").hide();
  }
  // If item is selected, adjust amount
  if (selected_iid > 0) {
    var descr = itemData[itemDataMap[selected_iid]].descr;
    var price = itemData[itemDataMap[selected_iid]].price;
    $("div#amount").show();
    $("div#price").show();
    $("span#amount_val").html(selected_amount/10);
    $("span#amount_type").html(descr);
    $("span#unit_price").html(price/1000);
    $("span#total_price").html(selected_amount*price/10000)
  } else {
    $("div#amount").hide();
    $("div#price").hide();
  }
 }


function loadUsers() {
  $.ajax(
    {
      url:"ajax/getUsers.php",
      success:function(result){
        userData = result;
        for (var i = 0; i < userData.length; i++) {
          userDataMap[userData[i].uid] = i;
        }
        drawUsers();
        reloadConfirmDialog();
      }
    }
  );
}

function loadItems() {
  $.ajax(
    {
      url:"ajax/getInventory.php",
      success:function(result){
        itemData = result;
        for (var i = 0; i < itemData.length; i++) {
          itemDataMap[itemData[i].iid] = i;
        }
        drawItems();
        reloadConfirmDialog();
      }
    }
  );
}

function loadTransactions() {
  $.ajax({
    url:"ajax/getUserTransactions.php?" + $.param({"user":selected_uid}),
    success:function(result) {
      result = result;
      drawUserTransactions(result);
    }
  });
}

function loadBalance() {
  if (selected_uid <= 0) {
    return ;
  }
  $.ajax({
    url:"ajax/getBalance.php?" + $.param({"user":selected_uid}),
    success:function(result) {
      result = result;
      drawBalance(result);
    }
  });
}

// Drawing stuff

function drawUsers() {
  loadBalance();
  if (userData == null) {
    //load user data?
    return;
  }
  var result = userData;
  if (selected_uid > 0) {
    $("div#people").html(
      $(
        "<input>",
        {
          type:"submit",
          value:"Zruš výber",
          class:"reset",
          click:function(){
            selected_uid = 0;
            redrawEverything();
            $('input#payment_input').attr('value',0);
          }
        }
      )
    );
  } else {
    $("div#people").html("");
  }
  var ul=$("<ul>");
  for (var i = 0; i < result.length; i++) {
    if (selected_uid > 0 && result[i].uid != selected_uid) {
      continue;
    }
    ul.append($(
      "<li>",
      {
        class:"people",
        click: $.proxy(function(uid) {
          selected_uid = uid;
          loadTransactions();
          drawUsers();
          reloadConfirmDialog();
        }, this, result[i].uid)
      }
    ).append(
      $(
        '<img>',
        {
          class:"people",
          alt:result[i].name,
          src:result[i].picture_url
        }
      )
    ));
  }
  ul.appendTo("div#people");
}

function drawItems() {
  if (itemData == null) {
    // load data?
    return;
  }
  var result = itemData;
  if (selected_iid > 0) {
    $("div#items").html(
      $(
        "<input>",
        {
          type:"submit",
          value:"Zruš výber",
          class:"reset",
          click:function(){
            selected_iid = 0;
            redrawEverything();
          }
        }
      )
    );
  } else {
    $("div#items").html("");
  }
  var ul=$("<ul>");
  for (var i = 0; i < result.length; i++) {
    if (selected_iid > 0 && result[i].iid != selected_iid) {
      continue;
    }
    ul.append($(
      "<li>",
      {
        class:"item",
        click: $.proxy(function(iid) {
          selected_iid = iid;
          drawItems();
          reloadConfirmDialog();
        }, this, result[i].iid)
      }
    ).append(
      $(
        "<div>",
        {
          class:"item-text"
        }
      ).append(result[i].name+" ").append((result[i]['price']/1000)+'€ / '
).append(result[i]['descr'])
    ).append(
      $(
        '<img>',
        {
          class:"item",
          alt:result[i].name,
          src:result[i].picture_url
        }
      )
    ));
  }
  ul.appendTo("div#items");
}

function drawUserTransactions(transactions) {
  $("div#history").html("<h2>História</h2>");
  var ul=$("<ul>");
  for (var i = 0; i < transactions.length; i++) {
    ul.append($(
      "<li>",
      {
        class:"history"
      }
    ).append(
      transactions[i].date + ": " +
      transactions[i].type + " of " + transactions[i].name + "(" + 
      transactions[i].amount/10 + " " + transactions[i].descr + ")" + " for " +
      (parseInt(transactions[i].price, 10)*parseInt(transactions[i].amount, 10))/10000
      + "€"
    ));
  }
  ul.appendTo("div#history");
}

function drawBalance(balance) {
  $("div#balance").html("<b>Bilancia:</b> "+balance+"€");
}

function redrawEverything() {
  reloadConfirmDialog();
  drawUsers();
  drawItems();
  loadTransactions();
  loadBalance();
}
