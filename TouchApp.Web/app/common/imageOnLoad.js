(function (angular) {

    angular
        .module('Touch')
        .directive('imageOnLoad', imageOnLoad);

    function imageOnLoad() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('load', function () {
                    //call the function that was passed
                    scope.$apply(attrs.imageOnLoad);
                });
            }
        }
    }
})(angular);