var React = require('react'),
    CountInput = require('./count_input.js');

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
    selectedItems = this.props.selectedItemsLink.value;
    selectedItems.delete(this.props.id);
    this.props.selectedItemsLink.requestChange(selectedItems);
  },
  render: function() {
    return (
      <span className="row">
        <span className="col s7">{this.state.item.name}</span>
        <a href="#!" className="secondary-content" onClick={this.handleDismiss}><i className="mdi-navigation-close"></i></a>
        <CountInput className="col s3 item-count-input right"/>
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
        <ul className="collection with-header grey">
          <li className="collection-header"><strong>{this.props.title}</strong></li>
          {itemNodes}
        </ul>
    );
  }
});

var BuyBox = React.createClass({
  handleCancel: function (event) {
    selectedItems = this.props.selectedItemsLink.value;
    selectedItems.clear();
    this.props.selectedItemsLink.requestChange(selectedItems);
  },
  render: function() {
    return (
      <div>
        <ItemList title="Nákup" selectedItemsLink={this.props.selectedItemsLink}/>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div className="row no-margin">
              <div className="card-title col s12">Celkom</div>
              <div className="col s8">{this.props.selectedItemsLink.value.size} položky</div>
              <div className="right align-right item-price col s4">0.00&euro;</div>
              </div>
            </div>
            <div className="card-action">
              <div className="row ok-cancel-row">
                <div className="col s12 m6">
                  <button className="btn waves-effect waves-light red accent-4 truncate col s12" type="submit">
                    <i className="mdi-navigation-check left"></i>
                    Kúp
                  </button>
                </div>
                <div className="col s12 m6">
                  <button className="btn waves-effect waves-light blue-grey lighten-1 truncate col s12" onClick={this.handleCancel}>
                    <i className="mdi-navigation-close left"></i>
                    Zrušiť
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
