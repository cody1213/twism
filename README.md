twism (alpha)
=====

A clickable world map jQuery plugin
###Quick Instructions
Include jQuery and the jQuery twism plugin:

	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="jquery.twism.js"></script>
Create a container:

	<div id="worldmap"></div>

Intialize the plugin:

	$('#worldmap').twism();
	
:

###Usage
The basic usage is 

	selector.twism([method], [options], [callback]);
	
Everything is optional. The default creates with the default options and has no callback.  

You can pass one of three methods: create, destroy, and setCountry. Create and destroy add and remove maps while the setCountry modifies a single country.
	
	$('#worldmap').twism("destroy");

The create and setCountry commands take options. The full list of options follows but the setCountry command only accepts color, border, and borderWidth.
 	
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
    });

All of the methods accept a callback
    
	$('#worldmap').twism("setCountry", {
          name: "ca",
          color: "blue"
    }, function() {
    	alert("Callback!");
    });
###Options

Include Antarctica (default: false)

	antarctica: true

Set background color of countries (default: #A9DA8A) 
	
	color: "#A9DA8A"

Set the default color for the country borders (default: white)
	
	border: "white"

Set the border width (default: 2):

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
