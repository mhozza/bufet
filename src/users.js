var React = require('react');

var User = React.createClass({
  render: function() {
    return (
    <div className="user col s12 m3">
      <a className="waves-effect waves-dark card-panel grey lighten-5 z-depth-1" href={root + '/' + this.props.id + '/items' }>
        <div className="row valign-wrapper">
          <div className="col s4">
            <img src={this.props.picture} className="circle responsive-img" />
          </div>
          <div className="col s8">
            <span className="black-text user-name">
              {this.props.name}
            </span>
          </div>
        </div>
      </a>
    </div>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.users.map(function (user) {
      return <User key={user.uid} name={user.name} picture={user.picture_url} id={user.uid}/>
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

module.exports = UserBox;
