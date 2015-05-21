var React = require('react');

var User = React.createClass({
  render: function() {
    return (
      <div className="valign-wrapper">
        <div className="col s4">
          <div className="user-picture">
            <img src={this.props.picture} className="circle responsive-img" />
          </div>
        </div>
        <div className="col s8">
          <div className="user-name">
            {this.props.name}
          </div>
        </div>
      </div>
    );
  }
});

var UserCard = React.createClass({
  render: function() {
    return (
    <div className="col s12 m3">
      <a className="user waves-effect waves-dark card-panel grey lighten-5 black-text z-depth-1" href={root + this.props.id + '/items/' }>
        <User {...this.props}/>
      </a>
    </div>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.users.map(function (user) {
      return <UserCard key={user.uid} name={user.name} picture={root + user.picture_url} id={user.uid}/>
    })
    return (
      <div className="row">
        {userNodes}
      </div>
    );
  }
});

var UserBox = React.createClass({
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
        <UserList users={this.state.data}/>
      </div>
    );
  }
});

module.exports = {
  'UserBox': UserBox,
  'User': User
}
