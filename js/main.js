;(function (){
	'use strict';

	angular.module('bookDropApp', ['ngRoute', 'mgcrea.ngStrap'])
		.config(function($routeProvider){
			$routeProvider
			.when('/', {
				templateUrl: 'views/table.html',
				controller: 'BookController',
				controllerAs: 'bookCtrl'
			})
			.when('/new', {
			templateUrl: 'views/form.html',
			controller: 'BookController',
			controllerAs: 'bookCtrl'
			})
			.when('/:id', {
			templateUrl: 'views/show.html',
			controller: 'ShowController',
			controllerAs: 'show'
			})
			.when('/:id/edit', {
			templateUrl: 'views/form.html',
			controller: 'EditController',
			controllerAs: 'edit'
			})
			.otherwise({redirectTo: '/'})
		})
		.controller('ShowController', function($http, $routeParams){
			var bkm =this;
			var id = $routeParams.id;
			$http.get('https://bookdrop.firebaseio.com/' + id + '.json')
				.success(function(data){
					bkm.book = data;
				})
				.error(function(err){
					console.log(err);
				});
		})
		.controller('EditController', function($http, $routeParams, $location){
			var bkm = this;
			var id = $routeParams.id;
			var url = 'https://bookdrop.firebaseio.com/' + id + '.json'
			$http.get(url)
			.success(function(data){
				bkm.newBook = data;
		})
		.error(function(err){
			console.log(err);
		});
		
		bkm.addNewBook = function(){
			$http.put(url, bkm.newBook)
				.success(function(data){
					$location.path('/')				
				})
				.error(function(err){
					console.log(err);
				});
			};

		bkm.goodRead = {
			high: 'Highly Recommend',
			medium: 'So So',
			low: 'Not My Fave',
			lowest: 'Hated It'
		};
	})
	.controller('BookController', function($http){
		var bkm = this;
	
		$http.get('https://bookdrop.firebaseio.com/.json')
			.success(function(data){
				bkm.books = data;
			})
			.error(function(err){
			console.log(err);
			});
		
		bkm.addNewBook = function(){
			$http.post('https://bookdrop.firebaseio.com/.json', bkm.newBook)
				.success(function(data){
					bkm.books[data.name] = bkm.newBook;
					bkm.newBook = _freshBook();
			})
			.error(function(err){
				console.log(err);
			});
		};

		bkm.removeBook = function(bookId){
				var url = 'https://bookdrop.firebaseio.com/' + bookId + '.json';
					console.log(bookId)
					$http.delete(url)
					.success(function(){
						delete bkm.books[bookId]
					})
						.error(function(err){
							console.log(err)
						});
					};

		bkm.newBook = _freshBook();

		bkm.goodRead = {
			high: 'Highly Recommend',
			medium: 'So So',
			low: 'Not My Fave',
			lowest: 'Hated It'
		};
		
		function _freshBook(){
			return {
				priority: 'low'
			}
		}


	})

}());
