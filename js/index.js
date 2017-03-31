var app = angular.module("todo-app", []);

app.controller('ToDoController', ['$scope', '$http', function($scope, $http) {
  var backendUrl = 'http://localhost:8080';
  
  $scope.title = 'Cloud-ready To Do application';
  $scope.headline = 'Reading data from ' + backendUrl;

  $http.get(backendUrl + '/api/todo').then(function(response){
     $scope.todos = response.data;
  });

$scope.addToDo = function() {
	var toDo = {
		'text': $scope.toDoText,
		'done': false
	};
	$http.post(backendUrl + '/api/todo', toDo)
};

$scope.getRemainingItems = function() {
	var count = 0;
	angular.forEach($scope.todos, function(todo){
		count += todo.done ? 0 : 1;
	});
	return count;
}

$scope.stateChanged = function(todo) {
	$http.put(backendUrl + '/api/todo', todo);
}

}]);
