var bqa = bqa || {};

(function () {
  'use strict';

  bqa.utils.loadTemplate(bqa.utils.getTemplates(), initApp);

  function initApp() {
    var i, routers = bqa.utils.getRouters();
    Parse.initialize(bqa.utils.getParseKeys().app_key, bqa.utils.getParseKeys().js_key);

    // Initialize routers    
    for (i = 0; i < routers.length; i++) {
      bqa[routers[i]] = new bqa[routers[i]]();
    }

    // Redirect for non logged users to login view
    Parse.history.on("route", function () {
      if (!Parse.User.current()) {
        if (this.fragment !== 'login') {
          Parse.history.navigate("/#login", true);
        }
      }
    });
    Parse.history.start();
  }
})();