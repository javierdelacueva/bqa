var bqa = bqa || {};

(function () {
  'use strict';

  bqa.ExampleRouter = Parse.Router.extend({

    routes: {
      "examples"                                   : "list",
      "examples/page/:page"                        : "list",
      "examples/page/:page/order/:order"           : "list",
      "examples/page/:page/order/:order/dir/:dir"  : "list",
      "example/add"                                : "add",
      "example/:id"                                : "details"
    },

    initialize: function () {
      var nav = [
        {
          "href": "#examples",
          "nav_class": "list-menu",
          "name": "Browse",
          "icon": null
        },
        {
          "href": "#example/add",
          "nav_class": "add-menu",
          "name": "Add",
          "icon": "icon-edit icon-white"
        }
      ];

      this.headerView = new bqa.HeaderView(nav);
      $('.header').html(this.headerView.el);
    },

    list: function (page, order, dir) {
      bqa.utils.showPreloader();
      this.initialize();
      var p, o, d;
      p = page ? parseInt(page, 10) : 1;
      o = order ? order : "name";
      d = dir ? dir : "asc";
      var exampleList = new bqa.ExampleCollection();
      exampleList.fetch({cache: false, success: function () {
        $("#content").html(new bqa.ExampleListView({
          model: exampleList,
          page: p,
          order: o,
          dir: d
        }).el);
      }});
      this.headerView.selectMenuItem('list-menu');
      bqa.utils.hidePreloader();
    },

    details: function (id) {
      bqa.utils.showPreloader();
      this.initialize();
      var example = new bqa.Example({id: id});
      example.fetch({cache: false, success: function () {
        $("#content").html(new bqa.ExampleView({model: example}).el);
      }});
      this.headerView.selectMenuItem();
      bqa.utils.hidePreloader();
    },

    add: function () {
      this.initialize();
      var example = new bqa.Example();
      $('#content').html(new bqa.ExampleView({model: example}).el);
      this.headerView.selectMenuItem('add-menu');
    }
  });
})();