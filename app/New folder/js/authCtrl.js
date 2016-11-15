/**
 * Created by Vipin on 04-08-2016.
 */
myapp.controller( "authCtrl", function ($scope,$location){
    $scope.UserName;
    $scope.Password;
    $scope.profile={};
    // alert("my username is "+ $scope.Username +" Password:=> "+$scope.Password);

    alert("in anothe controller");
        console.log(" getting item from storage "+ localStorage);
        $scope.UserName= localStorage.getItem('user');

        $scope.Password = localStorage.getItem('pass');

        console.log("Username :"+$scope.UserName);
        console.log("Password :"+$scope.Password);
    $scope.onSubmit = function() {
        if (angular.isDefined($scope.UserName) && angular.equals($scope.UserName, 'vipin')
            && angular.isDefined($scope.Password) && angular.equals($scope.Password, 'test')) {
            console.log($scope.profile.fullName);
            console.log($scope.profile.address);
            console.log($scope.profile.email);
            console.log($scope.profile.number);
            console.log($scope.profile.rollnumber);
            localStorage.setItem('profile',$scope.profile);
            $location.url('/start');

        }


    }



});

