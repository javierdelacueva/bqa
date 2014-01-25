BQA
===
Backbonejs Quick App (BQA)

You can see a live example here [bqa.parseapp.com](http://bqa.parseapp.com)

And You can find the tutorial [bqa.parseapp.com/#help](http://bqa.parseapp.com/#help)

## License
Bqa is available for use under the [MIT software license](https://github.com/javierdelacueva/bqa/blob/master/LICENSE).

## Tutorial
### 1. Create a new Class
#### Model
Duplicate the file /public/js/models/example.js and rename it with the name that you want.

Example /public/js/models/other.js

Now you have to modify the code.
Change the model name:
```javascript
6. bqa.Example = bqa.BqaModel.extend("Example", {
```
for
```javascript
6. bqa.Other = bqa.BqaModel.extend("Other", {
```
Change the collection:
```javascript
54. bqa.ExampleCollection = bqa.BqaCollection.extend({
55.   model: "Example"
56. });
```
for
```javascript
54. bqa.OtherCollection = bqa.BqaCollection.extend({
55.   model: "Other"
56. });
```
And finally, add columns to your model using the default parameter:
```javascript
23. defaults: {
24.   objectId: null,
25.   name: "",
26.   description: ""
27. }
```
#### Router
You can use just one router or several routers if you want to organize better your code. Just be careful and don't use the same path in different routers.

If you want to create a new router, duplicate the file /public/js/routers/ExampleRouter.js.

Example: /public/js/routers/OtherRouter.js

Once your router has been created, change the class name:
```javascript
6. bqa.ExampleRouter = Parse.Router.extend({
```
for
```javascript
6. bqa.OtherRouter = Parse.Router.extend({
```
Now you have to add your routes, here are created the basic routes for the CRUD, including add, edit, list and pagination.

Change the code below:
```javascript
8.  routes: {
9.   "examples"                                   : "list",
10.  "examples/page/:page"                        : "list",
11.  "examples/page/:page/order/:order"           : "list",
12.  "examples/page/:page/order/:order/dir/:dir"  : "list",
13.  "example/add"                                : "add",
14.  "example/:id"                                : "details"
15. },
```
for
```javascript
8.  routes: {
9.   "others"                                   : "list",
10.  "others/page/:page"                        : "list",
11.  "others/page/:page/order/:order"           : "list",
12.  "others/page/:page/order/:order/dir/:dir"  : "list",
13.  "other/add"                                : "add",
14.  "other/:id"                                : "details"
15. },
```
Then, you have to modify the header initialization. Change this:
```javascript
20. "href": "#examples",
...
26. "href": "#example/add",
```
for this:
```javascript
20. "href": "#others",
...
26. "href": "#other/add",
```
Finally we have to change the basic methods list, details and add.
**list**

Change this:
```javascript
...
44. var exmpleList = new bqa.ExmpleCollection();
45. exmpleList.fetch({cache: false, success: function () {
46.  $("#content").html(new bqa.ExmpleListView({
47.   model: exmpleList,
...
```
with this:
```javascript
...
44. var otherList = new bqa.OtherCollection();
45. otherList.fetch({cache: false, success: function () {
46.  $("#content").html(new bqa.OtherListView({
47.   model: otherList,
...
```
**details**

Change this:
```javascript
...
60. var example = new bqa.Example({id: id});
61. example.fetch({cache: false, success: function () {
62.  $("#content").html(new bqa.ExampleView({model: example}).el);
63. }});
...
```
with this:
```javascript
...	
60. var other = new bqa.Other({id: id});
61. other.fetch({cache: false, success: function () {
62.  $("#content").html(new bqa.OtherView({model: other}).el);
63. }});
...
```
**add**

Change this:
```javascript
...	
70. var example = new bqa.Example();
71. $('#content').html(new bqa.ExampleView({model: example}).el);
...
```
with this:
```javascript
...
70. var other = new bqa.Other();
71. $('#content').html(new bqa.OtherView({model: other}).el);
...
```
#### View

You can use as many views as you need, for this basic App we have just 3. One for show the details and two for build the list of items with its pagination.

Let's duplicate these three files and rename them:

**Original files:**
* /public/js/views/example/ExampleListItemView.js
* /public/js/views/example/ExampleListView.js
* /public/js/views/example/ExampleView.js

**New files:**
* /public/js/views/other/OtherListItemView.js
* /public/js/views/other/OtherListView.js
* /public/js/views/other/OtherView.js

And now, we can modify the files.

**OtherListItemView.js**

Change the class name:
```javascript
6. bqa.ExampleListItemView = Parse.View.extend({
```
with this:
```javascript
6. bqa.OtherListItemView = Parse.View.extend({
```
**OtherListView.js**

Change the class name:
```javascript
6. bqa.ExampleListView = Parse.View.extend({
```
with this:
```javascript
6. bqa.OtherListView = Parse.View.extend({
```
Then, we'll add the class name to generate the URLs changing this:
```javascript
14. var model_name = "examples";
```
with this:
```javascript
14. var model_name = "others";
```
We have to modify the headers array which it'll display the headers of the list. We are going to use as many headers as rows we have in our class, but you can use as many headers as you want:
```javascript
22. var headers = [
23.  {"value": "objectId", "name": "ID"},
24.  {"value": "name", "name": "Name"},
25.  {"value": "description", "name": "Description"}
26. ];
```
And finally we change the call we use to display all the rows of our list:
```javascript
...
56. for (i = startPos; i < endPos; i++) {
57.  $('.table', this.el).append(new bqa.ExampleListItemView({model: models[i]}).render().el);
58. }
...
```
with this:
```javascript
...
56. for (i = startPos; i < endPos; i++) {
57.  $('.table', this.el).append(new bqa.OtherListItemView({model: models[i]}).render().el);
58. }
...
```
**OtherView.js**

First we have to change the class name:
```javascript
6. bqa.ExampleView = Parse.View.extend({
```
with this:
```javascript
6. bqa.OtherView = Parse.View.extend({
```
And then, we change the url for redirection:
```javascript
...
52. Parse.history.navigate("example/" + model.id, false);
...
64. Parse.history.navigate("/#examples", true);
...
```
with this:
```javascript
...
52. Parse.history.navigate("other/" + model.id, false);
...
64. Parse.history.navigate("/#others", true);
...
```
### 2. Templates
Now, we have to make some small modifications in our templates. In this example we have only two templates: ExampleListItemView.html and ExampleView.html.

First, we have to duplicate files:

**Original files:**
* /public/tpl/example/ExampleListItemView.html
* /public/tpl/example/ExampleView.html

**New files:**
* /public/tpl/other/OtherListItemView.html
* /public/tpl/other/OtherView.html

And now we can start modifying files.

**OtherListItemView.html**

We use this template to display row's content inside the list. Just modify the url and add the columns of the class that you want to display.
```html
  <td><a href="#example/<%= objectId %>"><%= objectId %></a></td>
  <td><%= name %></td>
  <td><%= description %></td>	
```
**OtherView.html**
We have to modify the label's attribute "for" and use the same name that we'll use in the input's attribute "id". We'll use model's name for instance.
```html
  <div class="control-group">
    <label for="exampleId" class="control-label">Id:</label>

    <div class="controls">
      <input id="exampleId" name="id" type="text" value="<%= objectId === null ? '' : objectId %>" disabled/>
    </div>
  </div>
```
And display your values.
```html
  <div class="control-group">
    <label for="name" class="control-label">Name:</label>

    <div class="controls">
      <input type="text" id="name" name="name" value="<%= name %>"/>
      <span class="help-inline"></span>
  	</div>
  </div>	
```
### 3. Modify config files
Once you have created your new files, you have to modify just two more files and you'll good to go.

**require.js**

This is the first file which is loaded and it'll load the rest of the javascript files. It starts loading the external libraries, then config and b>utils files and finally, the rest of the javascript files from your App.
```javascript
  var scripts = [
    "libs/jquery-1.8.2.min",
    "libs/underscore-min",
    "libs/backbone-min",
    "libs/bootstrap.min",
    "http://www.parsecdn.com/js/parse-1.2.13.min",
    "config",
    "js/utils/utils",
    "js/models/example",
    "js/models/other",
    "js/views/example/ExampleListItemView",
    "js/views/example/ExampleListView",
    "js/views/example/ExampleView",
    "js/views/other/OtherListItemView",
    "js/views/other/OtherListView",
    "js/views/other/OtherView",    
    "js/views/bqa/LoginView",
    "js/views/bqa/HomeView",
    "js/views/bqa/HelpView",
    "js/views/Paginator",
    "js/views/HeaderView",
    "js/routers/ExampleRouter",
    "js/routers/OtherRouter",
    "js/routers/BqaRouter",
    "js/main"
  ];
```
**config.js**

This is the last file that you will have to modify. This is the config file and we use it to dinamically load all templates, initializes routers and your Parse keys.
```javascript
bqa.initialConfig = {
  parse: {
    'app_key' : 'YOUR PARSE APP KEY',
    'js_key' : 'YOUR PARSE JAVASCRIPT KEY'
  },
  templates: {
    'example' : ['ExampleListItemView', 'ExampleView'],
    'other' : ['OtherListItemView', 'OtherView'],
    'bqa' : ['LoginView', 'HomeView', 'HelpView'],
    'layouts' : ['HeaderView']
  },
  routers: [
    'BqaRouter',
    'ExampleRouter',
    'OtherRouter'
  ]
};	
```
### 4. Models with relation
Under construction

### 5. Configure the Header
In this example we've created a header divided in two parts: pull-left and pull-right.

**pull-left**
The first part is displayed in the center of the header, just after the home link. We'll use it to display specific action from a particular view, for instance, "Add" and "List" buttons.

**pull-right**
Here we display global actions as "Login" button or "Help" button.

In order to set up which actions you want to display in the "pull-left" bar you have to call "new bqa.HeaderView(nav)" and fill the correct parameters. You can find an example at /public/js/routers/ExampleRouter.js.

These are the possible parameters:

* **href**: The link to redirect when click the button.
* **nav_class**: Class for the button, by default will be "list-menu".
* **name**: The name that it'll be displayed.
* **icon**: You can display an icon, add the name of the class or leave it "null" if you don't want to show any icon.

```javascript
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
```
### 6. Use validators
You can use validators in your models, you just have to add them to the initialize function. You can find an example at /public/js/models/example.js.
```javascript
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
```
### 7. Icons
We are using [bootstrap](http://getbootstrap.com/) to render the CSS style and the responsive design and [Font Awesome](http://fontawesome.io/) for icons. Go to the [icons section](http://fontawesome.io/) to see all icons you can use.

### 8. Roles in Parse
After create all your classes is recommendable to add permissions to them. In Parse you can create a "Role", let's say an "Admin role" and allow only to this role access to your classes.

The first thing to do would be create a new user and make him Admin of your App.

Here is the code:
```javascript
// Create a role
function createRole() {
  var roleACL = new Parse.ACL();
  roleACL.setWriteAccess(Parse.User.current(), true);
  roleACL.setPublicReadAccess(true);
  var role = new Parse.Role("Administrator", roleACL);
  role.getUsers().add(Parse.User.current());

  role.save(null, {
    success: function(saveObject) {
      // The object was saved successfully.
      alert('role creation done');
    },
    error: function(saveObject, error) {
      // The save failed.
      alert("Failed creating role with error: " + error.code + ":"+ error.message);
    }
  });
}
```
```javascript
// Update a role
function updateRole (user) {
  var query = new Parse.Query(Parse.Role);
  query.equalTo("name", "Administrator");

  query.get(null, {
    success: function(returnObj) {
      alert("found role: "+ returnObj.id + ' '+returnObj.get("name"));
      returnObj.getUsers().add(user);
      updateRoleACL(returnObj);
    },
    error: function(returnObj, error) {
      window.alert("Failed with error: " + error.code + ":"+ error.message);
    }
  });
}

function updateRoleACL(role) {
  var roleACL = role.getACL();
  roleACL.setWriteAccess(Parse.User.current(), false);
  roleACL.setRoleWriteAccess(role,true);
  role.save(null, {
    success: function(saveObject) {
      // The object was saved successfully.
      alert('role acl updated');
    },
    error: function(saveObject, error) {
      // The save failed.
      alert("Failed updating role with error: " + error.code + ":"+ error.message);
    }
  });
}
```
### 9. Libraries
This App it's based on the following libraries:

* [jquery](http://jquery.com/)
* [underscore](http://underscorejs.org/)
* [backbone](http://backbonejs.org/)
* [bootstrap](http://getbootstrap.com/)
* [Parse](https://parse.com/)

###10. Referers
[Christophe Coenraets](http://coenraets.org/blog/)

He has such good tutorials that is totally recommended take a look into his page.

Most part of this code is from his post [Single-Page CRUD Application with Backbone.js and Twitter Bootstrap](http://coenraets.org/blog/2012/05/single-page-crud-application-with-backbone-js-and-twitter-bootstrap/)

And this [tutorial](https://parse.com/tutorials/todo-app-with-javascript) is for understand how to create a Parse App with Backbone base in the canonical Backbone todo application

### 11. Contact
* [javierdelacueva.com](http://javierdelacueva.com/)
* [Facebook](https://www.facebook.com/javierdelacuevaorts)
* [Twitter](https://twitter.com/javierdelacueva)
* [LinkedIn](http://www.linkedin.com/in/javierdelacueva)
* [Github](https://github.com/javierdelacueva)
