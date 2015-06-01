var React = require('react');

var Item = React.createClass({
  handleClick: function(event) {
    var selected = !this.props.selectedItemsLink.value.has(this.props.id);
    var item = this.props.id;
    selectedItems = this.props.selectedItemsLink.value;
    if (selected) {
      selectedItems.add(item);
    } else {
      selectedItems.delete(item);
    }
    this.props.selectedItemsLink.requestChange(selectedItems);
  },
  render: function() {
    var selected = this.props.selectedItemsLink.value.has(this.props.id);
    var color_class = selected ? "red lighten-3" : "gray lighten-5";
    return (
      <div className="col s6 m4 l2">
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
      selectedItemsLink.requestChange(selectedItems);
    };
    var selectedItemsLink = this.props.selectedItemsLink;
    var itemNodes = this.props.items.map(function (item) {
      return <Item key={item.iid} name={item.name} picture={item.picture_url}
        id={item.iid} price={(item.price/1000.0).toFixed(2)} descr={item.descr} selectedItemsLink={selectedItemsLink}/>
    });
    return (
      <div className="row">
        {itemNodes}
      </div>
    );
  }
});

module.exports = ItemList;
