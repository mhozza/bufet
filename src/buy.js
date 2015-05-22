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
  render: function() {
    return (
      <span>
        {this.state.item.name}
        <a href="#!" className="secondary-content"><i className="mdi-navigation-close"></i></a>
      </span>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var items = [];
    for (i of this.props.itemsLink.value) {
      items[items.length] = i;
    }
    var itemNodes = items.map(function (item) {
      return (
        <li key={item} className="collection-item">
          <Item url={root + "ajax/getItem.php?item=" + item}/>
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
        <ItemList itemsLink={this.props.selectedItemsLink}/>
        <div className="row">
          <button className="btn waves-effect waves-light red col s12 m6" type="submit" name="action">
            <i className="mdi-navigation-check left"></i>
            Buy
          </button>
          <button className="btn waves-effect waves-light grey col s12 m6 truncate" type="submit" name="action">
            <i className="mdi-navigation-close left"></i>
            Cancel
          </button>
        </div>
      </div>
    );
  }
});

module.exports = BuyBox;
