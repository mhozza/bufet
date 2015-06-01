var React = require('react/addons');

var CountInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {count: 1};
  },
  incCount: function() {
    this.setState({count: this.state.count + 1 });
  },
  decCount: function() {
    this.setState({count: this.state.count - 1 });
  },
  render: function() {
    return (
      <div className={this.props.className + " count-input"}>
        <button className="waves-effect waves-light btn" onClick={this.decCount}>-</button>
        <input valueLink={this.linkState('count')} type="number"/>
        <button className="waves-effect waves-light btn" onClick={this.incCount}>+</button>
      </div>
    );
  }
});

module.exports = CountInput;
