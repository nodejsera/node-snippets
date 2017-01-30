var signupApp = angular.module('signupApp',['ui.router'])


signupApp.config(function($stateProvider, $urlRouterProvider){

 $urlRouterProvider.otherwise('/signup');
    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html'
        })
        .state('success', {
            url: '/success',
            templateUrl: 'success.html'
        })
        .state('show', {
            url: '/show',
            templateUrl: 'show.html'
        })

});


signupApp.controller("signupController", function($scope, $http, $state){
        $scope.name ="";
        $scope.dob = '';
        $scope.password = "";
		$scope.confirmp = "";
        $scope.email = "";
        $scope.country = "";
        $scope.phone = "";
        $scope.country = "";
        $scope.gender = "";
        $scope.interest = "";
		$scope.message = "";
        $scope.signMeUp = function(){
            console.log($scope.name + $scope.dob + $scope.password + $scope.email + $scope.country + $scope.phone + $scope.country + $scope.gender + $scope.interest)
             $http({
        url: 'http://localhost:3000/sign_up',
        method: "POST",
        data: { 'name' : $scope.name, 'dob' : $scope.dob , 'password' : $scope.password, 'email': $scope.email, 'country': $scope.country, 'phone': $scope.phone, 'gender': $scope.gender, 'interest': $scope.interest, 'message': $scope.message }
    })
    .then(function(response) {
            // success
			console.log(response)
            $state.go("success")
    }, 
    function(response) { // optional
            // failed
    });
            
        }

});


signupApp.controller("showController", function($scope,$http){
   $scope.community = ""
   $http({
       url : 'http://127.0.0.1:3000/show',
       method : 'GET',
   })
   .then(function(response){
		console.log(response);
       $scope.community = response.data
   },
   function(response) {

   }
   )

})