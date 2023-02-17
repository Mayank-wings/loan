var app = angular.module("loanApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "./views/signin.html",
    })
    .when("/register", {
      templateUrl: "./views/register.html",
    })
    .when("/dashboard", {
      templateUrl: "./views/dashboard.html",
    })
    .otherwise({
      redirectTo: "/login",
    });
});

// for the log in controller
app.controller("login_controller", function ($scope, $http, $location) {
  $scope.loginSuccess = null;
  $scope.loginError = null;
  $scope.submit_handler = function () {
    var userEmail = $scope.log_userEmail;
    var passWord = $scope.log_userPassword;
    // alert(`userEmail : ${userEmail} and password : ${passWord}`);

    $http({
      url: "./tools/login.php",
      method: "POST",
      data: {
        userEmail: userEmail,
        passWord: passWord,
      },
    }).then(
      function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        if (response.status === 200) {
          $scope.loginSuccess = true;
          $scope.loginError = false;
          $location.path("/dashboard");
          // $location.replace();
        } else {
        }
      },
      function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
        $scope.loginSuccess = false;
        $scope.loginError = true;
      }
    );
  };

  $scope.resetHandler = function () {
    $scope.log_userEmail = null;
    $scope.log_userPassword = null;
  };
});

// for the register Controller
app.controller("reg_controller", function ($scope, $http) {
  $scope.reg_handler = function () {
    var reg_email = $scope.reg_userEmail;
    var reg_pass = $scope.reg_userPassword;
    // alert(`reg_user : ${reg_email.length} and password : ${reg_pass.length}`);

    $http({
      url: "./tools/add_user.php",
      method: "POST",
      data: {
        userEmail: reg_email,
        userPass: reg_pass,
      },
    }).then(
      function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
      },
      function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response);
      }
    );
  };

  $scope.resetHandler = function () {
    $scope.log_userEmail = null;
    $scope.log_userPassword = null;
  };
});
