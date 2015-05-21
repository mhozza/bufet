var React = require('react');

var Item = React.createClass({
  getInitialState: function() {
    return {selected: false};
  },
  handleClick: function(event) {
    var selected = !this.state.selected;
    this.setState({selected: selected});
    item = this.props.id;
    this.props.onSelect(item, selected);
  },
  render: function() {
    var color_class = this.state.selected ? "red lighten-3" : "gray lighten-5";
    return (
      <div className="col s6 m3 l2">
        <div className={"item waves-effect waves-dark card z-depth-1 " + color_class} onClick={this.handleClick}>
          <div className="card-image">
            <img className="item-image" src={this.props.picture}/>
          </div>
          <div className="item-content card-content">
            <span className="item-title card-title grey-text text-darken-4">{this.props.name}</span>
            <p className="item-price">Cena:&nbsp;{this.props.price}&euro;/{this.props.descr}</p>
          </div>
        </div>
      </div>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var selectedItemsLink = this.props.selectedItemsLink;
    var handleItemSelect = function(item, selected) {
      selectedItems = selectedItemsLink.value;
      if (selected) {
        selectedItems.add(item);
      } else {
        selectedItems.delete(item);
      }
      console.log(selectedItems);
      selectedItemsLink.requestChange(selectedItems);
    };
    var itemNodes = this.props.items.map(function (item) {
      return <Item key={item.iid} name={item.name} picture={item.picture_url}
        id={item.iid} price={(item.price/1000.0).toFixed(2)} descr={item.descr} onSelect={handleItemSelect}/>
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
        <ItemList items={this.state.data} selectedItemsLink={this.props.selectedItemsLink}/>
      </div>
    );
  }
});

module.exports = ItemBox;
