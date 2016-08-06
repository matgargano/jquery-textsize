/*
 *  text-size - v0.1.0
 *  Simple text size + / -
 *  https://github.com/matgargano
 *
 *  Made by Mat Gargano
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

    "use strict";

    var pluginName = "textsize",
        defaults = {
            tickIncrement: 3,
            ceiling: 20,
            floor: 10,
            appendElement: ".text-size-container",
            appendContainer: true,
            smallerClass: "text-size__smaller",
            largerClass: "text-size__larger",
            prependText: "Text Size ",
            unit: "px",
            smallerText: "-",
            largerText: "+"

        };

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }


    $.extend(Plugin.prototype, {
        init: function () {

            this.$appendElement = $(this.settings.appendElement);
            this.$element = $(this.element);
            this.createContainer();
            this.addEvents();


        },
        createContainer: function () {
            var $container = $("<div>").addClass("text-size"),
                $larger = $("<a>").attr("href", "#").addClass(this.settings.largerClass).append(this.settings.largerText),
                $smaller = $("<a>").attr("href", "#").addClass(this.settings.smallerClass).append(this.settings.smallerText);
            $container.append(this.settings.prependText).append($larger).append($smaller);
            this.$appendElement.append($container);


        },
        tick: function (direction) {


            this.setCurrentFontSize();
            var newFontSize = this.currentFontSize + this.settings.tickIncrement * direction;

            if ((direction >= 0 && newFontSize < this.settings.ceiling) ||
                (direction < 0 && newFontSize >= this.settings.floor)) {

                this.$element.css("font-size", newFontSize + this.settings.unit);
            }
        },
        addEvents: function () {
            this.$appendElement.on("click", "." + this.settings.smallerClass, function (e) {
                e.preventDefault();
                this.tick(-1);
            }.bind(this));
            this.$appendElement.on("click", "." + this.settings.largerClass, function (e) {
                e.preventDefault();
                this.tick(1);
            }.bind(this));
        },
        setCurrentFontSize: function () {
            this.currentFontSize = parseInt(this.$element.css("font-size"), 10);
        }


    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

jQuery(document).ready(function () {
    jQuery(".text-resize-content").textsize();
});
