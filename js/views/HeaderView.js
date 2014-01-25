var bqa = bqa || {};

(function () {
  'use strict';

  bqa.HeaderView = Parse.View.extend({

    initialize: function (nav) {
      this.render(nav);
    },

    render: function (nav) {
      // Create values for the right menu
      var i, item, html_item, right_menu = {};
      if (Parse.User.current()) {
        var user = Parse.User.current();
        right_menu = {
          "username": user.get("username"),
          "show_right": true
        };
      } else {
        right_menu = {
          "username": "",
          "show_right": false
        };
      }

      // Render template
      $(this.el).html(this.template(right_menu));
      for (i = 0; i < nav.length; i++) {
        item = nav[i];
        html_item = $('<li></li>')
          .addClass(item.nav_class)
          .append(
            $('<a></a>')
              .attr("href", item.href)
              .append(item.name)
          );

        if (item.icon !== null) {
          $('a', html_item).prepend(
            $('<i></i>')
              .addClass(item.icon)
          );
        }
        $('.nav.pull-left', this.el).append(html_item);
      }
      return this;
    },

    selectMenuItem: function (menuItem) {
      $('.nav li').removeClass('active');
      if (menuItem) {
        $('.' + menuItem).addClass('active');
      }
    }
  });
})();