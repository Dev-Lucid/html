# dev-lucid/html
A library for building HTML. 

## Basic Usage

```javascript
# in Javascript!
var factory = new lucid.html.factory();
var myAnchor = factory.build('anchor', 'http://google.com', 'google');
console.log(myAnchor.render());
```

```php
# in PHP!
# (this assumes you've configured an autoloader to find this class)
$factory = new \Lucid\Html\Factory();
$myAnchor = $factory->build('anchor', 'http://google.com', 'google');
echo($myAnchor->render());
```

Both of these code samples will log/echo this: 

```html
<a href="http://google.com">google</a>
```


## Building and Testing

### Building all tags and running tests

There's one main script that does pretty much everything you'll need to do to change the source, package it up, and test it:

```sh
bin/make
```

This does the following:

1. Builds all tags (See sections below)
2. Packages up all Javascript files (See sections below)
3. Loads the final javascript files in node just to do one final syntax check
4. Runs all unit tests

This library uses [phpunit](https://phpunit.de) to run unit tests, but additionally runs javascript tests through phpunit by calling [node.js](https://nodejs.org/en/) through shell_exec. So in order to run unit tests, you must [install node](https://docs.npmjs.com/getting-started/installing-node). You will also have to use composer before running tests as the tests use composer's autoloader. 

### Building Tags

Every tag in the library is generated using a json file that describes the tag. To generate the javascript tag for the base anchor tag,

```sh
bin/makeTagJavascript.php ./src/Base/meta/anchor.json
 # This will generate ./src/Base/tags/anchor.js
```


To generate the PHP tag for the base anchor tag, 

```sh
bin/makeTagPHP.php ./src/Base/meta/anchor.json
 # This will generate ./src/Base/tags/anchor.php
```

To build *all* tags in a meta folder:

```sh
bin/makeAllTags ./src/Base/meta
 # this builds everything!
```
### Packing up Javascript files for distribution

```sh
bin/makeJsDist.php
```

This will generate four files:

1. ./dist/lucid.html.buildBaseTagsOnly.js
2. ./dist/lucid.html.buildBaseTagsOnly.min.js (this is the same as the previous file, but minified)
3. ./dist/lucid.html.buildBootstrap.js
4. ./dist/lucid.html.buildBootstrap.min.js (this is the same as the previous file, but minified)

In a project, only one of those 4 files needs to be included.

