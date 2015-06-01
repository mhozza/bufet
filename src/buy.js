var React = require('react'),
    CountInput = require('./count_input.js');

var Item = React.createClass({
  handleDismiss: function (event) {
    selectedItems = this.props.selectedItemsLink.value;
    selectedItems.delete(this.props.id);
    this.props.selectedItemsLink.requestChange(selectedItems);
  },
  render: function() {
    return (
      <span className="row">
        <span className="col s7">{this.props.item.name}</span>
        <a href="#!" className="secondary-content" onClick={this.handleDismiss}><i className="mdi-navigation-close"></i></a>
        <CountInput className="col s3 item-count-input right"
          step={this.props.item.divisible/10} min={this.props.item.divisible/10}
          onCountChange={this.props.onCountChange} count={this.props.count}/>
      </span>
    );
  }
});

var ItemList = React.createClass({
  getInitialState: function() {
    return {
      counts: {},
    };
  },
  handleCountChange: function(item, count) {
    this.state.counts[item] = count;
    this.setState({counts: this.state.counts});
    if(this.props.onCountChange) {
      this.props.onCountChange(this.state.counts);
    }
  },
  render: function() {
    var items = [];
    for (i of this.props.selectedItemsLink.value) {
      items[items.length] = i;
    }
    var selectedItemsLink = this.props.selectedItemsLink;
    var itemNodes = items.map(function (item, i) {
      return (
        <li key={item} className="collection-item">
          <Item id={item} item={this.props.items_dict[item]}
                selectedItemsLink={selectedItemsLink}
                onCountChange={this.handleCountChange.bind(this, item)}
          />
        </li>
      );
    }.bind(this));
    return (
        <ul className="collection with-header grey">
          <li className="collection-header"><strong>{this.props.title}</strong></li>
          {itemNodes}
        </ul>
    );
  }
});

var BuyBox = React.createClass({
  getInitialState: function() {
    return {
      counts: {},
      items_dict: {},
      price: 0
    };
  },
  componentWillReceiveProps: function(nextProps) {
    for (item of nextProps.items) {
      this.state.items_dict[item.iid] = item;
    }
    this.clearUnusedCounts();
    this.computePrice();
  },
  clearUnusedCounts: function() {
    for (item in this.state.counts) {
      if (!this.props.selectedItemsLink.value.has(item)) {
         delete this.state.counts[item];
      }
    }
  },
  computePrice: function() {
    console.log('price update', this.state.counts);
    price = 0;
    for (item of this.props.selectedItemsLink.value) {
      count = 1;
      if (typeof this.state.counts[item] !== "undefined") {
        count = this.state.counts[item];
      }
      price += this.state.items_dict[item].price * count / 1000;
      console.log(item, count, price)
    }
    this.setState({price: price});
  },
  updateCounts : function(counts) {
    console.log("count update", counts);
    this.setState({counts: counts}, this.computePrice);
  },
  render: function() {
    return (
      <div>
        <ItemList items_dict={this.state.items_dict} title="Nákup" selectedItemsLink={this.props.selectedItemsLink} onCountChange={this.updateCounts}/>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <div className="row no-margin">
            <div className="card-title col s12">Celkom</div>
            <div className="col s8">{this.props.selectedItemsLink.value.size} položky</div>
            <div className="right align-right item-price col s4">{this.state.price.toFixed(2)}&euro;</div>
            </div>
          </div>
          <div className="card-action">
            <div className="row ok-cancel-row">
              <div className="col s12">
                <button className="btn waves-effect waves-light red accent-4 truncate col s12" type="submit">
                  <i className="mdi-navigation-check left"></i>
                  Kúp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BuyBox;
