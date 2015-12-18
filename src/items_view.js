var React = require('react/addons'),
    ItemList = require('./items.js'),
    LeftPanel = require('./left_panel.js'),
    NavBar = require('./panel.js'),
    navigate = require('react-mini-router').navigate;


var ItemsView = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      items: [],
      selectedItems: new Set()
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleBuy: function() {
    navigate(root);
  },
  render: function() {
    return (
      <div>
        <NavBar userurl={root + 'ajax/getUser.php?user=' + this.props.uid} selectedItems={this.state.selectedItems}/>
        <div className="row">
          <div className="col s12 m5 l3">
            <LeftPanel buyurl={root + 'ajax/submitOrder.php'} user={this.props.uid} items={this.state.items} selectedItemsLink={this.linkState('selectedItems')} onBuy={this.handleBuy}/>
          </div>
          <div className="col s12 m7 l9">
            <ItemList items={this.state.items} selectedItemsLink={this.linkState('selectedItems')}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ItemsView;
