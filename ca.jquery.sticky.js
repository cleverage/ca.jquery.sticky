/*! Copyright (c) 2014 Clever Age
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function ($) {
  'use strict';

  var PLUGIN = 'sticky';
  var WIN    = $(window);


  // UTILS
  // -----
  function throttle(fn, delay) {
    if (!delay) { delay = 250; }

    var last,
        deferTimer;

    return function () {
      var now  = +new Date(),
          args = arguments;

      if (last && now < last + delay) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(null, args);
        }, delay);
      } else {
        last = now;
        fn.apply(null, args);
      }
    };
  }


  // PLUGIN LOGIC
  // ------------

  function Sticky(element, params) {
    this.element  = element;
    this.top      = element.offset().top;
    this.offset   = (params && parseInt(params.offset, 10)) || 0;
    this.position = element.css('position');

    var fn = $.proxy(this.chkstick, this);

    WIN.on('scroll touchmove', throttle(fn, 50));
  }

  Sticky.prototype = {
    stick    : function () {
      var position = this.element.css('position');
      if (position === 'fixed') { return; }

      var placeholder = $('<div class="' + $.fn[PLUGIN].classname.placeholder + '"/>')
        .css({
          width        : this.element.outerWidth(),
          height       : this.element.outerHeight(),
          marginTop    : this.element.css('marginTop'),
          marginBottom : this.element.css('marginBottom'),
          marginRight  : this.element.css('marginRight'),
          marginLeft   : this.element.css('marginLeft'),
          boxSizing    : 'border-box'
        });

      this.element
        .addClass($.fn[PLUGIN].classname.sticky)
        .after(placeholder)
        .css({
          width        : this.element.width(),
          position     : 'fixed',
          top          : this.offset,
          marginTop    : 0,
          marginBottom : 0,
          marginRight  : 0,
          marginLeft   : 0
        });
    },

    unstick  : function () {
      var position = this.element.css('position');
      if (position !== 'fixed') { return; }

      this.element
        .css({
          position     : this.position,
          top          : '',
          width        : '',
          marginTop    : '',
          marginBottom : '',
          marginRight  : '',
          marginLeft   : ''
        })
        .removeClass($.fn[PLUGIN].classname.sticky)
        .next('.' + $.fn[PLUGIN].classname.placeholder)
          .remove();
    },

    chkstick : function () {
      var pos = WIN.scrollTop();

      if (pos + this.offset >= this.top) {
        this.stick();
      } else {
        this.unstick();
      }
    },

    updateOffset : function (offset) {
      this.offset = parseInt(offset, 10);

      this.unstick();
      this.chkstick();
    }
  };


  // PLUGIN API
  // ----------

  $.fn[PLUGIN] = function (params) {
    params = $.extend({}, $.fn[PLUGIN].defaults, params);

    // Enable the plugin or update the conf on each element
    return this.each(function () {
      var $this  = $(this),
          sticky = $this.data('sticky');

      if (!sticky) {
        $this.data('sticky', new Sticky($this, params));
      } else {
        sticky.updateOffset(params.offset);
      }
    });
  };

  // Default configuration
  $.fn[PLUGIN].defaults = {
    // Define the shift (in pixel) from the top of the page where the element
    // turns sticky. A positive value indicates that the element become sticky
    // before it reaches the top of the page, a negative value indicates that
    // the element become sticky after it reaches the top of the page.
    offset : 0
  };

  // Default class name use by the plug-in
  $.fn[PLUGIN].classname = {
    // Automatically added to the element's placeholder
    placeholder : PLUGIN + '-placeholder',

    // Automatically added to the element when it turns sticky
    sticky : PLUGIN
  };
})(jQuery);