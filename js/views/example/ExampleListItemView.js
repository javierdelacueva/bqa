var bqa = bqa || {};

(function () {
  'use strict';

  bqa.ExampleListItemView = Parse.View.extend({

    tagName: "tr",

    initialize: function () {
      this.model.bind("change", this.render, this);
      this.model.bind("destroy", this.close, this);
    },

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();