;(function (){
	'use strict';

	angular.module('bookDropApp', [])
		.controller('BookController', function($http){
			var bkm = this;
			
	$http.get('https://bookdrop.firebaseio.com/.json')
		.success(function(data){
			console.log(data);
			bkm.books = data;
		})
		.error(function(err){
			console.log(err);
		});	
		
		bkm.addNewBook = function(){
			$http.post('https://bookdrop.firebaseio.com/.json', bkm.newBook)
				.success(function(data){
					bkm.books[data.name] = bkm.newBook;
					bkm.newBook = null;
					console.log('Hello, help!');
				})
				.error(function(err){
					console.log(err);
				});
			};

		/*	bkm.removeBook = function(book){
				var index =bkm.books.indexOf(book);
				bkm.books.splice(index,1);
			}*/
		});
}());
