(function ($) {
  $.fn.twism = function () {
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

    var destroy = function (options, callback) {
      var that = self;
      self.remove();
      if (typeof callback === "function") callback();
      return;
    }
    var create = function (options, callback) {
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
        height: null, //default is actually 100%
        width: null, //default is actually 100%
        click: function (state) {
          if (state) {
            alert(state);
          }
        },
        hover: function () {
          return;
        },
        hoverColor: "#BB0029",
        hoverBorder: "yellow",
        littleRedBook: true,
        hideCountries: null,
        disableCountries: null,
        individualCountrySettings: null
      }, options);
      // add the SVG to the div
      var that = self;
      that.css({
        width: (settings.width || "100%"),
        height: (settings.height || "100%"),
      });
      if (settings.map == "world") {
        var url = (settings.antarctica) ? 'maps/world-map-with-antarctica.svg' : 'maps/world-map.svg';
      } else if (settings.map == "usa") {
        var url = 'maps/Blank_US_territories.svg';
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
      console.log(url);
      that.load(url, null, function (e) {
        $("svg", that).attr({
          height: that.height(),
          width: that.width()
        }).css({
          background: settings.backgroundColor,
          margin: "auto",
          display: "block"
        });
        var hiddens = settings.hideCountries;
        for (i in hiddens) {
          $("path#" + hiddens[i], that).remove();
        };

        $("svg path", that).css({
          fill: settings.color,
          stroke: settings.border,
          strokeWidth: settings.borderWidth
        });
        var ics = settings.individualCountrySettings;
        for (i in ics) {
          $("svg path#" + ics[i].name, that).css({
            fill: ics[i].color || settings.color,
            stroke: ics[i].border || settings.border
          });
        }
        $("svg", that).on("click", function (e) {
          lastclicked = $(e.target).attr("id");
          settings.click(lastclicked);
        });

        $("svg path", that).on("mouseover", function (e) {
          if (ics && ics.length) {
            var icss = $.map(ics, function (o) {
              return o["name"];
            });
          }
          var country = $(e.target).attr("id");
          if (settings.disableCountries && settings.disableCountries.indexOf(country) == -1) {
            if (ics && icss.indexOf(country) > -1) {
              for (i in ics) {
                if (ics[i].name == country) {
                  $("svg path#" + ics[i].name, that).css({
                    fill: ics[i].hoverColor || settings.hoverColor,
                    stroke: ics[i].hoverBorder || settings.hoverBorder
                  });
                }
              }
            } else {
              $('path#' + country, that).css({
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

        $("svg path", that).on("mouseout", function (e) {
          var country = $(e.target).attr("id");
          $('path#' + country, that).css({
            "fill": settings.color,
            "stroke": settings.border
          });
          for (i in ics) {
            $("svg path#" + ics[i].name, that).css({
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

    var setCountrySettings = function (options) {
      if (options.color) {
        $("svg path#" + options.name).css({
          fill: options.color
        });
        $("svg path#" + options.name).on("mouseout", function() {
          $(this).css({
            fill: options.color
          });
        });
      }
      if (options.border) {
        $("svg path#" + options.name).css({
          stroke: options.border
        });
        $("svg path#" + options.name).on("mouseout", function() {
          $(this).css({
            stroke: options.border
          });
        });
      }
      if (options.borderWidth) {
        $("svg path#" + options.name).css({
          strokeWidth: options.borderWidth
        });
      }
      if (options.hoverColor) {
        $("svg path#" + options.name).on("mouseover", function(e) {
          $("svg path#" + options.name).css({
            fill: options.hoverColor
          });
          if (options.hoverBorder) {
            $("svg path#" + options.name).css({
              stroke: options.hoverBorder
            });
          }
        });
        $("svg path#" + options.name).on("mouseout", function(e) {
          $("svg path#" + options.name).css({
            fill: options.color
          });
          if (options.hoverBorder) {
            $("svg path#" + options.name).css({
              stroke: options.border
            });
          }
        });
      }
      if (options.click) {
        $("svg path#" + options.name).on("click", function (e) {
          e.stopPropagation()
          lastclicked = $(e.target).attr("id");
          options.click(lastclicked);
        });
      }
      if (options.hover) {
        $("svg path#" + options.name).on("mouseover", function (e) {
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