var app = angular.module("loanApp", ["ngRoute", "ngCookies"]);

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
    .when("/user", {
      templateUrl: "./views/user.html",
    })
    .otherwise({
      redirectTo: "/login",
    });
});

// for the log in controller
app.controller(
  "login_controller",
  function ($scope, $http, $location, $cookieStore) {
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
          console.log(response.data);
          if (response.status === 200) {
            $cookieStore.put("email", response.data.email);
            $cookieStore.put("user_type", response.data.user_type);
            $scope.loginSuccess = true;
            $scope.loginError = false;

            if (response.data.user_type == "admin") {
              $location.path("/dashboard");
            } else {
              $location.path("/user");
            }

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
  }
);

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

// for the user controller
app.controller(
  "user_controller",
  function ($scope, $http, $location, $cookieStore) {
    $scope.InProcess = false;
    $scope.loanApproved = false;
    $scope.user_handler = function () {
      $scope.repaymentArray = [];
      var user = $cookieStore.get("email");
      var user_type = $cookieStore.get("user_type");
      var loanAmount = $scope.user_LoanAmount;
      var term = $scope.user_term;
      // $scope.loanApproved = true;

      var loanRepaymentSchedule = loanAmount / term;
      var roundOffValue = Math.floor(loanRepaymentSchedule);
      var getTotalVariation = Math.round(
        (loanRepaymentSchedule - roundOffValue) * term
      );

      var repayment = {
        emi: "",
        amount: "",
        status: "pending",
      };

      for (let i = 0; i < term; i++) {
        // const element = array[index];
        if (i == term - 1) {
          $scope.repaymentArray.push({
            ...repayment,
            emi: i + 1,
            amount: roundOffValue + getTotalVariation,
          });
        } else {
          $scope.repaymentArray.push({
            ...repayment,
            emi: i + 1,
            amount: roundOffValue,
          });
        }
      }

      $http({
        url: "./tools/approval.php",
        method: "POST",
        data: {
          user: user,
          user_type: user_type,
          loanAmount: loanAmount,
          loanTerm: term,
        },
      }).then(
        function successCallback(response) {
          console.log("successCallback response", response);
          $scope.InProcess = true;
        },
        function errorCallback(response) {
          console.log("errorCallback response", response);
        }
      );
    };
    $scope.loan_resetHandler = function () {
      $scope.user_LoanAmount = "";
      $scope.user_term = "";
    };
  }
);

// for admin controller
app.controller("admin_controller", function ($scope, $http) {
  $scope.approvalData;
  $http({
    url: "./tools/get_approval.php",
    method: "GET",
  }).then(
    function successCallback(response) {
      $scope.approvalData = response.data;
      console.log($scope.approvalData);
    },
    function errorCallback(response) {
      console.log(response);
    }
  );
});
