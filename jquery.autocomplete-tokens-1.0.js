/**
 * Copyright (c) 2010 Charles Chan
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * jQuery Plugin: Autocomplete Tokens Version 1.0
 * 
 * https://github.com/chancharles/jquery-autocomplete-tokens
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
          limited : "autocomplete-tokens-limited",
          tokensInput : "autocomplete-tokens-input"
        },
        limit : undefined
      };

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
       * Since both the tokens and the autocomplete input are float left, we
       * need to add a clear div to make sure the height is properly shown.
       */
      $('<div style="clear: both;"></div>').appendTo(settings.tokens);

      /**
       * On click on the tokens container, we set the focus to the autocomplete
       * inputbox. This method must not return false or the tokens's click
       * handler will not be invoked.
       */
      settings.tokens.click(function() {
        settings.autocomplete.focus();
      });

      settings.tokens.bind('tokensremoved.tokens', function(event) {
        if (settings.limit
            && settings.limit > settings.tokens.tokens("items").length) {
          settings.autocomplete.show();
          settings.tokens.removeClass(settings.classes.limited);
        }
      });

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
        default:
          settings.tokens.tokens("unselect");
          break;
        }
      };

      settings.autocomplete.keydown(onKeyDown);

      /**
       * Install select handler for autocomplete
       */
      settings.autocomplete.bind("autocompleteselect", function(event, ui) {
        settings.autocomplete.val('');
        settings.tokens.tokens("unselect");
        settings.tokens.tokens("add", [ ui.item ]);
        if (settings.limit
            && settings.limit == settings.tokens.tokens("items").length) {
          settings.autocomplete.hide();
          settings.tokens.addClass(settings.classes.limited);
        }
        return false;
      });

      settings.autocomplete.bind("autocompleteopen", function(event, ui) {
        var tokensWidth = settings.tokens.innerWidth();
        $(".ui-autocomplete.ui-menu").width(tokensWidth);
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
  };

})(jQuery);
