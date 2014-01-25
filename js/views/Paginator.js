var bqa = bqa || {};

(function () {
  'use strict';

  bqa.Paginator = Parse.View.extend({

    className: "pagination pagination-centered",

    initialize: function () {
      this.model.bind("reset", this.render, this);
      this.render();
    },

    render: function () {
      var i;
      var url = (this.options.url || "");
      var limit = (this.options.limit || 10);
      var items = this.model.models;
      var len = items.length;
      var pageCount = Math.ceil(len / limit);

      $(this.el).html('<ul />');

      for (i = 0; i < pageCount; i++) {
        $('ul', this.el).append(
          "<li" + ((i + 1) === this.options.page ? " class='active'" : "") +
            "><a href='#" +
            url +
            "/page/" +
            (i + 1) +
            "/order/" +
            this.options.order +
            "/dir/" +
            this.options.dir +
            "'>" +
            (i + 1) +
            "</a></li>"
        );
      }
      return this;
    }
  });
})();