;(function (){
	'use strict';

	angular.module('bookDropApp', [])
		.controller('BookController', function(){
			var bkm = this;

			bkm.books =[
     	 {
          title: 'The Warmth of Other Suns',
          author: 'Isabelle Wilkerson',
          year: '2010',
          isbn: '4578384738',
        },
        {
          title: 'HTML & CSS',
          author: 'John Duckett',
          year: '2014',
          isbn: '1290394586',
        },
        {
          name: 'The Book of Basketball',
          desc: 'Bill Simmons',
          due: '2008',
          isbn: '0987654321',
        }
      ];
			
			bkm.addBook = function(){
				bkm.books.push(bkm.newBook);
				bkm.newBook = null;
			}

			bkm.removeBook = function(book){
				var index =bkm.books.indexOf(book);
				bkm.books.splice(index,1);
			}
		});
}());
