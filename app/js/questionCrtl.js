/**
 * Created by Vipin on 25-08-2016.
 */

myapp.controller("questionCrtl", function ($scope, $location, $q, questionService, QuestionsServiceFactory,configService) {
    $scope.UserName = localStorage.getItem('user');
    $scope.Password = localStorage.getItem('pass');
    $scope.questionCounter = 0;
    $scope.numberOfQuestion = 4;
    $scope.questions = {};
    $scope.showPreviousButton=false;
    $scope.showNextButton=false;
    $scope.authenticated = false;
    $scope.userAns;

    if (angular.isDefined($scope.UserName) && angular.equals($scope.UserName, 'vipin')
        && angular.isDefined($scope.Password) && angular.equals($scope.Password, 'test')) {
        $scope.authenticated = true;
        $scope.questions = QuestionsServiceFactory;
        console.log("$scope.questions "+ JSON.stringify($scope.questions ));
    }
    else {
        $location.url('/');
    }
    $scope.onSubmit = function () {
        $scope.questions.question[$scope.questionCounter].user =$scope.userAns;
            console.log("User Anser :=> " + $scope.userAns);
        console.log("question counter:=>" + $scope.questionCounter);
        $scope.questionCounter++;
        if ($scope.questionCounter < $scope.numberOfQuestion) {
            if(angular.isDefined($scope.questions.question[$scope.questionCounter].user))
            {
                $scope.userAns=$scope.questions.question[$scope.questionCounter].user;
            }
            else
            {
                $scope.userAns="";
            }
            QuestionsServiceFactory = $scope.questions;
            $scope.showNextButton=true;
            $scope.showPreviousButton = true;

            return;
        }
        else if($scope.questionCounter == $scope.numberOfQuestion)
        {
            QuestionsServiceFactory = $scope.questions;
          //  $scope.showNextButton=false;
           // $scope.showPreviousButton = true;
            $scope.questionCounter=0;
            var continueVar = true;
            angular.forEach(QuestionsServiceFactory.question,function (value,key) {
                if (continueVar)
                {
                    if (value.user) {
                        $scope.questionCounter++;

                    }
                    else {
                        continueVar= false;

                    }
                }
            })
            if($scope.questionCounter == $scope.numberOfQuestion)
            {
                $location.url('/complete');
            }
        }
        else {
            $location.url('/complete');
        }

    }

    $scope.previous = function () {
        $scope.questionCounter--;
        if ($scope.questionCounter < $scope.numberOfQuestion && $scope.questionCounter >= 0) {
            QuestionsServiceFactory = $scope.questions;
            $scope.showPreviousButton = true;
            $scope.showNextButton=true;



        }
        if ($scope.questionCounter == 0) {
            $scope.showPreviousButton = false;
            $scope.showNextButton=true;

        }
        if(angular.isDefined($scope.questions.question[$scope.questionCounter].user))
        {
            $scope.userAns=$scope.questions.question[$scope.questionCounter].user;
        }
        else
        {
            $scope.userAns="";
        }
        return;

    }

    $scope.next = function () {

        $scope.questionCounter++;
        if ($scope.questionCounter < $scope.numberOfQuestion && $scope.questionCounter >= 0) {
            QuestionsServiceFactory = $scope.questions;
            $scope.showNextButton=true;
            $scope.showPreviousButton = true;

        }
       if($scope.questionCounter == ($scope.numberOfQuestion-1))
        {
            $scope.showNextButton=false;
            $scope.showPreviousButton = true;
        }
        if(angular.isDefined($scope.questions.question[$scope.questionCounter].user))
        {
            $scope.userAns=$scope.questions.question[$scope.questionCounter].user;
        }
        else
        {
            $scope.userAns="";
        }
        return;

    }

});

myapp.service("questionService", function ($http, $q,configService) {

    var deferred = $q.defer();

    this.getQuestions = function () {
        if (configService.configVar.useStub) {
            var headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            return $http.get('http://127.0.0.1:8080/messenger/webapi/questions?callback=JSON_CALLBACK')
                .success(function (response, status, headers, config) {
                    // promise is fulfilled
                    deferred.resolve(response.data);
                    // promise is returned
                    return deferred.promise;
                }).error(function (response, status, headers, config) {
                    // the following line rejects the promise
                    deferred.reject(response);
                    // promise is returned
                    return deferred.promise;
                });
        }
        else {
            return $http.get('stub/question.json')
                .then(function (response) {
                    // promise is fulfilled
                    deferred.resolve(response.data);
                    // promise is returned
                    return deferred.promise;
                }, function (response) {
                    // the following line rejects the promise
                    deferred.reject(response);
                    // promise is returned
                    return deferred.promise;
                });

        }
    };
});
myapp.factory('QuestionsServiceFactory', function (questionService) {
    var QuestionsService = {};
    //QuestionsService.question ;

    questionService.getQuestions()
        .then(
            function (result) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                var resultData= result;
                console.log("result data "+ JSON.stringify(resultData));
                QuestionsService.question = result.data;
                console.log(QuestionsService.question);
            },
            function (error) {
                // handle errors here
                alert("error occured");
                console.log(error.statusText);
            }
        );


    return QuestionsService;
});
myapp.service("configService", function () {
    this.configVar={};
    this.configVar.useStub=true;
});