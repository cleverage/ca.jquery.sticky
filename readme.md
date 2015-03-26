jQuery Sticky Plug-in
=====================

This plug-in allow to turn any HTML element into a sticky element.
A sticky element is an element that scrolls with the rest of the page and stays
stuck to the top of the window when it reaches it.


API
---

The main plugin entry is the `sticky()` method

```javascript
$('.stick_me').sticky(options)
```

This method take a configuration object with one property : `offset`.


### `offset`

This property is a number which idicates an offset (in pixel) from where the
element become sticky. A positive value indicates that the element become sticky
before it reaches the top of the page, a negative value indicates that the
element become sticky after it reaches the top of the page.

The default value is `0`.


### Overload default parameters.

It's possible to read and overload de default value of each parameter by
accessing the `$.fn.sticky.defaults` object.


### Impact on DOM and CSS

This plugin has two impacts on the DOM:

1. It will add the `sticky` class to the element when it turns sticky.
2. It will add an extra `div` element with the class
   `sticky-placeholder` in the DOM, right after the element when it turns
   sticky. This extra element is removed once the target element turns unsticky.

CSS is also impacted:

1. When the element turns sticky, the plugin define its position (`position` et
   `top`) and its box model is changed: Its width is frozen and its `margin`is
   set to 0.
2. The `sticky-placeholder` element has its box model frozen. _It's highly
   discourage to apply any CSS rules on it._

The class add to the DOM elements can be customized by acessing the
`$.fn.sticky.className` object. This object has 2 propreties:

* `placeholder` which define the name of the class to add to the placeholder
   element added after the sticky element.
* `sticky` which define the name of the class added to the element when it turns
  sticky.
