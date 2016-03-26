jQuery tWism 
=====
A clickable SVG maps jQuery plugin

####Live example
http://dev.codybrumfield.com/jquery-plugins/twism/example.html

####Why does this exist
Because sometimes, I just want to add a quick map to a project without making my life [complicated](http://d3js.org "A complicated little project"). 

####How stable is it?
This is version: 0.4.5. Consider it at the release candidate stage, though I've used it in production. If you find any bugs, fork this repo and/or let me know!

####Browser support?
Modern browsers down to IE9 is the goal.

####It seems like this would work for any SVG
Well, it works for any SVG that has IDs on the clickable regions. I made it for rolling out quick maps, though. You should probably use [D3.js](http://d3js.org "A bar chart in less than 9 hours!") or [Raphael](http://raphaeljs.com "Wow! IE 6 support!") if you want a robust, tested library for manipulating vector graphics. 

##Quick Instructions
Include jQuery and the jQuery twism plugin:

	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="jquery.twism.js"></script>
Create a container:

	<div id="worldmap"></div>

Initialize the plugin on said container:

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
 		map: "world",
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

Pick a map (options: usa, world, or custom; default is world)

	map: "world"

If you do a custom map type, provide a URL

	customMap: 'maps/Blank_US_Map.svg'
	
Include Antarctica on the world map? (default: false)

	antarctica: true

U.S. Territories?

	territories: true

Map labels (usa only)?

	labels: true

Map label attributes (usa only)

	labelAttributes: { color:  'white', font:  'Helvetica',fontSize: '15', backgroundColor: 'blue'}
	
P.R.C. Territories? (i.e., treat Taiwan, HK, and Macao as one China, default: true)

	littleRedBook: false,
		
Set a default background color of countries (default: #A9DA8A, can be used with setCountry) 
	
	color: "#A9DA8A"

Set the default color for the country borders (default: white, can be used with setCountry)
	
	border: "white"

Set the border width (default: 2, can be used with setCountry):

	borderWidth: 2
	
Set the background color (default: "#4af")

	backgroundColor: "white"

Set a hover color (default: #BB0029, can be used with setCountry)
	
	hoverColor: "#BB0029"
	
Set the hover border (default: "yellow", can be used with setCountry) 
	
	hoverBorder: "yellow"

Set the height (leaving it blank tries to get the parent div height):
	
	height: 300px

Set the width (leaving it blank tries to get the parent div width): 
	
	width: 500px

Set a click event function (default alerts with the country code, if you put an argument on the function, it'll return the ID attribute of the region, can be used with setCountry)

	click: function(country) {
    	alert(country);
	}

Disable any regions (array of ID attributes or 2-digit country/state codes in the default world/USA maps)

    dispableCountries: ["cn","ca","nz"]

Hide any regions (array of ID attributes or 2-digit country/state codes in the default world/USA maps)

	hideCountries: ["cn","ca","nz"]

Change the colors for one or more map regions:	


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
