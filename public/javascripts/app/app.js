//var app = angular.module('myApp', ["ngRoute"]);
var app = angular.module('myApp', []);
app.controller("myCtrl",function($scope,$http){
$scope.name = "alberto";
$scope.query="cars";
$scope.jql=[];
$scope.restUrl=function (query){
return "https://query.yahooapis.com/v1/public/yql"+
"?q=select%20*%20from%20answers.search%20where%20query%3D%22"+
query+
"%22%20and%20type%3D%22resolved%22&format=json&callback=";
};
$scope.isClearAffix=function(numero,divisor)
{
return ((numero+1) % divisor) ===0;
};
$scope.search = function ()
{
console.log($scope.restUrl($scope.query));
$http({method: 'JSONP', url: $scope.restUrl($scope.query)+"JSON_CALLBACK"}).
    success(function(data, status, headers, config) {      
	  $scope.jql=data.query.results;
	  console.log($scope.jql);
    }).
    error(function(data, status, headers, config) {
      console.log("error");
	  console.log(data);
	  console.log(status);
    });
}
});

app.directive("preguntas",function()
{
return{
	restrict:"E",
	templateUrl:"directives/demo/preguntas.html",
	controller:function(){
	this.query= "alberto";
	},
	controllerAs:"data"
	};
});
/*
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/demo', {
        templateUrl: 'index',            
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
  */