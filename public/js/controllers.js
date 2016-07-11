'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, $rootScope) {
  // console.log('mainCtrl!');

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  if ($scope.isAuthenticated()) {
    $rootScope.currUser = $auth.getPayload();
  }
  $scope.logout = () => {
    $auth.logout();
    $state.go('home');
  };

  $scope.authenticate = provider => {
    $auth.authenticate(provider)
      .then(res => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };

});


app.controller('loginCtrl', function($scope, $state, $auth, $rootScope) {
  // console.log('loginCtrl!');

  $scope.login = () => {
    $auth.login($scope.user)
      .then(res => {
        console.log('res', res);
        // console.log($auth.getPayload());

        $state.go('stockSearch');
      })
      .catch(err => {
        console.log('err', err);
      })

  };

});


app.controller('registerCtrl', function($scope, $state, $auth) {
  // console.log('registerCtrl!');

  $scope.register = () => {
    if ($scope.user.password !== $scope.user.password2) {
      $scope.user.password = null;
      $scope.user.password2 = null;
      alert('Passwords do NOT match. Try again.')
    } else {

      $auth.signup($scope.user)
        .then(res => {
          console.log('res', res);
          $state.go('login');
        })
        .catch(err => {
          console.log('err', err);
        })
    }

  };

});




app.controller('stockSearchCtrl', function($scope, Stock, User) {
  $scope.isLoading = false;

  $scope.getQuote = () => {
    $scope.isLoading = true;
    Stock.getQuote($scope.symbol)
      .then(res => {
        $scope.isLoading = false;
        $scope.symbol = '';
        $scope.quote = res.data;
      });
  };

  $scope.addToPortfolio = () => {
    User.addToPortfolio($scope.quote.Symbol)
      .then(res => {
        // console.log(res.data);
        alert('Stock Added.');
      });
  };

 




});

app.controller('portfolioCtrl', function($scope, Stocks, User, Stock, $state) {
  $scope.stocks = Stocks;
  $scope.isLoading = false;

  $scope.removeStock = (symbol) => {
    User.removeStock(symbol)
      .then(() => {
        // console.log('removed');
        $state.reload('portfolio');
      });
  };

   $scope.reloadStocks = () => {
    $scope.isLoading = true;
    User.getStocks()
      .then((data) => {
        $scope.isLoading = false;

        $scope.stocks = data;
      });
   };
});




