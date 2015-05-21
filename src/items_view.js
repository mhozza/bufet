var React = require('react'),
    ItemBox = require('./items.js'),
    NavBar = require('./panel.js');


var ItemsView = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar userurl={root + 'ajax/getUser.php?user=' + this.props.uid}/>
        <ItemBox url={root + 'ajax/getInventory.php'}/>
      </div>
    );
  }
});

module.exports = ItemsView;
