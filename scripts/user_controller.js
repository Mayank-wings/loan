var app = angular.module("loanApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "./views/signup.html",
  });
});

app.controller("login_controller", function ($scope) {
  $scope.submit_handler = function () {
    var userEmail = $scope.log_userEmail;
    var passWord = $scope.log_userPassword;
    alert(`userEmail : ${userEmail} and password : ${passWord}`);
  };

  $scope.resetHandler = function () {
    $scope.log_userEmail = "";
    $scope.log_userPassword = "";
  };
});
