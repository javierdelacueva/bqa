var bqa = bqa || {};

(function () {
  'use strict';

  bqa.HelpView = Parse.View.extend({
    events: {},

    initialize: function () {
			this.render();
    },

    render: function () {
      $(this.el).html(this.template());
    }
	});
})();