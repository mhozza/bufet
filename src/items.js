var React = require('react');

var Item = React.createClass({
  render: function() {
    return (
    <div className="col s6 m3 l2">
      <div className="item waves-effect waves-dark card grey lighten-5 z-depth-1">
        <div className="card-image">
          <img className="item-image" src={this.props.picture}/>
        </div>
        <div className="item-content card-content">
          <span className="item-title card-title grey-text text-darken-4">{this.props.name}</span>
          <p className="item-price">Cena:&nbsp;{this.props.price}&euro;</p>
        </div>
      </div>
    </div>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var itemNodes = this.props.items.map(function (item) {
      return <Item key={item.iid} name={item.name} picture={item.picture_url}
        id={item.iid} price={item.price/100.0}/>
    })
    return (
      <div className="row">
        {itemNodes}
      </div>
    );
  }
});

var ItemBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <ItemList items={this.state.data}/>
      </div>
    );
  }
});

module.exports = ItemBox;
