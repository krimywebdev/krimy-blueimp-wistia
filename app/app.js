angular.module('myApp.component', [
  'ngComponentRouter',
  'myVideoUploader.component',
  'myWistiaPlayer.component'
])

.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}])

.run(['$rootRouter', function($rootRouter) {
  $rootRouter.config([
    { path: '/...', component: 'myApp' }
  ]);
}])

.component('myApp', {
  $routeConfig: [
    { path: '/', component: 'myApp', name: 'Dashboard' }
  ],
  templateUrl: 'app/views/my-app.html'
});