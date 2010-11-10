autocomplete-tokens
===================

A jQuery plugin that link the jQuery autocomplete widget with the [tokens](https://github.com/chancharles/jquery-tokens) widget. This creates a facebook-like autocomplete (Or at least the old facebook autocomplete).

Pre-requsite
------------

  * jQuery 1.4.2+
  * jQuery UI 1.8.4+
  * [jQuery tokens plugin](https://github.com/chancharles/jquery-tokens)

Sample usage
------------
    // first, construct the autocomplete widget and customize it properly.
    $("input[name='language']" ).autocomplete({ 
        source: ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby"]
    });

    // then, create a token container.
    $(".tokens").tokens({
        initialTokens: [{label: 'C++', value: 'cpp'}, {label: 'JSP', value: 'jsp'}]
    });

    // finally, link the autocomplete widget and the token container together.
    $(".tokens").autoCompleteTokens( {
        autocomplete: $("input[name='language']"),
        tokens: $(".tokens")
    });

Settings
--------
  * limit

    The token limits. Once the number of tokens is reached, the autocomplete input will be disabled.

  * tokensAdded

    Callback handler when tokens are added.

  * tokensRemoved

    Callback handler when tokens are removed.

  * tokensSorted

    Callback handler when tokens are sorted.

Events
------

 * tokensadded.tokens

   Triggered when any token(s) is added. An event object will be passed into the event handler. The event object has a single attribute "items" which is an array of items added to the tokens.

 * tokensremoved.tokens

   Triggered when any token(s) is removed. An event object will be passed into the event handler. The event object has a single attribute "items" which is an array of items removed from the tokens.

 * tokenssorted.tokens

   Triggered when the tokens are sorted.
