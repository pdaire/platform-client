module.exports = [
    'FormEndpoint',
    '$rootScope',
function (
    FormEndpoint,
    $rootScope
) {


    return {
        restrict: 'E',
        scope: {
            post: '=',
            activeForm: '='
        },
        templateUrl: 'templates/posts/choose-form.html',
        link: function ($scope) {
            $scope.isAdmin = $rootScope.isAdmin;

            FormEndpoint.query().$promise.then(function (forms) {
                $scope.availableForms = forms;

                if ($scope.availableForms.length === 1) {
                    $scope.chooseForm($scope.availableForms[0]);
                }
            });

            $scope.filterNotDisabled = function (form) {
                return !form.disabled;
            };

            $scope.chooseForm = function (form) {
                angular.copy(form, $scope.activeForm);
                $scope.post.form  = { id: form.id };
            };
        }
    };

}];
