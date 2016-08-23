(function($) {
  $.fn.twism = function() {
    var self = this;
    //define constants
    if (typeof arguments[0] === "string") {
      action = arguments[0];
      options = arguments[1] || null;
      callback = arguments[2] || null;
    } else if (typeof arguments[0] === "object") {
      action = "create";
      options = arguments[0];
      callback = arguments[1] || null;
    } else if (typeof arguments[0] === "function") {
      action = "create";
      options = null;
      callback = arguments[0];
    } else {
      action = "create";
      options = null;
      callback = null;
    }
    var destroy = function(options, callback) {
        var that = self;
        self.remove();
        if (typeof callback === "function") callback();
        return;
      }
    var addText = function(p, text, x, y, color, font, fontSize)
    {
      try {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        if (p && typeof p.getBBox === "function" && x && y) {
          var b = p.getBBox();
          t.setAttribute("transform", "translate(" + x + " " + y + ")");
          t.textContent = text;
          t.setAttribute("id", text); 
          t.setAttribute("fill", color);
          t.setAttribute("font-size", fontSize);
          t.setAttribute("font-family", font)
          p.parentNode.insertBefore(t, p.nextSibling);
        }
      }
      catch(err) {
        if (err) {
          
        }
      }
    }
    
    var addLabelRectangle = function(text, y, fill, stroke, color, font, fontSize) {
      try {
        // Set any attributes as desired
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        p = document.getElementsByTagName('svg')[0];
        var viewbox = p.viewBox.baseVal;
        rect.setAttribute("id", text); 
        rect.setAttribute("fill",fill);
        rect.setAttribute("stroke",stroke);
        rect.setAttribute("stroke-width","1");
        rect.setAttribute("x", (p.getBBox().width-40));
        rect.setAttribute("y", y);
        rect.setAttribute("width", "40");
        rect.setAttribute("height", "20");
        
        // Add to a parent node; document.documentElement should be the root svg element.
        // Acquiring a parent element with document.getElementById() would be safest.
        p.appendChild(rect);
        addText(rect, text, p.getBBox().width-30, y+15, color, font, fontSize);
      }
      catch(err) {
        if (err) {
        
        }
      }
    }
    var create = function(options, callback) {
        var settings = $.extend({
          // These are the defaults.
          map: "world",
          customMap: false,
          territories: true,
          antarctica: false,
          color: "#A9DA8A",
          border: "white",
          align: "center",
          backgroundColor: "#4af",
          borderWidth: "2",
          height: null,
          //default is actually 100%
          width: null,
          //default is actually 100%
          click: function(state) {
            if (state) {
              alert(state);
            }
          },
          hover: function() {
            return;
          },
          unhover: function() {
            return;
          },
          hoverColor: "#BB0029",
          hoverBorder: "yellow",
          littleRedBook: true,
          hideCountries: false,
          disableCountries: [],
          individualCountrySettings: false,
          labels: false,
          labelAttributes: {
            color: 'white',
            font: 'Helvetica',
            fontSize: '15'
            
          }
        }, options);
        // add the SVG to the div
        var that = self;
        that.css({
          width: (settings.width || "100%"),
          height: (settings.height || "100%"),
        });
        if (settings.map == "world") {
          var file = (settings.antarctica) ? 'world-map-with-antarctica.svg' : 'world-map.svg';
        } else if (settings.map == "usa") {
          var file = 'Blank_US_territories.svg';
          if (!settings.territories) {
            if (!settings.hideCountries) {
              settings.hideCountries = [];
            }
            settings.hideCountries.push("VI");
            settings.hideCountries.push("GU");
            settings.hideCountries.push("MP");
            settings.hideCountries.push("AS");
            settings.hideCountries.push("PR");

          }
        } else if (settings.map == "custom") {
          var url = settings.customMap;
          if (!settings.territories) {
            if (!settings.hideCountries) {
              settings.hideCountries = [];
            }
            settings.hideCountries.push("VI");
            settings.hideCountries.push("GU");
            settings.hideCountries.push("MP");
            settings.hideCountries.push("AS");
            settings.hideCountries.push("PR");
          }
        }
        //hack for RequireJS/Bower
        if (typeof(require) !== 'undefined' && settings.map != "custom") {
          var oriurl = file;
          url = require.toUrl('twism').replace('jquery.twism', 'maps/' + file);
        } else if (!settings.customMap) {
          url = 'dist/maps/' + file;
        } else {
          url = settings.customMap;
        }

        that.load(url, null, function(e) {
          $("svg", that).attr({
            height: '100%',
            width: '100%'
          }).css({
            background: settings.backgroundColor,
            height: '100%',
            width: '100%'
          });
          var hiddens = settings.hideCountries;
          for (i in hiddens) {
            $("path#" + hiddens[i]+", rect#" + hiddens[i], that).remove();
          };
          
          if (settings.labels && (settings.map == "usa" || settings.map == "custom")) {
            var paths = document.querySelectorAll("path");
            
            //Define the states too small to hold a label
            var toosmall = ['NH', 'VT', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'DC'];
            
            //Hawaii uses the primary color
            addText(document.getElementById("HI"), "HI", 300, 575, settings.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            
            //The rest are the same
            addText(document.getElementById("AK"), "AK", 110, 500, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("FL"), "FL", 755, 511, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("SC"), "SC", 752, 380, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("GA"), "GA", 700, 405, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AL"), "AL", 645, 415, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NC"), "NC", 767, 332, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("TN"), "TN", 647, 345, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("ME"), "ME", 885, 86, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NY"), "NY", 807, 155, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("PA"), "PA", 770, 211, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WV"), "WV", 735, 275, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("KY"), "KY", 665, 305, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("OH"), "OH", 694, 236, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MI"), "MI", 650, 175, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WY"), "WY", 293, 181, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MT"), "MT", 273, 86, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("ID"), "ID", 183, 151, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WA"), "WA", 116, 48, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("TX"), "TX", 404, 452, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("CA"), "CA", 65, 280, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AZ"), "AZ", 193, 364, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NV"), "NV", 132, 251, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("UT"), "UT", 216, 248, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("CO"), "CO", 317, 272, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NM"), "NM", 297, 373, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("OR"), "OR", 96, 118, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("ND"), "ND", 408, 92, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("SD"), "SD", 408, 163, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NE"), "NE", 408, 223, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("IA"), "IA", 523, 214, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MS"), "MS", 588, 418, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("IN"), "IN", 644, 255, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("IL"), "IL", 590, 260, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MN"), "MN", 495, 116, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WI"), "WI", 574, 151, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MO"), "MO", 535, 294, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AR"), "AR", 537, 375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("OK"), "OK", 432, 361, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("KS"), "KS", 439, 291, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("LA"), "LA", 538, 456, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("VA"), "VA", 778, 282, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
  
            var init = 200;
            for (var i = 0; i < toosmall.length; i++) {
              var state = toosmall[i];
              addLabelRectangle(state, init, (settings.labelAttributes.backgroundColor || settings.color), settings.borderColor, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
              init = init + 25;
            }
          }

          $("svg path, svg rect", that).css({
            fill: settings.color,
            stroke: settings.border,
            strokeWidth: settings.borderWidth
          });
          var ics = settings.individualCountrySettings;
          for (i in ics) {
            $("svg path#" + ics[i].name+", svg rect#" + ics[i].name, that).css({
              fill: ics[i].color || settings.color,
              stroke: ics[i].border || settings.border
            });
          }
          $("svg", that).on("click", function(e) {
            lastclicked = $(e.target).attr("id");
            settings.click(lastclicked);
          });

          $("svg", that).on("mouseover", function(e) {
            lastclicked = $(e.target).attr("id");
            settings.hover(lastclicked);
          });

          $("svg", that).on("mouseout", function(e) {
            lastclicked = $(e.target).attr("id");
            settings.unhover(lastclicked);
          });

          $("svg path, svg rect, svg text", that).on("mouseover", function(e) {
            if (ics && ics.length) {
              var icss = $.map(ics, function(o) {
                return o["name"];
              });
            }
            var country = $(e.target).attr("id");
            if (settings.disableCountries && settings.disableCountries.indexOf(country) == -1) {
              if (ics && icss.indexOf(country) > -1) {
                for (i in ics) {
                  if (ics[i].name == country) {
                    $("svg path#" + ics[i].name+", svg rect#" + ics[i].name, that).css({
                      fill: ics[i].hoverColor || settings.hoverColor,
                      stroke: ics[i].hoverBorder || settings.hoverBorder
                    });

                  }
                }
              } else {
                $('path#' + country+', rect#' + country, that).css({
                  "fill": settings.hoverColor,
                  "stroke": settings.hoverBorder
                });
              }

              if (settings.littleRedBook) {
                if (country == "cn" || country == "tw" || country == "hk" || country == "mc") {
                  $('path#tw, path#cn, path#hk, path#mc').css({
                    "fill": settings.hoverColor,
                    "stroke": settings.hoverBorder
                  });
                }
              }
            }
          });

          $("svg path, svg text, svg rect", that).on("mouseout", function(e) {
            var country = $(e.target).attr("id");
            $('path#' + country+', rect#' + country, that).css({
              "fill": settings.color,
              "stroke": settings.border
            });
            for (i in ics) {
              $("svg rect#" + ics[i].name+", svg path#" + ics[i].name, that).css({
                fill: ics[i].color || settings.color,
                stroke: ics[i].border || settings.border
              });
            }

            if (settings.littleRedBook) {
              if (country == "cn" || country == "tw" || country == "hk" || country == "mc") {
                $('path#tw, path#cn, path#hk, path#mc').css({
                  "fill": settings.color,
                  "stroke": settings.border
                });
              }
            }
          });

          

          if (typeof callback === "function") callback();

        });
        return that;
      }

    var setCountrySettings = function(options) {
        if (options.color) {
          $("svg path#" + options.name+", svg rect#" + options.name).css({
            fill: options.color
          });
          $("svg path#" + options.name+", svg rect#" + options.name).on("mouseout", function() {
            $(this).css({
              fill: options.color
            });
          });
        }
        if (options.border) {
          $("svg path#" + options.name+", svg rect#" + options.name).css({
            stroke: options.border
          });
          $("svg path#" + options.name+", svg rect#" + options.name).on("mouseout", function() {
            $(this).css({
              stroke: options.border
            });
          });
        }
        if (options.borderWidth) {
          $("svg path#" + options.name+", svg rect#" + options.name).css({
            strokeWidth: options.borderWidth
          });
        }
        if (options.hoverColor) {
          $("svg path#" + options.name + ", svg text#" + options.name+", svg rect#" + options.name).on("mouseover", function(e) {
            $("svg path#" + options.name).css({
              fill: options.hoverColor
            });
            if (options.hoverBorder) {
              $("svg path#" + options.name + ", svg text#" + options.name+", svg rect#" + options.name).css({
                stroke: options.hoverBorder
              });
            }
          });
          $("svg path#" + options.name + ", svg text#" + options.name+", svg rect#" + options.name).on("mouseout", function(e) {
            $("svg path#" + options.name).css({
              fill: options.color
            });
            if (options.hoverBorder) {
              $("svg path#" + options.name + ", svg text#" + options.name+", svg rect#" + options.name).css({
                stroke: options.border
              });
            }
          });
        }
        if (options.click) {
          $("svg path#" + options.name + ", svg text#" + options.name+", svg rect#" + options.name).on("click", function(e) {
            e.stopPropagation()
            lastclicked = $(e.target).attr("id");
            options.click(lastclicked);
          });
        }
        if (options.hover) {
          $("svg path#" + options.name + ", svg text#" + options.name+", svg rect#" + options.name).on("mouseover", function(e) {
            e.stopPropagation()
            lastclicked = $(e.target).attr("id");
            options.hover(lastclicked);
          });
        }

      };

    switch (action) {
    case "create":
      return create(options, callback);
      break;
    case "destroy":
      return destroy(options, callback);
      break;
    case "setCountry":
      return setCountrySettings(options);
      break;
    default:
      return create(options, callback);
    }
  };
}(jQuery));