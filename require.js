window.onload = function () {
  var scripts = [
    "libs/jquery-1.8.2.min",
    "libs/underscore-min",
    "libs/backbone-min",
    "libs/bootstrap.min",
    "http://www.parsecdn.com/js/parse-1.2.13.min",
    "config",
    "js/utils/utils",
    "js/models/example",
    "js/views/example/ExampleListItemView",
    "js/views/example/ExampleListView",
    "js/views/example/ExampleView",
    "js/views/bqa/LoginView",
    "js/views/bqa/HomeView",
    "js/views/bqa/HelpView",
    "js/views/Paginator",
    "js/views/HeaderView",
    "js/routers/ExampleRouter",    
    "js/routers/BqaRouter",
    "js/main"
  ];

  loadScript(scripts);
}

function loadScript (scripts) {
  if (scripts.length > 0) {
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
            script.onreadystatechange = null;
            setScript(scripts);
        }
      };
    } else {  //Others
      script.onload = function(){
        setScript(scripts);
      };
    }
    script.src = scripts[0]+".js";
    document.getElementsByTagName("head")[0].appendChild(script);                    
  }
}

function setScript (scripts) {
  scripts.splice(0, 1);
  loadScript(scripts);
}