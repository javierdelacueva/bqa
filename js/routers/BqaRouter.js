var bqa = bqa || {};

(function () {
  'use strict';

  bqa.BqaRouter = Parse.Router.extend({

    routes: {
      ""          : "home",
      "login"     : "login",
      "logout"    : "logout",
      "home"      : "home",
      "help"      : "help"
    },

    initialize: function () {},

    login: function () {
      $("#content").html(new bqa.LoginView().el);
    },

    logout: function () {
      Parse.User.logOut();
      Parse.history.navigate("/#login", true);

      // restart HeaderView
      this.headerView = new bqa.HeaderView([]);
      $('.header').html(this.headerView.el);

      delete this;
    },

    home: function () {
      // restart HeaderView      
      this.headerView = new bqa.HeaderView([]);
      $('.header').html(this.headerView.el);
      $("#content").html(new bqa.HomeView().el);
    },

    help: function () {
      // restart HeaderView
      this.headerView = new bqa.HeaderView([]);
      $('.header').html(this.headerView.el);      
      $("#content").html(new bqa.HelpView().el);
    }
  });
})();