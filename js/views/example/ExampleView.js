var bqa = bqa || {};

(function () {
  'use strict';

  bqa.ExampleView = Parse.View.extend({

    initialize: function () {
      this.render();
    },

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    events: {
      "change"        : "_change",
      "click .save"   : "_beforeSave",
      "click .delete" : "_delete"
    },

    _change: function (event) {
      // Remove any existing alert message
      bqa.utils.hideAlert();

      // Apply the change to the model
      var target = event.target;
      var change = {};
      change[target.name] = target.value;
      this.model.set(change);

      // Run validation rule (if any) on changed item
      bqa.utils.removeValidationError(target.id);
    },

    _beforeSave: function () {
      var check = this.model.validateAll();
      if (check.isValid === false) {
        bqa.utils.displayValidationErrors(check.messages);
        return false;
      }
      this._save();
      return false;
    },

    _save: function () {
      var self = this;
      this.model.save(null, {
        success: function (model) {
          self.render();
          Parse.history.navigate("example/" + model.id, false);
          bqa.utils.showAlert('Success!', 'Item saved successfully', 'alert-success');
        },
        error: function () {
          bqa.utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
        }
      });
    },

    _delete: function () {
      this.model.destroy({
        success: function () {
          Parse.history.navigate("/#examples", true);
          bqa.utils.showAlert('Success!', 'Item deleted successfully', 'alert-success');
        },
        error: function () {
          bqa.utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
        }
      });
      return false;
    }
  });
})();