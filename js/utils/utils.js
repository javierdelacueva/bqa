var bqa = bqa || {};

(function () {
  'use strict';

  bqa.utils = {
    // Asynchronously load templates located in separate .html files
    loadTemplate: function (paths, callback) {
      var deferreds = [];
      $.each(paths, function (model, views) {
        $.each(views, function (index, view) {
          if (bqa[view]) {
            deferreds.push($.get('tpl/' + model + "/" + view + '.html', function (data) {
              bqa[view].prototype.template = _.template(data);
            }));
          } else {
            console.log(view + " not found");
          }
        });
      });

      $.when.apply(null, deferreds).done(callback);
    },

    displayValidationErrors: function (messages) {
      var key;
      for (key in messages) {
        if (messages.hasOwnProperty(key)) {
          this.addValidationError(key, messages[key]);
        }
      }
      this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },

    addValidationError: function (field, message) {
      var controlGroup = $('#' + field).parent().parent();
      controlGroup.addClass('error');
      $('.help-inline', controlGroup).html(message);
    },

    removeValidationError: function (field) {
      var controlGroup = $('#' + field).parent().parent();
      controlGroup.removeClass('error');
      $('.help-inline', controlGroup).html('');
    },

    showAlert: function (title, text, klass) {
      $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
      $('.alert').addClass(klass);
      $('.alert').html('<strong>' + title + '</strong> ' + text);
      $('.alert').show();
    },

    hideAlert: function () {
      $('.alert').hide();
    },

    getTemplates: function () {
      return (bqa.initialConfig.templates);
    },

    getRouters: function () {
      return (bqa.initialConfig.routers);
    },

    getParseKeys: function () {
      return (bqa.initialConfig.parse);
    },
    showPreloader: function () {
      $("#preloader").modal("show");
    },
    hidePreloader: function () {
      $("#preloader").modal("hide");
    }
  };
})();