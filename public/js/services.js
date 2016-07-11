'use strict';

var app = angular.module('myApp');


app.service('User', function($http, $q) {
  this.profile = () => {
    return $http.get('/api/users/profile')
      .then(res => {
        return $q.resolve(res.data);
      })
  };


  this.getAll = () => {
    return $http.get('/api/users')
      .then(res => {
        return $q.resolve(res.data);
      });
  };
  this.toggleAdmin = (id) => {
    return $http.put(`/api/users/${id}/toggleAdmin`)

  };

  this.addToPortfolio = (symbol) => {
    return $http.post(`/api/users/addStock`, { symbol })
      .catch(err => {
        if (err) console.log(err);
      });
  };


  this.removeStock = (symbol) => {
    return $http.delete(`/api/users/removeStock/${symbol}`)
      .catch(err => {
        if (err) console.log(err);
      });
  };


  this.getStocks = () => {
    return $http.get(`/api/users/stocks`)
      .then(res => {
        console.log(res);
        return $q.resolve(res.data);
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }
});



app.service('Stock', function($http, $q) {

  this.getQuote = (symbol) => {

    return $http.get('/api/stocks/' + symbol)
      .catch(err => {
        console.log(err);
      })

  };
});
