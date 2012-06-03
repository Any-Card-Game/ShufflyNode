
/*!
* jQuery UI Dialog 1.8.20
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Dialog
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*  jquery.ui.button.js
*	jquery.ui.draggable.js
*	jquery.ui.mouse.js
*	jquery.ui.position.js
*	jquery.ui.resizable.js
*/



(function ($, undefined) {

    var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
	    buttons: true,
	    height: true,
	    maxHeight: true,
	    maxWidth: true,
	    minHeight: true,
	    minWidth: true,
	    width: true
	},
	resizableRelatedOptions = {
	    maxHeight: true,
	    maxWidth: true,
	    minHeight: true,
	    minWidth: true
	},
    // support for jQuery 1.3.2 - handle common attrFn methods for dialog
	attrFn = $.attrFn || {
	    val: true,
	    css: true,
	    html: true,
	    text: true,
	    data: true,
	    width: true,
	    height: true,
	    offset: true,
	    click: true
	};

    $.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: 'close',
            dialogClass: '',
            draggable: true,
            hide: null,
            height: 'auto',
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: 'center',
                at: 'center',
                collision: 'fit',
                // ensure that the titlebar is never outside the document
                using: function (pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css('top', pos.top - topOffset);
                    }
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: '',
            width: 300,
            zIndex: 1000
        },

        _create: function () {
            this.originalTitle = this.element.attr('title');
            // #5742 - .attr() might return a DOMElement
            if (typeof this.originalTitle !== "string") {
                this.originalTitle = "";
            }

            this.options.title = this.options.title || this.originalTitle;
            var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
				    zIndex: options.zIndex
				})
            // setting tabIndex makes the div focusable
            // setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function (event) {
				    if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

				        self.close(event);
				        event.preventDefault();
				    }
				})
				.attr({
				    role: 'dialog',
				    'aria-labelledby': titleId
				})
				.mousedown(function (event) {
				    self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogLeftBar = (self.uiDialogLeftBar = $('<div></div>'))
				.addClass(
					'ui-dialog-leftbar ' +
					'ui-widget-leftSide ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog),
			uiDialogTitlebarClose = $('<a href="#"></a>')
				.addClass(
					'ui-dialog-titlebar-close ' +
					'ui-corner-all'
				)
				.attr('role', 'button')
				.hover(
					function () {
					    uiDialogTitlebarClose.addClass('ui-state-hover');
					},
					function () {
					    uiDialogTitlebarClose.removeClass('ui-state-hover');
					}
				)
				.focus(function () {
				    uiDialogTitlebarClose.addClass('ui-state-focus');
				})
				.blur(function () {
				    uiDialogTitlebarClose.removeClass('ui-state-focus');
				})
				.click(function (event) {
				    self.close(event);
				    return false;
				})
				.appendTo(uiDialogTitlebar),
            uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
				.addClass(
					'ui-icon ' +
					'ui-icon-closethick'
				)
				.text(options.closeText)
				.appendTo(uiDialogTitlebarClose),


            uiDialogTitlebarShrink = $('<a href="#"></a>')
				.addClass(
					'ui-dialog-titlebar-shrink ' +
					'ui-corner-all'
				)
				.attr('role', 'button')
				.hover(
					function () {
					    uiDialogTitlebarShrink.addClass('ui-state-hover');
					},
					function () {
					    uiDialogTitlebarShrink.removeClass('ui-state-hover');
					}
				)
				.focus(function () {
				    uiDialogTitlebarShrink.addClass('ui-state-focus');
				})
				.blur(function () {
				    uiDialogTitlebarShrink.removeClass('ui-state-focus');
				})
				.click(function (event) {
				    self.close(event);
				    return false;
				})
				.appendTo(uiDialogTitlebar),

			uiDialogTitlebarShrinkText = (self.uiDialogTitlebarShrinkText = $('<span></span>'))
				.addClass(
					'ui-icon ' +
					'ui-icon-triangle-1-ne '
				)
				.text("shrink")
				.appendTo(uiDialogTitlebarShrink),

            uiDialogTitlebarMinimize = $('<a href="#"></a>')
				.addClass(
					'ui-dialog-titlebar-minimize ' +
					'ui-corner-all'
				)
				.attr('role', 'button')
				.hover(
					function () {
					    uiDialogTitlebarMinimize.addClass('ui-state-hover');
					},
					function () {
					    uiDialogTitlebarMinimize.removeClass('ui-state-hover');
					}
				)
				.focus(function () {
				    uiDialogTitlebarMinimize.addClass('ui-state-focus');
				})
				.blur(function () {
				    uiDialogTitlebarMinimize.removeClass('ui-state-focus');
				})
				.click(function (event) {
				    $(uiDialog).animate({
				        width: 130,
				        height: 45,
				        left:3,
				        top:$(document).height()-75
				    }, 1000);
				    

				    return false;
				})
				.appendTo(uiDialogTitlebar),

			uiDialogTitlebarMinimizeText = (self.uiDialogTitlebarMinimizeText = $('<span></span>'))
				.addClass(
					'ui-icon ' +
					'ui-icon-triangle-1-sw'
				)
				.text("minimize")
				.appendTo(uiDialogTitlebarMinimize),

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

            uiDialogTitlebarShrink.css({ 'margin-right': '20px' });
            uiDialogTitlebarMinimize.css({ 'margin-right': '40px' });
            //handling of deprecated beforeclose (vs beforeClose) option
            //Ticket #4669 http://dev.jqueryui.com/ticket/4669
            //TODO: remove in 1.9pre
            if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
                options.beforeClose = options.beforeclose;
            }

            uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

            if (options.draggable && $.fn.draggable) {
                self._makeDraggable();
            }
            if (options.resizable && $.fn.resizable) {
                self._makeResizable();
            }

            self._createButtons(options.buttons);
            self._isOpen = false;

            if ($.fn.bgiframe) {
                uiDialog.bgiframe();
            }
        },

        _init: function () {
            if (this.options.autoOpen) {
                this.open();
            }
        },

        destroy: function () {
            var self = this;

            if (self.overlay) {
                self.overlay.destroy();
            }
            self.uiDialog.hide();
            self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
            self.uiDialog.remove();

            if (self.originalTitle) {
                self.element.attr('title', self.originalTitle);
            }

            return self;
        },

        widget: function () {
            return this.uiDialog;
        },

        close: function (event) {
            var self = this,
			maxZ, thisZ;

            if (false === self._trigger('beforeClose', event)) {
                return;
            }

            if (self.overlay) {
                self.overlay.destroy();
            }
            self.uiDialog.unbind('keypress.ui-dialog');

            self._isOpen = false;

            if (self.options.hide) {
                self.uiDialog.hide(self.options.hide, function () {
                    self._trigger('close', event);
                });
            } else {
                self.uiDialog.hide();
                self._trigger('close', event);
            }

            $.ui.dialog.overlay.resize();

            // adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
            if (self.options.modal) {
                maxZ = 0;
                $('.ui-dialog').each(function () {
                    if (this !== self.uiDialog[0]) {
                        thisZ = $(this).css('z-index');
                        if (!isNaN(thisZ)) {
                            maxZ = Math.max(maxZ, thisZ);
                        }
                    }
                });
                $.ui.dialog.maxZ = maxZ;
            }

            return self;
        },

        isOpen: function () {
            return this._isOpen;
        },

        // the force parameter allows us to move modal dialogs to their correct
        // position on open
        moveToTop: function (force, event) {
            var self = this,
			options = self.options,
			saveScroll;

            if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
                return self._trigger('focus', event);
            }

            if (options.zIndex > $.ui.dialog.maxZ) {
                $.ui.dialog.maxZ = options.zIndex;
            }
            if (self.overlay) {
                $.ui.dialog.maxZ += 1;
                self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
            }

            //Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
            //  http://ui.jquery.com/bugs/ticket/3193
            saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
            $.ui.dialog.maxZ += 1;
            self.uiDialog.css('z-index', $.ui.dialog.maxZ);
            self.element.attr(saveScroll);
            self._trigger('focus', event);

            return self;
        },

        open: function () {
            if (this._isOpen) { return; }

            var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

            self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
            self._size();
            self._position(options.position);
            uiDialog.show(options.show);
            self.moveToTop(true);

            // prevent tabbing out of modal dialogs
            if (options.modal) {
                uiDialog.bind("keydown.ui-dialog", function (event) {
                    if (event.keyCode !== $.ui.keyCode.TAB) {
                        return;
                    }

                    var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last = tabbables.filter(':last');

                    if (event.target === last[0] && !event.shiftKey) {
                        first.focus(1);
                        return false;
                    } else if (event.target === first[0] && event.shiftKey) {
                        last.focus(1);
                        return false;
                    }
                });
            }

            // set focus to the first tabbable element in the content area or the first button
            // if there are no tabbable elements, set focus on the dialog itself
            $(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

            self._isOpen = true;
            self._trigger('open');

            return self;
        },

        _createButtons: function (buttons) {
            var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $("<div></div>")
				.addClass("ui-dialog-buttonset")
				.appendTo(uiDialogButtonPane);

            // if we already have a button pane, remove it
            self.uiDialog.find('.ui-dialog-buttonpane').remove();

            if (typeof buttons === 'object' && buttons !== null) {
                $.each(buttons, function () {
                    return !(hasButtons = true);
                });
            }
            if (hasButtons) {
                $.each(buttons, function (name, props) {
                    props = $.isFunction(props) ?
					{ click: props, text: name} :
					props;
                    var button = $('<button type="button"></button>')
					.click(function () {
					    props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
                    // can't use .attr( props, true ) with jQuery 1.3.2.
                    $.each(props, function (key, value) {
                        if (key === "click") {
                            return;
                        }
                        if (key in attrFn) {
                            button[key](value);
                        } else {
                            button.attr(key, value);
                        }
                    });
                    if ($.fn.button) {
                        button.button();
                    }
                });
                uiDialogButtonPane.appendTo(self.uiDialog);
            }
        },

        _makeDraggable: function () {
            var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

            function filteredUi(ui) {
                return {
                    position: ui.position,
                    offset: ui.offset
                };
            }

            self.uiDialog.draggable({
                cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
                handle: '.ui-dialog-titlebar',
                containment: 'document',
                start: function (event, ui) {
                    heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
                    $(this).height($(this).height()).addClass("ui-dialog-dragging");
                    self._trigger('dragStart', event, filteredUi(ui));
                },
                drag: function (event, ui) {
                    self._trigger('drag', event, filteredUi(ui));
                },
                stop: function (event, ui) {
                    options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
                    $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
                    self._trigger('dragStop', event, filteredUi(ui));
                    $.ui.dialog.overlay.resize();
                }
            });
        },

        _makeResizable: function (handles) {
            handles = (handles === undefined ? this.options.resizable : handles);
            var self = this,
			options = self.options,
            // .ui-resizable has position: relative defined in the stylesheet
            // but dialogs have to use absolute or fixed positioning
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles :
				'n,e,s,w,se,sw,ne,nw'
			);

            function filteredUi(ui) {
                return {
                    originalPosition: ui.originalPosition,
                    originalSize: ui.originalSize,
                    position: ui.position,
                    size: ui.size
                };
            }

            self.uiDialog.resizable({
                cancel: '.ui-dialog-content',
                containment: 'document',
                alsoResize: self.element,
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: self._minHeight(),
                handles: resizeHandles,
                start: function (event, ui) {
                    $(this).addClass("ui-dialog-resizing");
                    self._trigger('resizeStart', event, filteredUi(ui));
                },
                resize: function (event, ui) {
                    self._trigger('resize', event, filteredUi(ui));
                },
                stop: function (event, ui) {
                    $(this).removeClass("ui-dialog-resizing");
                    options.height = $(this).height();
                    options.width = $(this).width();
                    self._trigger('resizeStop', event, filteredUi(ui));
                    $.ui.dialog.overlay.resize();
                }
            })
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
        },

        _minHeight: function () {
            var options = this.options;

            if (options.height === 'auto') {
                return options.minHeight;
            } else {
                return Math.min(options.minHeight, options.height);
            }
        },

        _position: function (position) {
            var myAt = [],
			offset = [0, 0],
			isVisible;

            if (position) {
                // deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
                //		if (typeof position == 'string' || $.isArray(position)) {
                //			myAt = $.isArray(position) ? position : position.split(' ');

                if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
                    myAt = position.split ? position.split(' ') : [position[0], position[1]];
                    if (myAt.length === 1) {
                        myAt[1] = myAt[0];
                    }

                    $.each(['left', 'top'], function (i, offsetPosition) {
                        if (+myAt[i] === myAt[i]) {
                            offset[i] = myAt[i];
                            myAt[i] = offsetPosition;
                        }
                    });

                    position = {
                        my: myAt.join(" "),
                        at: myAt.join(" "),
                        offset: offset.join(" ")
                    };
                }

                position = $.extend({}, $.ui.dialog.prototype.options.position, position);
            } else {
                position = $.ui.dialog.prototype.options.position;
            }

            // need to show the dialog to get the actual offset in the position plugin
            isVisible = this.uiDialog.is(':visible');
            if (!isVisible) {
                this.uiDialog.show();
            }
            this.uiDialog
            // workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
            if (!isVisible) {
                this.uiDialog.hide();
            }
        },

        _setOptions: function (options) {
            var self = this,
			resizableOptions = {},
			resize = false;

            $.each(options, function (key, value) {
                self._setOption(key, value);

                if (key in sizeRelatedOptions) {
                    resize = true;
                }
                if (key in resizableRelatedOptions) {
                    resizableOptions[key] = value;
                }
            });

            if (resize) {
                this._size();
            }
            if (this.uiDialog.is(":data(resizable)")) {
                this.uiDialog.resizable("option", resizableOptions);
            }
        },

        _setOption: function (key, value) {
            var self = this,
			uiDialog = self.uiDialog;

            switch (key) {
                //handling of deprecated beforeclose (vs beforeClose) option    
                //Ticket #4669 http://dev.jqueryui.com/ticket/4669    
                //TODO: remove in 1.9pre    
                case "beforeclose":
                    key = "beforeClose";
                    break;
                case "buttons":
                    self._createButtons(value);
                    break;
                case "closeText":
                    // ensure that we always pass a string
                    self.uiDialogTitlebarCloseText.text("" + value);
                    break;
                case "dialogClass":
                    uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
                    break;
                case "disabled":
                    if (value) {
                        uiDialog.addClass('ui-dialog-disabled');
                    } else {
                        uiDialog.removeClass('ui-dialog-disabled');
                    }
                    break;
                case "draggable":
                    var isDraggable = uiDialog.is(":data(draggable)");
                    if (isDraggable && !value) {
                        uiDialog.draggable("destroy");
                    }

                    if (!isDraggable && value) {
                        self._makeDraggable();
                    }
                    break;
                case "position":
                    self._position(value);
                    break;
                case "resizable":
                    // currently resizable, becoming non-resizable
                    var isResizable = uiDialog.is(":data(resizable)");
                    if (isResizable && !value) {
                        uiDialog.resizable('destroy');
                    }

                    // currently resizable, changing handles
                    if (isResizable && typeof value === 'string') {
                        uiDialog.resizable('option', 'handles', value);
                    }

                    // currently non-resizable, becoming resizable
                    if (!isResizable && value !== false) {
                        self._makeResizable(value);
                    }
                    break;
                case "title":
                    // convert whatever was passed in o a string, for html() to not throw up
                    $(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
                    break;
            }

            $.Widget.prototype._setOption.apply(self, arguments);
        },

        _size: function () {
            /* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
            * divs will both have width and height set, so we need to reset them
            */
            var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is(":visible");

            // reset content sizing
            this.element.show().css({
                width: 'auto',
                minHeight: 0,
                height: 0
            });

            if (options.minWidth > options.width) {
                options.width = options.minWidth;
            }

            // reset wrapper sizing
            // determine the height of all the non-content elements
            nonContentHeight = this.uiDialog.css({
                height: 'auto',
                width: options.width
            })
			.height();
            minContentHeight = Math.max(0, options.minHeight - nonContentHeight);

            if (options.height === "auto") {
                // only needed for IE6 support
                if ($.support.minHeight) {
                    this.element.css({
                        minHeight: minContentHeight,
                        height: "auto"
                    });
                } else {
                    this.uiDialog.show();
                    var autoHeight = this.element.css("height", "auto").height();
                    if (!isVisible) {
                        this.uiDialog.hide();
                    }
                    this.element.height(Math.max(autoHeight, minContentHeight));
                }
            } else {
                this.element.height(Math.max(options.height - nonContentHeight, 0));
            }

            if (this.uiDialog.is(':data(resizable)')) {
                this.uiDialog.resizable('option', 'minHeight', this._minHeight());
            }
        }
    });

    $.extend($.ui.dialog, {
        version: "1.8.20",

        uuid: 0,
        maxZ: 0,

        getTitleId: function ($el) {
            var id = $el.attr('id');
            if (!id) {
                this.uuid += 1;
                id = this.uuid;
            }
            return 'ui-dialog-title-' + id;
        },

        overlay: function (dialog) {
            this.$el = $.ui.dialog.overlay.create(dialog);
        }
    });

    $.extend($.ui.dialog.overlay, {
        instances: [],
        // reuse old instances due to IE memory leak with alpha transparency (see #5185)
        oldInstances: [],
        maxZ: 0,
        events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function (event) { return event + '.dialog-overlay'; }).join(' '),
        create: function (dialog) {
            if (this.instances.length === 0) {
                // prevent use of anchors and inputs
                // we use a setTimeout in case the overlay is created from an
                // event that we're going to be cancelling (see #2804)
                setTimeout(function () {
                    // handle $(el).dialog().dialog('close') (see #4065)
                    if ($.ui.dialog.overlay.instances.length) {
                        $(document).bind($.ui.dialog.overlay.events, function (event) {
                            // stop events if the z-index of the target is < the z-index of the overlay
                            // we cannot return true when we don't want to cancel the event (#3523)
                            if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
                                return false;
                            }
                        });
                    }
                }, 1);

                // allow closing by pressing the escape key
                $(document).bind('keydown.dialog-overlay', function (event) {
                    if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

                        dialog.close(event);
                        event.preventDefault();
                    }
                });

                // handle window resize
                $(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
            }

            var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
			    width: this.width(),
			    height: this.height()
			});

            if ($.fn.bgiframe) {
                $el.bgiframe();
            }

            this.instances.push($el);
            return $el;
        },

        destroy: function ($el) {
            var indexOf = $.inArray($el, this.instances);
            if (indexOf != -1) {
                this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
            }

            if (this.instances.length === 0) {
                $([document, window]).unbind('.dialog-overlay');
            }

            $el.remove();

            // adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
            var maxZ = 0;
            $.each(this.instances, function () {
                maxZ = Math.max(maxZ, this.css('z-index'));
            });
            this.maxZ = maxZ;
        },

        height: function () {
            var scrollHeight,
			offsetHeight;
            // handle IE 6
            if ($.browser.msie && $.browser.version < 7) {
                scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
                offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

                if (scrollHeight < offsetHeight) {
                    return $(window).height() + 'px';
                } else {
                    return scrollHeight + 'px';
                }
                // handle "good" browsers
            } else {
                return $(document).height() + 'px';
            }
        },

        width: function () {
            var scrollWidth,
			offsetWidth;
            // handle IE
            if ($.browser.msie) {
                scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
                offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

                if (scrollWidth < offsetWidth) {
                    return $(window).width() + 'px';
                } else {
                    return scrollWidth + 'px';
                }
                // handle "good" browsers
            } else {
                return $(document).width() + 'px';
            }
        },

        resize: function () {
            /* If the dialog is draggable and the user drags it past the
            * right edge of the window, the document becomes wider so we
            * need to stretch the overlay. If the user then drags the
            * dialog back to the left, the document will become narrower,
            * so we need to shrink the overlay to the appropriate size.
            * This is handled by shrinking the overlay before setting it
            * to the full document size.
            */
            var $overlays = $([]);
            $.each($.ui.dialog.overlay.instances, function () {
                $overlays = $overlays.add(this);
            });

            $overlays.css({
                width: 0,
                height: 0
            }).css({
                width: $.ui.dialog.overlay.width(),
                height: $.ui.dialog.overlay.height()
            });
        }
    });

    $.extend($.ui.dialog.overlay.prototype, {
        destroy: function () {
            $.ui.dialog.overlay.destroy(this.$el);
        }
    });

} (jQuery));



/*!
* jQuery UI Resizable 1.8.20
*
* Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Resizables
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.mouse.js
*	jquery.ui.widget.js
*/
(function ($, undefined) {

    $.widget("ui.resizable", $.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function () {

            var self = this, o = this.options;
            this.element.addClass("ui-resizable");

            $.extend(this, {
                _aspectRatio: !!(o.aspectRatio),
                aspectRatio: o.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: o.helper || o.ghost || o.animate ? o.helper || 'ui-resizable-helper' : null
            });

            //Wrap the element if it cannot hold child nodes
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {

                //Create a wrapper element and set the wrapper to the new current internal element
                this.element.wrap(
				$('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
				    position: this.element.css('position'),
				    width: this.element.outerWidth(),
				    height: this.element.outerHeight(),
				    top: this.element.css('top'),
				    left: this.element.css('left')
				})
			);

                //Overwrite the original this.element
                this.element = this.element.parent().data(
				"resizable", this.element.data('resizable')
			);

                this.elementIsWrapper = true;

                //Move margins to the wrapper
                this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") });
                this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 });

                //Prevent Safari textarea resize
                this.originalResizeStyle = this.originalElement.css('resize');
                this.originalElement.css('resize', 'none');

                //Push the actual element to our proportionallyResize internal array
                this._proportionallyResizeElements.push(this.originalElement.css({ position: 'static', zoom: 1, display: 'block' }));

                // avoid IE jump (hard set the margin)
                this.originalElement.css({ margin: this.originalElement.css('margin') });

                // fix handlers offset
                this._proportionallyResize();

            }

            this.handles = o.handles || (!$('.ui-resizable-handle', this.element).length ? "e,s,se" : { n: '.ui-resizable-n', e: '.ui-resizable-e', s: '.ui-resizable-s', w: '.ui-resizable-w', se: '.ui-resizable-se', sw: '.ui-resizable-sw', ne: '.ui-resizable-ne', nw: '.ui-resizable-nw' });
            if (this.handles.constructor == String) {

                if (this.handles == 'all') this.handles = 'n,e,s,w,se,sw,ne,nw';
                var n = this.handles.split(","); this.handles = {};

                for (var i = 0; i < n.length; i++) {

                    var handle = $.trim(n[i]), hname = 'ui-resizable-' + handle;
                    var axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');

                    // Apply zIndex to all handles - see #7960
                    axis.css({ zIndex: o.zIndex });

                    //TODO : What's going on here?
                    if ('se' == handle) {
                        //axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
                    };

                    //Insert into internal handles object and append to element
                    this.handles[handle] = '.ui-resizable-' + handle;
                    this.element.append(axis);
                }

            }

            this._renderAxis = function (target) {

                target = target || this.element;

                for (var i in this.handles) {

                    if (this.handles[i].constructor == String)
                        this.handles[i] = $(this.handles[i], this.element).show();

                    //Apply pad to wrapper element, needed to fix axis position (textarea, inputs, scrolls)
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {

                        var axis = $(this.handles[i], this.element), padWrapper = 0;

                        //Checking the correct pad and border
                        padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

                        //The padding type i have to apply...
                        var padPos = ['padding',
						/ne|nw|n/.test(i) ? 'Top' :
						/se|sw|s/.test(i) ? 'Bottom' :
						/^e$/.test(i) ? 'Right' : 'Left'].join("");

                        target.css(padPos, padWrapper);

                        this._proportionallyResize();

                    }

                    //TODO: What's that good for? There's not anything to be executed left
                    if (!$(this.handles[i]).length)
                        continue;

                }
            };

            //TODO: make renderAxis a prototype function
            this._renderAxis(this.element);

            this._handles = $('.ui-resizable-handle', this.element)
			.disableSelection();

            //Matching axis name
            this._handles.mouseover(function () {
                if (!self.resizing) {
                    if (this.className)
                        var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    //Axis, default = se
                    self.axis = axis && axis[1] ? axis[1] : 'se';
                }
            });

            //If we want to auto hide the elements
            if (o.autoHide) {
                this._handles.hide();
                $(this.element)
				.addClass("ui-resizable-autohide")
				.hover(function () {
				    if (o.disabled) return;
				    $(this).removeClass("ui-resizable-autohide");
				    self._handles.show();
				},
				function () {
				    if (o.disabled) return;
				    if (!self.resizing) {
				        $(this).addClass("ui-resizable-autohide");
				        self._handles.hide();
				    }
				});
            }

            //Initialize the mouse interaction
            this._mouseInit();

        },

        destroy: function () {

            this._mouseDestroy();

            var _destroy = function (exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
				.removeData("resizable").unbind(".resizable").find('.ui-resizable-handle').remove();
            };

            //TODO: Unwrap at same DOM position
            if (this.elementIsWrapper) {
                _destroy(this.element);
                var wrapper = this.element;
                wrapper.after(
				this.originalElement.css({
				    position: wrapper.css('position'),
				    width: wrapper.outerWidth(),
				    height: wrapper.outerHeight(),
				    top: wrapper.css('top'),
				    left: wrapper.css('left')
				})
			).remove();
            }

            this.originalElement.css('resize', this.originalResizeStyle);
            _destroy(this.originalElement);

            return this;
        },

        _mouseCapture: function (event) {
            var handle = false;
            for (var i in this.handles) {
                if ($(this.handles[i])[0] == event.target) {
                    handle = true;
                }
            }

            return !this.options.disabled && handle;
        },

        _mouseStart: function (event) {

            var o = this.options, iniPos = this.element.position(), el = this.element;

            this.resizing = true;
            this.documentScroll = { top: $(document).scrollTop(), left: $(document).scrollLeft() };

            // bugfix for http://dev.jquery.com/ticket/1749
            if (el.is('.ui-draggable') || (/absolute/).test(el.css('position'))) {
                el.css({ position: 'absolute', top: iniPos.top, left: iniPos.left });
            }

            this._renderProxy();

            var curleft = num(this.helper.css('left')), curtop = num(this.helper.css('top'));

            if (o.containment) {
                curleft += $(o.containment).scrollLeft() || 0;
                curtop += $(o.containment).scrollTop() || 0;
            }

            //Store needed variables
            this.offset = this.helper.offset();
            this.position = { left: curleft, top: curtop };
            this.size = this._helper ? { width: el.outerWidth(), height: el.outerHeight()} : { width: el.width(), height: el.height() };
            this.originalSize = this._helper ? { width: el.outerWidth(), height: el.outerHeight()} : { width: el.width(), height: el.height() };
            this.originalPosition = { left: curleft, top: curtop };
            this.sizeDiff = { width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height() };
            this.originalMousePosition = { left: event.pageX, top: event.pageY };

            //Aspect Ratio
            this.aspectRatio = (typeof o.aspectRatio == 'number') ? o.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);

            var cursor = $('.ui-resizable-' + this.axis).css('cursor');
            $('body').css('cursor', cursor == 'auto' ? this.axis + '-resize' : cursor);

            el.addClass("ui-resizable-resizing");
            this._propagate("start", event);
            return true;
        },

        _mouseDrag: function (event) {

            //Increase performance, avoid regex
            var el = this.helper, o = this.options, props = {},
			self = this, smp = this.originalMousePosition, a = this.axis;

            var dx = (event.pageX - smp.left) || 0, dy = (event.pageY - smp.top) || 0;
            var trigger = this._change[a];
            if (!trigger) return false;

            // Calculate the attrs that will be change
            var data = trigger.apply(this, [event, dx, dy]), ie6 = $.browser.msie && $.browser.version < 7, csdif = this.sizeDiff;

            // Put this in the mouseDrag handler since the user can start pressing shift while resizing
            this._updateVirtualBoundaries(event.shiftKey);
            if (this._aspectRatio || event.shiftKey)
                data = this._updateRatio(data, event);

            data = this._respectSize(data, event);

            // plugins callbacks need to be called first
            this._propagate("resize", event);

            el.css({
                top: this.position.top + "px", left: this.position.left + "px",
                width: this.size.width + "px", height: this.size.height + "px"
            });

            if (!this._helper && this._proportionallyResizeElements.length)
                this._proportionallyResize();

            this._updateCache(data);

            // calling the user callback at the end
            this._trigger('resize', event, this.ui());

            return false;
        },

        _mouseStop: function (event) {

            this.resizing = false;
            var o = this.options, self = this;

            if (this._helper) {
                var pr = this._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
				soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
				soffsetw = ista ? 0 : self.sizeDiff.width;

                var s = { width: (self.helper.width() - soffsetw), height: (self.helper.height() - soffseth) },
				left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
				top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

                if (!o.animate)
                    this.element.css($.extend(s, { top: top, left: left }));

                self.helper.height(self.size.height);
                self.helper.width(self.size.width);

                if (this._helper && !o.animate) this._proportionallyResize();
            }

            $('body').css('cursor', 'auto');

            this.element.removeClass("ui-resizable-resizing");

            this._propagate("stop", event);

            if (this._helper) this.helper.remove();
            return false;

        },

        _updateVirtualBoundaries: function (forceAspectRatio) {
            var o = this.options, pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b;

            b = {
                minWidth: isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: isNumber(o.maxWidth) ? o.maxWidth : Infinity,
                minHeight: isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: isNumber(o.maxHeight) ? o.maxHeight : Infinity
            };

            if (this._aspectRatio || forceAspectRatio) {
                // We want to create an enclosing box whose aspect ration is the requested one
                // First, compute the "projected" size for each dimension based on the aspect ratio and other dimension
                pMinWidth = b.minHeight * this.aspectRatio;
                pMinHeight = b.minWidth / this.aspectRatio;
                pMaxWidth = b.maxHeight * this.aspectRatio;
                pMaxHeight = b.maxWidth / this.aspectRatio;

                if (pMinWidth > b.minWidth) b.minWidth = pMinWidth;
                if (pMinHeight > b.minHeight) b.minHeight = pMinHeight;
                if (pMaxWidth < b.maxWidth) b.maxWidth = pMaxWidth;
                if (pMaxHeight < b.maxHeight) b.maxHeight = pMaxHeight;
            }
            this._vBoundaries = b;
        },

        _updateCache: function (data) {
            var o = this.options;
            this.offset = this.helper.offset();
            if (isNumber(data.left)) this.position.left = data.left;
            if (isNumber(data.top)) this.position.top = data.top;
            if (isNumber(data.height)) this.size.height = data.height;
            if (isNumber(data.width)) this.size.width = data.width;
        },

        _updateRatio: function (data, event) {

            var o = this.options, cpos = this.position, csize = this.size, a = this.axis;

            if (isNumber(data.height)) data.width = (data.height * this.aspectRatio);
            else if (isNumber(data.width)) data.height = (data.width / this.aspectRatio);

            if (a == 'sw') {
                data.left = cpos.left + (csize.width - data.width);
                data.top = null;
            }
            if (a == 'nw') {
                data.top = cpos.top + (csize.height - data.height);
                data.left = cpos.left + (csize.width - data.width);
            }

            return data;
        },

        _respectSize: function (data, event) {

            var el = this.helper, o = this._vBoundaries, pRatio = this._aspectRatio || event.shiftKey, a = this.axis,
				ismaxw = isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width), ismaxh = isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
					isminw = isNumber(data.width) && o.minWidth && (o.minWidth > data.width), isminh = isNumber(data.height) && o.minHeight && (o.minHeight > data.height);

            if (isminw) data.width = o.minWidth;
            if (isminh) data.height = o.minHeight;
            if (ismaxw) data.width = o.maxWidth;
            if (ismaxh) data.height = o.maxHeight;

            var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height;
            var cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);

            if (isminw && cw) data.left = dw - o.minWidth;
            if (ismaxw && cw) data.left = dw - o.maxWidth;
            if (isminh && ch) data.top = dh - o.minHeight;
            if (ismaxh && ch) data.top = dh - o.maxHeight;

            // fixing jump error on top/left - bug #2330
            var isNotwh = !data.width && !data.height;
            if (isNotwh && !data.left && data.top) data.top = null;
            else if (isNotwh && !data.top && data.left) data.left = null;

            return data;
        },

        _proportionallyResize: function () {

            var o = this.options;
            if (!this._proportionallyResizeElements.length) return;
            var element = this.helper || this.element;

            for (var i = 0; i < this._proportionallyResizeElements.length; i++) {

                var prel = this._proportionallyResizeElements[i];

                if (!this.borderDif) {
                    var b = [prel.css('borderTopWidth'), prel.css('borderRightWidth'), prel.css('borderBottomWidth'), prel.css('borderLeftWidth')],
					p = [prel.css('paddingTop'), prel.css('paddingRight'), prel.css('paddingBottom'), prel.css('paddingLeft')];

                    this.borderDif = $.map(b, function (v, i) {
                        var border = parseInt(v, 10) || 0, padding = parseInt(p[i], 10) || 0;
                        return border + padding;
                    });
                }

                if ($.browser.msie && !(!($(element).is(':hidden') || $(element).parents(':hidden').length)))
                    continue;

                prel.css({
                    height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0
                });

            };

        },

        _renderProxy: function () {

            var el = this.element, o = this.options;
            this.elementOffset = el.offset();

            if (this._helper) {

                this.helper = this.helper || $('<div style="overflow:hidden;"></div>');

                // fix ie6 offset TODO: This seems broken
                var ie6 = $.browser.msie && $.browser.version < 7, ie6offset = (ie6 ? 1 : 0),
			pxyoffset = (ie6 ? 2 : -1);

                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + pxyoffset,
                    height: this.element.outerHeight() + pxyoffset,
                    position: 'absolute',
                    left: this.elementOffset.left - ie6offset + 'px',
                    top: this.elementOffset.top - ie6offset + 'px',
                    zIndex: ++o.zIndex //TODO: Don't modify option
                });

                this.helper
				.appendTo("body")
				.disableSelection();

            } else {
                this.helper = this.element;
            }

        },

        _change: {
            e: function (event, dx, dy) {
                return { width: this.originalSize.width + dx };
            },
            w: function (event, dx, dy) {
                var o = this.options, cs = this.originalSize, sp = this.originalPosition;
                return { left: sp.left + dx, width: cs.width - dx };
            },
            n: function (event, dx, dy) {
                var o = this.options, cs = this.originalSize, sp = this.originalPosition;
                return { top: sp.top + dy, height: cs.height - dy };
            },
            s: function (event, dx, dy) {
                return { height: this.originalSize.height + dy };
            },
            se: function (event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
            },
            sw: function (event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
            },
            ne: function (event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
            },
            nw: function (event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
            }
        },

        _propagate: function (n, event) {
            $.ui.plugin.call(this, n, [event, this.ui()]);
            (n != "resize" && this._trigger(n, event, this.ui()));
        },

        plugins: {},

        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            };
        }

    });

    $.extend($.ui.resizable, {
        version: "1.8.20"
    });

    /*
    * Resizable Extensions
    */

    $.ui.plugin.add("resizable", "alsoResize", {

        start: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options;

            var _store = function (exp) {
                $(exp).each(function () {
                    var el = $(this);
                    el.data("resizable-alsoresize", {
                        width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
                        left: parseInt(el.css('left'), 10), top: parseInt(el.css('top'), 10)
                    });
                });
            };

            if (typeof (o.alsoResize) == 'object' && !o.alsoResize.parentNode) {
                if (o.alsoResize.length) { o.alsoResize = o.alsoResize[0]; _store(o.alsoResize); }
                else { $.each(o.alsoResize, function (exp) { _store(exp); }); }
            } else {
                _store(o.alsoResize);
            }
        },

        resize: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition;

            var delta = {
                height: (self.size.height - os.height) || 0, width: (self.size.width - os.width) || 0,
                top: (self.position.top - op.top) || 0, left: (self.position.left - op.left) || 0
            },

		_alsoResize = function (exp, c) {
		    $(exp).each(function () {
		        var el = $(this), start = $(this).data("resizable-alsoresize"), style = {},
					css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ['width', 'height'] : ['width', 'height', 'top', 'left'];

		        $.each(css, function (i, prop) {
		            var sum = (start[prop] || 0) + (delta[prop] || 0);
		            if (sum && sum >= 0)
		                style[prop] = sum || null;
		        });

		        el.css(style);
		    });
		};

            if (typeof (o.alsoResize) == 'object' && !o.alsoResize.nodeType) {
                $.each(o.alsoResize, function (exp, c) { _alsoResize(exp, c); });
            } else {
                _alsoResize(o.alsoResize);
            }
        },

        stop: function (event, ui) {
            $(this).removeData("resizable-alsoresize");
        }
    });

    $.ui.plugin.add("resizable", "animate", {

        stop: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options;

            var pr = self._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
					soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
						soffsetw = ista ? 0 : self.sizeDiff.width;

            var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
					left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
						top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

            self.element.animate(
			$.extend(style, top && left ? { top: top, left: left} : {}), {
			    duration: o.animateDuration,
			    easing: o.animateEasing,
			    step: function () {

			        var data = {
			            width: parseInt(self.element.css('width'), 10),
			            height: parseInt(self.element.css('height'), 10),
			            top: parseInt(self.element.css('top'), 10),
			            left: parseInt(self.element.css('left'), 10)
			        };

			        if (pr && pr.length) $(pr[0]).css({ width: data.width, height: data.height });

			        // propagating resize, and updating values for each animation step
			        self._updateCache(data);
			        self._propagate("resize", event);

			    }
			}
		);
        }

    });

    $.ui.plugin.add("resizable", "containment", {

        start: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options, el = self.element;
            var oc = o.containment, ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
            if (!ce) return;

            self.containerElement = $(ce);

            if (/document/.test(oc) || oc == document) {
                self.containerOffset = { left: 0, top: 0 };
                self.containerPosition = { left: 0, top: 0 };

                self.parentData = {
                    element: $(document), left: 0, top: 0,
                    width: $(document).width(), height: $(document).height() || document.body.parentNode.scrollHeight
                };
            }

            // i'm a node, so compute top, left, right, bottom
            else {
                var element = $(ce), p = [];
                $(["Top", "Right", "Left", "Bottom"]).each(function (i, name) { p[i] = num(element.css("padding" + name)); });

                self.containerOffset = element.offset();
                self.containerPosition = element.position();
                self.containerSize = { height: (element.innerHeight() - p[3]), width: (element.innerWidth() - p[1]) };

                var co = self.containerOffset, ch = self.containerSize.height, cw = self.containerSize.width,
						width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw), height = ($.ui.hasScroll(ce) ? ce.scrollHeight : ch);

                self.parentData = {
                    element: ce, left: co.left, top: co.top, width: width, height: height
                };
            }
        },

        resize: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options,
				ps = self.containerSize, co = self.containerOffset, cs = self.size, cp = self.position,
				pRatio = self._aspectRatio || event.shiftKey, cop = { top: 0, left: 0 }, ce = self.containerElement;

            if (ce[0] != document && (/static/).test(ce.css('position'))) cop = co;

            if (cp.left < (self._helper ? co.left : 0)) {
                self.size.width = self.size.width + (self._helper ? (self.position.left - co.left) : (self.position.left - cop.left));
                if (pRatio) self.size.height = self.size.width / self.aspectRatio;
                self.position.left = o.helper ? co.left : 0;
            }

            if (cp.top < (self._helper ? co.top : 0)) {
                self.size.height = self.size.height + (self._helper ? (self.position.top - co.top) : self.position.top);
                if (pRatio) self.size.width = self.size.height * self.aspectRatio;
                self.position.top = self._helper ? co.top : 0;
            }

            self.offset.left = self.parentData.left + self.position.left;
            self.offset.top = self.parentData.top + self.position.top;

            var woset = Math.abs((self._helper ? self.offset.left - cop.left : (self.offset.left - cop.left)) + self.sizeDiff.width),
					hoset = Math.abs((self._helper ? self.offset.top - cop.top : (self.offset.top - co.top)) + self.sizeDiff.height);

            var isParent = self.containerElement.get(0) == self.element.parent().get(0),
		    isOffsetRelative = /relative|absolute/.test(self.containerElement.css('position'));

            if (isParent && isOffsetRelative) woset -= self.parentData.left;

            if (woset + self.size.width >= self.parentData.width) {
                self.size.width = self.parentData.width - woset;
                if (pRatio) self.size.height = self.size.width / self.aspectRatio;
            }

            if (hoset + self.size.height >= self.parentData.height) {
                self.size.height = self.parentData.height - hoset;
                if (pRatio) self.size.width = self.size.height * self.aspectRatio;
            }
        },

        stop: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options, cp = self.position,
				co = self.containerOffset, cop = self.containerPosition, ce = self.containerElement;

            var helper = $(self.helper), ho = helper.offset(), w = helper.outerWidth() - self.sizeDiff.width, h = helper.outerHeight() - self.sizeDiff.height;

            if (self._helper && !o.animate && (/relative/).test(ce.css('position')))
                $(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

            if (self._helper && !o.animate && (/static/).test(ce.css('position')))
                $(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

        }
    });

    $.ui.plugin.add("resizable", "ghost", {

        start: function (event, ui) {

            var self = $(this).data("resizable"), o = self.options, cs = self.size;

            self.ghost = self.originalElement.clone();
            self.ghost
			.css({ opacity: .25, display: 'block', position: 'relative', height: cs.height, width: cs.width, margin: 0, left: 0, top: 0 })
			.addClass('ui-resizable-ghost')
			.addClass(typeof o.ghost == 'string' ? o.ghost : '');

            self.ghost.appendTo(self.helper);

        },

        resize: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options;
            if (self.ghost) self.ghost.css({ position: 'relative', height: self.size.height, width: self.size.width });
        },

        stop: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options;
            if (self.ghost && self.helper) self.helper.get(0).removeChild(self.ghost.get(0));
        }

    });

    $.ui.plugin.add("resizable", "grid", {

        resize: function (event, ui) {
            var self = $(this).data("resizable"), o = self.options, cs = self.size, os = self.originalSize, op = self.originalPosition, a = self.axis, ratio = o._aspectRatio || event.shiftKey;
            o.grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
            var ox = Math.round((cs.width - os.width) / (o.grid[0] || 1)) * (o.grid[0] || 1), oy = Math.round((cs.height - os.height) / (o.grid[1] || 1)) * (o.grid[1] || 1);

            if (/^(se|s|e)$/.test(a)) {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
            }
            else if (/^(ne)$/.test(a)) {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
                self.position.top = op.top - oy;
            }
            else if (/^(sw)$/.test(a)) {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
                self.position.left = op.left - ox;
            }
            else {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
                self.position.top = op.top - oy;
                self.position.left = op.left - ox;
            }
        }

    });

    var num = function (v) {
        return parseInt(v, 10) || 0;
    };

    var isNumber = function (value) {
        return !isNaN(parseInt(value, 10));
    };

})(jQuery);



(function($){ 
$.fn.disableSelection = function() {
    return this.each(function() {           
        $(this).attr('unselectable', 'on')
               .css({
                   '-moz-user-select':'none',
                   '-webkit-user-select':'none',
                   'user-select':'none',
                   '-ms-user-select':'none'
               })
               .each(function() {
                   this.onselectstart = function() { return false; };
               });
    });
};

})(jQuery);