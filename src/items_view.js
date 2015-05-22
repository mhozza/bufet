var React = require('react/addons'),
    ItemBox = require('./items.js'),
    LeftPanel = require('./left_panel.js'),
    NavBar = require('./panel.js');


var ItemsView = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {selectedItems: new Set()};
  },
  render: function() {
    return (
      <div>
        <NavBar userurl={root + 'ajax/getUser.php?user=' + this.props.uid} selectedItems={this.state.selectedItems}/>
        <div className="row">
          <div className="col s12 m5 l3">
            <LeftPanel selectedItemsLink={this.linkState('selectedItems')}/>
          </div>
          <div className="col s12 m7 l9">
            <ItemBox url={root + 'ajax/getInventory.php'} selectedItemsLink={this.linkState('selectedItems')}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ItemsView;
