/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 7/24/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
function LoginController($scope, LoginService, $location) {
    "use strict";

    $scope.login = function (loginStrategy) {
        LoginService.sendAuthenticateUserRequest(/*"https://accounts.google.com/o/oauth2/auth",
            "1085080338310.apps.googleusercontent.com",
            "token",
            "http://localhost:8080/calendar-app/",  //http://localhost:8080/calendar-app/
            "https://www.googleapis.com/auth/userinfo.profile", //https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+" https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar
            "ProcessAuthenticatedUserResponse"*/
        );
    };
}
LoginController.$inject = ['$scope', 'LoginService', '$location'];