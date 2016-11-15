/**
 * Created by Vipin on 04-08-2016.
 */
myapp.controller( "loginCtrl", function ($scope, $location){
    $scope.UserName;
    $scope.Password;
    $scope.msg;
    $scope.showMsg=false;
   // alert("my username is "+ $scope.Username +" Password:=> "+$scope.Password);
    $scope.onLoginButtonClick = function() {
        if (angular.isDefined($scope.UserName) && angular.equals($scope.UserName, 'vipin')
            && angular.isDefined($scope.Password) && angular.equals($scope.Password, 'test')) {

            localStorage.setItem('user', $scope.UserName);
            localStorage.setItem('pass', $scope.Password);
            $location.url('/accepted');
        }
        else
        {
            console.log(" in authentication function user and pass are wrong");
            $scope.showMsg=true;
            $scope.msg='Not able to authenticate, Please enter correct username and password';
            $location.url('/');
        }

    }
        

});

myapp.directive('fullname', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function validation(value) {
                if (!angular.isDefined(value) && null == value) {
                    mCtrl.$setValidity("valid", false);
                }
                else if(null!= value && value.length>1){
                    mCtrl.$setValidity("valid", true);
                }
                else
                {
                    mCtrl.$setValidity("valid", false);
                }

                return value;
            }
            mCtrl.$parsers.push(validation);
        }
    };
});


/*app.directive('fullname', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if(!angular.isDefined(value) && null== value)
                {
                    mCrtl.$setValidity("valid",false);
                }
                else
                {
                    mCrtl.$setValidity("valid",true);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});*/
myapp.directive('leave', function () {
    return function (scope, element) {
        element.bind("mouseleave",function () {
            element.removeClass("primary callout");
            console.log(" in leave");
        })
    }

});