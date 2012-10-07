var selected_uid = 0;
var selected_iid = 0;
var selected_amount = 10;
var userData = null;
var userDataMap = new Array();
var itemData = null;
var itemDataMap = new Array();

// Loading stuff

submitOrder = function() {
  $.ajax(
    {
      url:"ajax/submitOrder.php?user="+selected_uid+"&item="+selected_iid+"&amount="+selected_amount+"&price="+itemData[itemDataMap[selected_iid]].price,
      success:function(result){
        result = eval(result);
        loadTransactions();
        loadItems();
        loadUsers();
        if (result) {
          alert('Order submitted!');
        } else {
          alert('There was error. Try again or use analog method!');
        }
        selected_iid = 0;
        selected_uid = 0;
        selected_amount = 10;
        redrawEverything();
      }
    }
  );
}

increaseAmount = function() {
  selected_amount = parseInt(selected_amount) + parseInt(itemData[itemDataMap[selected_iid]].divisible);
  reloadConfirmDialog();
}

decreaseAmount = function() {
  var prev = selected_amount;
  selected_amount = parseInt(selected_amount) - parseInt(itemData[itemDataMap[selected_iid]].divisible);
  if (selected_amount <= 0) {
    selected_amount = prev;
  }
  reloadConfirmDialog();
}

reloadConfirmDialog = function() {
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
  } else {
    $("div#history").hide();
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


loadUsers = function() {
  $.ajax(
    {
      url:"ajax/getUsers.php",
      success:function(result){
        userData = eval(result);
        for (var i = 0; i < userData.length; i++) {
          userDataMap[userData[i].uid] = i;
        }
        drawUsers();
        reloadConfirmDialog();
      }
    }
  );
}

loadItems = function() {
  $.ajax(
    {
      url:"ajax/getInventory.php",
      success:function(result){
        itemData = eval(result);
        for (var i = 0; i < itemData.length; i++) {
          itemDataMap[itemData[i].iid] = i;
        }
        drawItems();
        reloadConfirmDialog();
      }
    }
  );
}

loadTransactions = function() {
  $.ajax({
    url:"ajax/getUserTransactions.php?user="+selected_uid,
    success:function(result) {
      result = eval(result);
      drawUserTransactions(result);
    }
  });
}

// Drawing stuff

drawUsers = function() {
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
          value:"Reset selection",
          class:"reset",
          click:function(){
            selected_uid = 0;
            redrawEverything();
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

drawItems = function() {
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
          value:"Reset selection",
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
      result[i].name
    ).append(
      $(
        '<img>',
        {
          class:"item",
          alt:result[i].name,
          src:result[i].picture_url
        }
      )
    ).append(
      result[i]['descr'] + " "+(result[i]['price']/1000)+'EUR'
    ));
  }
  ul.appendTo("div#items");
}

drawUserTransactions = function(transactions) {
  $("div#history").html("");
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
      (parseInt(transactions[i].price)*parseInt(transactions[i].amount))/10000
      + " EUR"
    ));
  }

  ul.appendTo("div#history");

}

redrawEverything = function() {
  reloadConfirmDialog();
  drawUsers();
  drawItems();
  drawUserTransactions();
}
