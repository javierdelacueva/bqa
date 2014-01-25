var bqa = bqa || {};

(function () {
  'use strict';

  bqa.LoginView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "submit form.signup-form": "signUp"
    },

    initialize: function () {
      var currentUser = Parse.User.current();
      if (currentUser) {
        Parse.history.navigate("/#home", true);

        // restart HeaderView
        this.headerView = new HeaderView([]);
        $('.header').html(this.headerView.el);

        throw true;
      } else {
        // show the signup or login page
        _.bindAll(this, "logIn", "signUp");
        this.render();
      }
    },

    logIn: function (e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();

      Parse.User.logIn(username, password, {
        success: function (user) {
          self.undelegateEvents();
          Parse.history.navigate("/#home", true);

          // restart HeaderView
          this.headerView = new HeaderView([]);
          $('.header').html(this.headerView.el);
        },

        error: function (user, error) {
          self.$(".login-form .error").html(
            "Invalid username or password. Please try again."
          ).show();
          this.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    signUp: function (e) {
      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();

      Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
        success: function(user) {
          self.undelegateEvents();
          Parse.history.navigate("/#home", true);
            
          // restart HeaderView
          this.headerView = new HeaderView([]);
          $('.header').html(this.headerView.el);
        },

        error: function (user, error) {
          self.$(".signup-form .error").html(error.message).show();
          this.$(".signup-form button").removeAttr("disabled");
        }
      });

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
    },

    render: function () {
      $(this.el).html(this.template());
      this.delegateEvents();
    }
  });
})();