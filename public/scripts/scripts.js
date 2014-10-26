$('.share_location').on('touchstart', function () {
	var _console = $('.console');
	_console.empty();
    if (navigator.geolocation) {
    	_console.prepend('<p>Attempting to get location...</p>');
        navigator.geolocation.getCurrentPosition(function (position) {
        	_console.prepend("<p>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "</p>");
        	var google_maps_link = "http://maps.google.com/maps?q="+position.coords.latitude+","+position.coords.longitude;
        	_console.prepend("<p>Google maps link: <a class='google_maps_link_element' href='"+google_maps_link+"' target='_blank'>"+google_maps_link+"</a></p>");
        	_console.find('.google_maps_link_element').css('opacity', '0.9').select();
        });
    } else {
        _console.prepend("<p>Geolocation is not supported by this browser.</p>");
    }
});