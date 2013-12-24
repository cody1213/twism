twism 
=====
A clickable world map jQuery plugin

####Version: 0.1 
It's basically an early beta)


##Quick Instructions
Include jQuery and the jQuery twism plugin:

	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="jquery.twism.js"></script>
Create a container:

	<div id="worldmap"></div>

Intialize the plugin:

	$('#worldmap').twism();
	

##Complete Documentation

####Usage

	selector.twism([method], [options], [callback]);
	

####Methods: 

* create (default) - create a map
* destroy - remove a map
* setCountry - change one country's options

For instance: 
	
	$('#worldmap').twism("destroy");

The create and setCountry commands take options and all take a callback. 

An example with a method, option, and callback:
 	
 	$('#worldmap').twism("create", {
    	border: "red",
        individualCountrySettings: [{
            name: "cn",
        	color: "red"
    	}, {
    		name: "fr",
    		color: "blue"
    	}, {
    		name: "us",
    		color: "white"
    	}]
    }, function() {
    	alert("Callback!");
    });

###Options

Include Antarctica (default: false)

	antarctica: true

Set background color of countries (default: #A9DA8A, can be used with setCountry) 
	
	color: "#A9DA8A"

Set the default color for the country borders (default: white, can be used with setCountry)
	
	border: "white"

Set the border width (default: 2, can be used with setCountry):

	borderWidth: 2
	
Set the background color (default: "#4af")

	backgroundColor: "#4af"

Set the height (default or null: 100% of the container)
	
	height: 300px

Set the width (default or null: 100% of the container): 
	
	width: 500px

Set a click function (default alerts with the country code)

	click: function(country) {
    	alert(country);
	}

Set a hover color (default: #BB0029)
	
	hoverColor: "#BB0029"
	
Set the hover border (default: "yellow") 
	
	hoverBorder: "yellow"

Include Taiwan, HK, and Macao in the PRC (China) (default: true)

	littleRedBook: false,

Hide any countries (array of 2-digit country codes)

	hideCountries: ["cn","ca","nz"]

Set Individual Settings for countries	


	individualCountrySettings: [
		{
			name: "us",
			color: "white",
			border: "green"
			borderWidth: 5
		},
		{
			name: "fr",
			color: "blue",
			border: "orange"
			borderWidth: 10
		},
	]
