var app = angular.module('facePageApp', ['ui.router', 'satellizer']);

app.run(function(Auth) {
  Auth.getProfile();
});

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/templates/home.html',
			controller: 'homeCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: '/templates/authForm.html',
			controller: 'authFormCtrl'
		})
		.state('login', {
      		url: '/login',
      		templateUrl: '/templates/authForm.html',
      		controller: 'authFormCtrl'
    	})
		.state('profiles', {
      		url: '/profiles',
      		templateUrl: '/templates/profiles.html',
      		controller: 'profileCtrl',
      		resolve: {
        		profile: function(Auth, $q, $state) {
          			return Auth.getProfile()
          			.catch(() => {
           			$state.go('home');
            		return $q.reject();
          			});
        		}
      		}
    	})


	$urlRouterProvider.otherwise('/');

});