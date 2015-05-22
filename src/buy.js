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
      <div>
        {this.state.item.name}
      </div>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var items = [];
    for (i of this.props.items) {
      items[items.length] = i;
    }
    var itemNodes = items.map(function (item) {
      return <li key={item}><Item url={root + "ajax/getItem.php?item=" + item}/></li>
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
      <div className="card-panel gray">
        <ItemList items={this.props.selectedItems}/>
        <div className="row">
          <button className="btn waves-effect waves-light red col s12 m6" type="submit" name="action">
            <i className="mdi-content-send right"></i>
            Buy
          </button>
          <button className="btn waves-effect waves-light grey col s12 m6 truncate" type="submit" name="action">
            <i className="mdi-content-send right"></i>
            Cancel
          </button>
        </div>
      </div>
    );
  }
});

module.exports = BuyBox;
