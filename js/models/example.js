var bqa = bqa || {};

(function () {
  'use strict';

  bqa.Example = Parse.Object.extend("Example", {
    initialize: function () {
      this.validators = {};

      this.validators.name = function (value) {
        return value.length > 0
          ? {isValid: true}
          : {isValid: false, message: "You must enter a name"};
      };

      this.validators.description = function (value) {
        return value.length > 0
          ? {isValid: true}
          : {isValid: false, message: "You must enter a description"};
      };
    },

    validateItem: function (key) {
      return (this.validators[key])
        ? this.validators[key](this.get(key))
        : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
      var messages = {}, key, check;

      for (key in this.validators) {
        if (this.validators.hasOwnProperty(key)) {
          check = this.validators[key](this.get(key));
          if (check.isValid === false) {
            messages[key] = check.message;
          }
        }
      }

      return _.size(messages) > 0
        ? {isValid: false, messages: messages}
        : {isValid: true};
    },

    defaults: {
      objectId: null,
      name: "",
      description: ""
    }
  });

  bqa.ExampleCollection = Parse.Collection.extend({
    model: "Example"
  });
})();