// UTILITIES
//
//
//
//
// Performance
	// Delay load of DOM images using class="loadOWR" (load on window ready)
	$(window).load(function() {
		$( '.loadOWR' ).each( function(){
			$( this ).attr('src', $( this).attr('data-src') );
		});
	});
// END: Performance