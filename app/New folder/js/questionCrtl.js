/**
 * Created by Vipin on 25-08-2016.
 */

myapp.controller( "questionCrtl", function ($scope,$location,Questions){
    $scope.UserName= localStorage.getItem('user');
    $scope.Password = localStorage.getItem('pass');
    $scope.questionCounter=0;
    $scope.numberOfQuestion=4;
    $scope.questions=Questions;
    $scope.authenticated=false;
    $scope.userAns;

    if (angular.isDefined($scope.UserName) && angular.equals($scope.UserName, 'vipin')
        && angular.isDefined($scope.Password) && angular.equals($scope.Password, 'test')) {
        $scope.authenticated= true;
    }
    else
    {
        $location.url('/');
    }
    $scope.onSubmit = function() {
        $scope.userAns=$scope.questions.question[$scope.questionCounter].user;
        console.log("User Anser :=> "+ $scope.userAns);
        console.log("question counter:=>" +$scope.questionCounter);
        $scope.questionCounter++;
        if($scope.questionCounter<$scope.numberOfQuestion) {
            Questions=$scope.questions;
            return;
        }
        else{
            $location.url('/complete')
        }

    }

});

myapp.factory('Questions', function () {

    var Questions={};
    Questions.question=[
        {
            number:1,
            ques: "Capital of India1",
            choice: {
                ans1: "New Delhi1",
                ans2: "Chennai1",
                ans3: "Mumbai1",
                ans4: "Kolkata1"
            },
            correct:"New Delhi1",
            user:""
        },
        {
            number:2,
            ques: "Capital of India2",
            choice: {
                ans1: "New Delhi2",
                ans2: "Chennai2",
                ans3: "Mumbai2",
                ans4: "Kolkata2"
            },
            correct:"New Delhi2",
            user:""
        },
        {
            number:3,
            ques: "Capital of India3",
            choice: {
                ans1: "New Delhi3",
                ans2: "Chennai3",
                ans3: "Mumbai3",
                ans4: "Kolkata3"
            },
            correct:"New Delhi3",
            user:""
        },
        {
            number:4,
            ques: "Capital of India4",
            choice: {
                ans1: "New Delhi4",
                ans2: "Chennai4",
                ans3: "Mumbai4",
                ans4: "Kolkata4"
            },
            correct:"New Delhi4",
            user:""
        }
    ];
    return Questions;
})