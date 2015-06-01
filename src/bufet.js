var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    navigate = require('react-mini-router').navigate,
    UserBox = require('./users.js').UserBox,
    ItemsView = require('./items_view.js');

var App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '': 'home',
        ':user/items/': 'items'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    home: function() {
        return <UserBox url={root + 'ajax/getUsers.php'}/>;
    },

    items: function(user) {
        return <ItemsView url={root + 'ajax/getInventory.php'} uid={user}/>;
    },

    notFound: function(path) {
        return <div className="not-found">Page Not Found: {path}</div>;
    }

});

React.render(
  <App history="true" root={root} />,
  document.getElementById('content')
);

