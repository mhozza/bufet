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
        var selection = '';
        if (this.props.selectedItems.size > 0) {
            selection = <li className="hide-on-small-only">označené {this.props.selectedItems.size} položky</li>;
        }
        return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper red accent-4 row">
              <ul className="left col">
                <li><a href={root}><i className="mdi-navigation-arrow-back"></i></a></li>
                <li className="panel-user"><User name={this.state.user.name} picture={root + this.state.user.picture_url}/></li>
                {selection}
              </ul>
            </div>
          </nav>
        </div>
    );
  }
});

module.exports = NavBar;
