var React = require('react');

var Item = React.createClass({
  render: function() {
    return (
    <div className="user col s12 m3">
      <div className="waves-effect waves-dark card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          <div className="col s4">
            <img src={this.props.picture} className="circle responsive-img" />
          </div>
          <div className="col s8">
            <span className="black-text user-name">
              {this.props.name}
            </span>
          </div>
        </div>
      </div>
    </div>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var itemNodes = this.props.items.map(function (item) {
      return <Item key={item.iid} name={item.name} picture={item.picture_url} id={item.iid}/>
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
        <h1>Items:</h1>
        <ItemList items={this.state.data}/>
      </div>
    );
  }
});

module.exports = ItemBox;
