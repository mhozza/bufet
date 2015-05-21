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
          <div className="col s6 m3 l2">
            <LeftPanel selectedItems={this.state.selectedItems}/>
          </div>
          <div className="col s6 m9 l10">
            <ItemBox url={root + 'ajax/getInventory.php'} selectedItemsLink={this.linkState('selectedItems')}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ItemsView;
