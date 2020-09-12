// Globals variables

		// 	An array containing objects with information about the products.
		var products = [];

		var select = $('.all-products select');

	// Get data about our products from products.json.
	$.getJSON( "products.json", function( data ) {

		// Write the data into our global variable.
		products = data;

		// Call a function to create HTML for all the products.
		generateAllProductsHTML(products);

		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	});

	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});


	function render(url){
		var temp = url.split('/')[0];
		var	map = {

			// The "Homepage".
			'': function() {

				// Clear the filters object, uncheck all checkboxes, show all the products
				select.prop('select',false);

				renderProductsPage(products);
			}
		}	
			// Execute the needed function depending on the url keyword (stored in temp).
			if(map[temp]){
				map[temp]();
			}
			// If the keyword isn't listed in the above - render the error page.
			else {
				renderErrorPage();
			}	
	}

// This function receives an object containing all the product we want to show.
function renderProductsPage(data){

	var page = $('.all-products'),
		allProducts = $('.all-products .products-list > li');

	// Hide all the products in the products list.
	allProducts.addClass('hidden');

	// Iterate over all of the products.
	// If their ID is somewhere in the data object remove the hidden class to reveal them.
	allProducts.each(function () {

		var that = $(this);

		data.forEach(function (item) {
			if(that.data('index') == item.id){
				that.removeClass('hidden');
			}
		});
	});

	// Show the page itself.
	// (the render function hides all pages so we need to show the one we want).
	page.addClass('visible');

}
	
// Shows the error page.
function renderErrorPage(){
	var page = $('.error');
	page.addClass('visible');
}

