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
     // console.log(x+','+y);
      var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      if (p && typeof p.getBBox === "function" && x && y) {
        var b = p.getBBox();
        //console.log('addText(document.getElementById("'+text+'"),"'+text+'",'+(b.x + b.width/2)+','+(b.y + b.height/2)+');');
        t.setAttribute("transform", "translate(" + x + " " + y + ")");
        t.textContent = text;
        t.setAttribute("id", text); 
        t.setAttribute("fill", color);
        t.setAttribute("font-size", fontSize);
        t.setAttribute("font-family", font)
        p.parentNode.insertBefore(t, p.nextSibling);
      }
    }
    
    var addLabelRectangle = function(text, y, fill, stroke, color, font, fontSize) {
      // Set any attributes as desired
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      p = document.getElementsByTagName('svg')[0];
      var viewbox = p.viewBox.baseVal;
      console.log(viewbox);
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
      //console.log((p.getBBox().width-40)+', 200');
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
            height: that.height(),
            width: that.width()
          }).css({
            background: settings.backgroundColor,
          });
          var hiddens = settings.hideCountries;
          for (i in hiddens) {
            $("path#" + hiddens[i]+", rect#" + hiddens[i], that).remove();
          };
          
          if (settings.labels && settings.map == "usa") {
            var paths = document.querySelectorAll("path");
            var toosmall = ['NH', 'VT', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD', 'DC'];
  
            addText(document.getElementById("HI"), "HI", 289.91015625, 546.38671875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AK"), "AK", 110.548828125, 510.984375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("FL"), "FL", 718.39453125, 511.765625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("SC"), "SC", 752.140625, 380.443359375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("GA"), "GA", 714.482421875, 404.85546875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AL"), "AL", 654.025390625, 415.353515625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NC"), "NC", 767.005859375, 332.205078125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("TN"), "TN", 657.78515625, 340.91015625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("ME"), "ME", 895.962890625, 86.765625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NY"), "NY", 807.96484375, 155.4296875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("PA"), "PA", 782.181640625, 211.048828125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WV"), "WV", 748.734375, 263.64453125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("KY"), "KY", 657.998046875, 299.93359375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("OH"), "OH", 699.83203125, 236.162109375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MI"), "MI", 632.837890625, 143.537109375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WY"), "WY", 293.837890625, 181.0078125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MT"), "MT", 273.30859375, 86.67578125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("ID"), "ID", 192.91796875, 111.21484375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WA"), "WA", 116.349609375, 48.798828125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("TX"), "TX", 404.525390625, 452.501953125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("CA"), "CA", 83.744140625, 267.265625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AZ"), "AZ", 193.78125, 364.98828125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NV"), "NV", 132.234375, 251.673828125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("UT"), "UT", 216.091796875, 248.625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("CO"), "CO", 317.134765625, 272.376953125, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NM"), "NM", 297.158203125, 373.7734375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("OR"), "OR", 96.0703125, 118.625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("ND"), "ND", 414.55078125, 92.26171875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("SD"), "SD", 412.8359375, 163.32421875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("NE"), "NE", 419.373046875, 223.232421875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("IA"), "IA", 523.037109375, 214.46484375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MS"), "MS", 593.943359375, 418.951171875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("IN"), "IN", 644.375, 255.51171875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("IL"), "IL", 590.1796875, 260.07421875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MN"), "MN", 520.072265625, 116.537109375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("WI"), "WI", 574.810546875, 151.859375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("MO"), "MO", 542.927734375, 294.625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("AR"), "AR", 547.9921875, 373.6875, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("OK"), "OK", 432.6015625, 361.181640625, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("KS"), "KS", 439.775390625, 291.08984375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("LA"), "LA", 538, 456, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
            addText(document.getElementById("VA"), "VA", 768.4453125, 282.271484375, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
  
            var init = 200;
            _.each(toosmall, function(state) {
              addLabelRectangle(state, init, settings.color, settings.borderColor, settings.labelAttributes.color,settings.labelAttributes.font,settings.labelAttributes.fontSize);
              init = init + 25;
            });
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