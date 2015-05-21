var React = require('react'),
    User = require('./users.js').User;


var NavBar = React.createClass({
  getInitialState: function() {
    return {user: {}};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.userurl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({user: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.userurl, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper red accent-4">
              <ul className="left">
                <li><a href={root}><i className="mdi-navigation-arrow-back"></i></a></li>
                <li className="panel-user"><User name={this.state.user.name} picture={root + this.state.user.picture_url}/></li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }
});

module.exports = NavBar;
