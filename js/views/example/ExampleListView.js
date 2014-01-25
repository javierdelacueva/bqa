var bqa = bqa || {};

(function () {
  'use strict';

  bqa.ExampleListView = Parse.View.extend({

    initialize: function () {
      this.render();
    },

    render: function () {
      var models = this.order();
      var model_name = "examples";
      var len = models.length;
      var limit = 10;
      var startPos = (this.options.page - 1) * limit;
      var endPos = Math.min(startPos + limit, len);
      var i;
      var css_class = 'sorting';
      var header_order = 'asc';
      var headers = [
        {"value": "objectId", "name": "ID"},
        {"value": "name", "name": "Name"},
        {"value": "description", "name": "Description"}
      ];

      $(this.el).html($('<table></table>')
        .addClass('table table-striped')
        .append($('<thead><tr></tr></thead>'))
      );

      for (i = 0; i < headers.length; i++) {
        css_class = 'sorting';
        header_order = 'asc';

        if (this.options.order === headers[i].value) {
          css_class = css_class + '_' + this.options.dir;
          header_order = this.options.dir === "asc" ? "desc" : "asc";
        }

        $('.table thead tr', this.el).append('<th class="' +
          css_class + '"><a href="#' +
          model_name +
          '/page/' +
          this.options.page +
          '/order/' +
          headers[i].value +
          '/dir/' +
          header_order +
          '">' +
          headers[i].name +
          '</a></th>');
      }

      for (i = startPos; i < endPos; i++) {
        $('.table', this.el).append(new bqa.ExampleListItemView({model: models[i]}).render().el);
      }
      
      $(this.el).append(new bqa.Paginator({
        model: this.model,
        page: this.options.page,
        order: this.options.order,
        dir: this.options.dir,
        url: model_name,
        limit: limit
      }).render().el);

      return this;
    },
    order: function () {
      var models = null;
      bqa.order = this.options.order;
      if (this.options.order === "objectId") {
        if (this.options.dir === "asc") {
          models = this.model.sortBy(function (m) { return m.id; });
        } else {
          models = this.model.sortBy(function (m) { return -m.id; });
        }
      } else {
        if (this.options.dir === "asc") {
          models = this.model.sortBy(function (m) { return m.get(bqa.order); });
        } else {
          models = this.model.sortBy(function (m) { return -m.get(bqa.order); });
        }
      }
      return models;
    }
  });
})();