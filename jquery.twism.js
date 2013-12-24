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
        antarctica: false,
        color: "#A9DA8A",
        border: "white",
        backgroundColor: "#4af",
        borderWidth: "2",
        height: null, //default is actually 100%
        width: null, //default is actually 100%
        click: function (state) {
          alert(state);
        },
        hover: function () {
          return;
        },
        hoverColor: "#BB0029",
        hoverBorder: "yellow",
        littleRedBook: true,
        hideCountries: null,
        individualCountrySettings: null
      }, options);
      console.log(settings);
      // add the SVG to the div
      var that = self;
      that.css({
        background: settings.backgroundColor,
        width: (settings.width || "100%"),
        height: (settings.height || "100%")
      });
      var url = (settings.antarctica) ? 'world-map-with-antarctica.svg' : 'world-map.svg';
      that.load(url, null, function (e) {
        $("svg", that).attr({
          height: that.height(),
          width: that.width()
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
          var icss = $.map(ics, function (o) {
            return o["name"];
          })
          var country = $(e.target).attr("id");

          if (icss.indexOf(country) > -1) {
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