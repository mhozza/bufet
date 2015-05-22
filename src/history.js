var React = require('react');

var HistoryItem = React.createClass({
  render: function() {
    return (
      <li><span className="date">{this.props.date}</span> <span className="type">{this.props.type}</span> <span className="name">{this.props.name}</span> <span className="price">{this.props.price}</span></li>
    );
  }
});

var HistoryList = React.createClass({
  render: function() {
    var items = this.props.items.map(function (item) {
      return <HistoryItem date={item.date} type={item.type} name={item.name} price={(item.price/1000.0).toFixed(2)}/>
    })
    return (
      <ul className="row">
        {items}
      </ul>
    );
  }
});

var HistoryBox = React.createClass({
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
      <div className="histroyBox">
        <HistoryList items={this.state.data}/>
      </div>
    );
  }
});

module.exports = HistoryBox;
