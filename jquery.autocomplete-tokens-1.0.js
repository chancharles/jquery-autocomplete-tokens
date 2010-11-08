/*
 * jQuery Plugin: Autocomplete Tokens
 * Version 1.0
 */
(function($) {

  var constants = {
    dataKey : "autoCompleteTokens"
  };

  /**
   * These are public methods.
   */
  var methods = {

    init : function(options) {
      var $selector = this;

      var settings = {
        classes : {
          tokens : "autocomplete-tokens",
          tokensInput : "autocomplete-tokens-input"
        }
      };

      // If options exist, lets merge them with our default settings
    if (options) {
      $.extend(settings, options);
    }

    $selector.data(constants.dataKey, {
      settings : settings,
      items : []
    });

    settings.autocomplete.addClass(settings.classes.tokensInput);
    settings.tokens.addClass(settings.classes.tokens);

    /**
     * Install key down handler for autocomplete
     */
    var onKeyDown = function(event) {
      var $input = $(this);
      var keyCode = $.ui.keyCode;
      switch (event.keyCode) {
      case keyCode.BACKSPACE:
        var value = $input.val();
        if (value.length == 0) {
          var selectedItem = settings.tokens.tokens("selectedItem");
          if (!selectedItem) {
            var tokens = settings.tokens.tokens("items");
            if (tokens.length > 0) {
              settings.tokens.tokens("select", tokens[tokens.length - 1]);
            }
          } else {
            settings.tokens.tokens("remove", [ selectedItem ]);
          }
        }
        break;
      }
    };

    settings.autocomplete.keydown(onKeyDown);

    /**
     * Install select handler for autocomplete
     */
    settings.autocomplete.bind("autocompleteselect", function(event, ui) {
      settings.autocomplete.val('');
      settings.tokens.tokens("add", [ ui.item ]);
      return false;
    });

    /**
     * Reposition autocomplete menu
     */
    settings.autocomplete.autocomplete("option", "position", {
      my : "left top",
      at : "left bottom",
      of : settings.tokens,
      collision : "none"
    });
  },

  destroy : function(settings) {
  }

  };

  $.fn.autoCompleteTokens = function(method) {
    var $selector = this;
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply($selector, Array.prototype.slice.call(
          arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply($selector, arguments);
    } else {
      $
          .error('Method ' + method + ' does not exist on jQuery.autoCompleteTokens');
    }
    return $selector;
  }

})(jQuery);
