var React = require('react'),
    BuyBox = require('./buy.js'),
    HistoryBox = require('./history.js');

var LeftPanel = React.createClass({
  render: function() {
    return (
        <div className="card-panel red z-depth-2">
          <BuyBox selectedItemsLink={this.props.selectedItemsLink}/>
          <HistoryBox url={root + "ajax/getUserTransactions.php?user=4"}/>
        </div>
    );
  }
});

module.exports = LeftPanel;
