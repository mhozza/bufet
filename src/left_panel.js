var React = require('react');

var LeftPanel = React.createClass({
  render: function() {
    return (
        <div className="card-panel red z-depth-2">
          <span className="white-text">I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
          </span>
        </div>
    );
  }
});

module.exports = LeftPanel;
