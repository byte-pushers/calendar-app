/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 7/24/13
 * Time: 4:53 PM
 * To change this template use File | Settings | File Templates.
 */
function LoginController($scope, LoginService, $location) {
    "use strict";

    $scope.login = function (oauthStrategyProvider) {
        LoginService.sendAuthenticateUserRequest(oauthStrategyProvider);
    };
}
LoginController.$inject = ['$scope', 'LoginService', '$location'];