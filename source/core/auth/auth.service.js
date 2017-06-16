angular.module('core.auth').factory('Auth', [ function($http) {
  const user = {};

  return {
    setUser: function (name, isAdmin, token) {
      user.name = name;
      user.isAdmin = isAdmin;
      user.token = token;
      console.log("Данные пользователя сохранены");
      console.log(user);
  //    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
    },
    getUserName: function () {
      return user.name;
    },
    getToken: function() {
      return user.token;
    },
    isAdmin: function () {
      return user.isAdmin;
    },
    logout: function () {
      this.setUser(null, null, null);
    },
    login: function (/*$http, $localStorage*/) {

    }
  }
}]);
//http://jasonwatmore.com/post/2016/04/05/angularjs-jwt-authentication-example-tutorial

/*

        function Login(username, password, callback) {
            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
        */
