/*jslint */

/**
 * jaaulde-jquery-cookies.js
 *
 * Copyright (c) 2005, Jim Auldridge MIT License
 *
 */

/**
 *
 * @param {object} scope - a reference to the call scope
 * @param {undefined} undef - an undefined variable for comparison checks
 * @returns {void}
 */
(function (scope, undef) {
    'use strict';

    var console = scope.console,
        $ = scope.jQuery,
        cookies = scope.cookies,
        NameTokenIterator,
        nti,
        log;

    if ($ !== undef && cookies !== undef) {
        NameTokenIterator = function () {
            this.rewind();
        };

        NameTokenIterator.prototype = {
            next: function () {
                this.current = this.name_token_attrs.shift();

                return this.current !== undef;
            },
            rewind: function () {
                this.current = undef;

                this.name_token_attrs = [
                    'name',
                    'id'
                ];
            }
        };

        log = function (message) {
            if (console && console.log) {
                log = function (m) {
                    console.log(m);
                };
            } else {
                log = $.noop;
            }

            log(message);
        };

        nti = new NameTokenIterator();

        $.extend($.fn, {
            /**
             * $('selector').cookify - set the value of an input field, or the innerHTML of an element, to a cookie by the name or id of the field or element
             *                           (field or element MUST have name or id attribute)
             *
             * @access public
             * @param options OBJECT - list of cookie options to specify
             * @see https://github.com/JAAulde/cookies
             * @return jQuery
             */
            cookify: function (options) {
                return this
                    /*
                     * Iterate radio and checkbox inputs
                     */
                    .filter(':radio, :checkbox').each(function () {
                        log('`cookify` not yet implemented for radios and checkboxes');
                    })
                    .end()
                    /*
                     * Iterate all other elements
                     */
                    .not(':radio, :checkbox').each(function () {
                        var $this,
                            name_token_value,
                            value;

                        $this = $(this);

                        nti.rewind();

                        while (nti.next()) {
                            name_token_value = $this.attr(nti.current);

                            if (typeof name_token_value === 'string' && name_token_value !== '') {
                                value = $this.is(':input') ? $this.val() : $this.html();

                                cookies.set(
                                    name_token_value,
                                    (typeof value === 'string' && value !== '') ? value : null,
                                    options
                                );

                                break;
                            }
                        }
                    })
                    .end();
            },
            /**
             * $('selector').cookieFill - set the value of an input field or the innerHTML of an element from a cookie by the name or id of the field or element
             *
             * @access public
             * @return jQuery
             */
            cookieFill: function () {
                return this
                    /*
                     * Iterate radio and checkbox inputs
                     */
                    .filter(':radio, :checkbox').each(function () {
                        log('`cookieFill` not yet implemented for radios and checkboxes');
                    })
                    .end()
                    /*
                     * Iterate all other elements
                     */
                    .not(':radio, :checkbox').each(function () {
                        var $this,
                            name_token_value,
                            value;

                        $this = $(this);

                        nti.rewind();

                        while (nti.next()) {
                            name_token_value = $this.attr(nti.current);

                            if (typeof name_token_value === 'string' && name_token_value !== '') {
                                value = cookies.get(name_token_value);

                                if (value !== null) {
                                    if ($this.is(':input')) {
                                        $this.val(value);
                                    } else {
                                        $this.html(value);
                                    }
                                }

                                break;
                            }
                        }
                    })
                    .end();
            },
            /**
             * $('selector').cookieBind - call cookieFill() on matching elements, and bind their change events to cookify()
             *
             * @access public
             * @param options OBJECT - list of cookie options to specify
             * @see https://github.com/JAAulde/cookies
             * @return jQuery
             */
            cookieBind: function (options) {
                return this.each(function () {
                    var $this = $(this);

                    $this.cookieFill().on('change', function () {
                        $this.cookify(options);
                    });
                });
            }
        });
    }
}(this));