var React = require('react');

var Item = React.createClass({
  getInitialState: function() {
    return {item: {}};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({item: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDismiss: function (event) {
    console.log(this);
    selectedItems = this.props.selectedItemsLink.value;
    selectedItems.delete(this.props.id);
    this.props.selectedItemsLink.requestChange(selectedItems);
  },
  render: function() {
    return (
      <span>
        {this.state.item.name}
        <a href="#!" className="secondary-content" onClick={this.handleDismiss}><i className="mdi-navigation-close"></i></a>
      </span>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var items = [];
    for (i of this.props.selectedItemsLink.value) {
      items[items.length] = i;
    }
    var selectedItemsLink = this.props.selectedItemsLink;
    var itemNodes = items.map(function (item) {
      return (
        <li key={item} className="collection-item">
          <Item id={item} url={root + "ajax/getItem.php?item=" + item} selectedItemsLink={selectedItemsLink}/>
        </li>
      );
    });
    return (
        <ul className="collection">
          {itemNodes}
        </ul>
    );
  }
});

var BuyBox = React.createClass({
  render: function() {
    return (
      <div>
        <ItemList selectedItemsLink={this.props.selectedItemsLink}/>
        <div className="row ok-cancel-row">
          <div className="col s12 m6">
            <button className="btn waves-effect waves-light red accent-4 truncate col s12" type="submit" name="action">
              <i className="mdi-navigation-check left"></i>
              Buy
            </button>
          </div>
          <div className="col s12 m6">
            <button className="btn waves-effect waves-light grey truncate col s12" type="submit" name="action">
              <i className="mdi-navigation-close left"></i>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BuyBox;
