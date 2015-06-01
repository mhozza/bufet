var React = require('react/addons');

var CountInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getDefaultProps: function() {
    return {
      step: 1,
    };
  },
  getInitialState: function() {
    return {count: 1};
  },
  incCount: function() {
    this.setCount(this.state.count + this.props.step);
  },
  decCount: function() {
    this.setCount(this.state.count - this.props.step);
  },
  handleChange: function(event) {
    this.setCount(event.target.value);
  },
  setCount: function(count) {
    count = parseFloat(count);
    if (((typeof this.props.min === "undefined") || count >= this.props.min) && ((typeof this.props.max === "undefined") || count <= this.props.max)) {
      this.setState({count: count});
      if (this.props.onCountChange)
        this.props.onCountChange(count);
    }
  },

  render: function() {
    return (
      <div className={this.props.className + " count-input"}>
        <button className="waves-effect waves-light btn" onClick={this.decCount}>-</button>
        <input value={this.state.count} onChange={this.handleChange} type="number" />
        <button className="waves-effect waves-light btn" onClick={this.incCount}>+</button>
      </div>
    );
  }
});

module.exports = CountInput;
