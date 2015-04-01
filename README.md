# jquery-cookies
Adds [JAAulde/cookies](https://github.com/JAAulde/cookies/) to the jQuery namespace, and provides jQ extension methods to bind cookies to form values and html elements.

## installation

### [bower](http://bower.io)
````bash
bower install jaaulde-jquery-cookies
````

### [npm](https://www.npmjs.com)
````bash
npm install jaaulde-jquery-cookies
````

### html
Download the code (requires [JAAulde/cookies](https://github.com/JAAulde/cookies/)), link it in your HTML file.
````html
<script src="/path/to/jaaulde-cookies.js"></script>
<script src="/path/to/jaaulde-jquery-cookies.js"></script>
````
## usage

### Cookie methods
The entire cookies singleton API from [JAAulde/cookies](https://github.com/JAAulde/cookies/) is aliased in the jQuery namespace. For example, `cookies.set()` is available as `$.cookies.set()`. For a list of all available cookie methods and their docs, see [JAAulde/cookies documentation](https://github.com/JAAulde/cookies#readme).

### jQuery plugin methods

#### `$.fn.cookieFill`
Fill an element with the value of a cookie by the same name
##### signature
```javascript
/**
 * $('selector').cookieFill - set the value of an input field or the innerHTML of an element from a cookie by the name or id of the field or element
 *
 * @access public
 * @return jQuery
 */
cookieFill: function () {
````
##### example
```javascript
$('#username').cookieFill();
````
This code, given an input such as:
````html
<input type="text" id="username" name="username" value="" />
````
will read the value of a cookie by the name of `username` and write it to the input's value.

If, instead of an input, the selector is for an element such as:
````html
<div id="username"></div>
````
the cookie's value will be set as the element's `innerHTML`.

**Note:** The plugin uses [name](http://www.w3.org/TR/html4/types.html#type-name) and [id](http://www.w3.org/TR/html4/types.html#type-id) attributes (listed in order of precedence, respectively) from the matched elements as the name of the cookie to find and apply.

So, given an element with a different `name` than `id` such as:
````html
<input type="text" id="foo" name="bar" value="" />
````
The plugin will try to find and use a cookie named `bar`. If it cannot find that cookie, it will then try to find and use a cookie named `foo`. This is true no matter what selector was used to find the element--each element is looked at independently and its attributes are iterated in this order to find an applicable cookie.
