/**
 * Created by Vipin on 25-08-2016.
 */

myapp.controller( "completeCrtl", function ($scope,$location,Questions,$filter){
    $scope.UserName= localStorage.getItem('user');
    $scope.Password = localStorage.getItem('pass');
    $scope.questions=Questions;
    $scope.authenticated=false;

    if (angular.isDefined($scope.UserName) && angular.equals($scope.UserName, 'vipin')
        && angular.isDefined($scope.Password) && angular.equals($scope.Password, 'test')) {
        $scope.authenticated= true;

        console.log($filter('json')($scope.questions));
        angular.forEach($scope.questions.question,function(value,index){
            console.log("correct value" +value.correct);
            console.log("user selected value "+ value.user);
        })

    }
    else
    {
        $location.url('/');
    }

});