'use strict';

var app = angular.module('myApp', ['ngMaterial','ui.router', 'satellizer', 'btford.socket-io']);

app.config(function($authProvider) {
  $authProvider.loginUrl = '/api/users/login';
  $authProvider.signupUrl = '/api/users/signup';

  $authProvider.facebook({
    clientId: '277768235911300',
    url: '/api/users/facebook'
  });

});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: {
        Profile: function(User) {
          return User.profile();
        }
      }
    })
    // .state('users', {
    //   url: '/users',
    //   templateUrl: '/html/users.html',
    //   controller: 'usersCtrl',
    //   resolve: {
    //     Users: function(User) {
    //       return User.getAll();
    //     }
    //   }
    // })

    .state('stockSearch', {
      url: '/stock-search',
      templateUrl: '/html/stockSearch.html',
      controller: 'stockSearchCtrl'
    })
    .state('portfolio', {
      url: '/portfolio', 
      templateUrl: '/html/portfolio.html', 
      controller: 'portfolioCtrl',
      resolve: {
        Stocks: function(User, Stock) {
          return User.getStocks();
        }
      }

    })
  $urlRouterProvider.otherwise('/');
});



app.factory('socket', function(socketFactory) {
  let socket = socketFactory();

  socket.forward('newMessage');
  return socket;  
});


