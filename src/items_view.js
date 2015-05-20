var React = require('react'),
    ItemBox = require('./items.js');


var ItemsView = React.createClass({
  render: function() {
    return (
      <div>
        <ItemBox url={root + '/ajax/getInventory.php'}/>;
      </div>
    );
  }
});

module.exports = ItemsView;
