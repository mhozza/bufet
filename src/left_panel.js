var React = require('react'),
    BuyBox = require('./buy.js'),
    HistoryBox = require('./history.js');

var LeftPanel = React.createClass({
  render: function() {
    return (
        <div className="card-panel red darken-2 z-depth-2">
          <BuyBox user={this.props.user} buyurl={this.props.buyurl} items={this.props.items} selectedItemsLink={this.props.selectedItemsLink} onBuy={this.props.onBuy}/>
          <HistoryBox url={root + "ajax/getUserTransactions.php?user=4"}/>
        </div>
    );
  }
});

module.exports = LeftPanel;
