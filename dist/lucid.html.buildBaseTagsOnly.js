
/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.js */
if (typeof lucid == 'undefined') {
    var lucid = {};
}
lucid.html = {};
lucid.html.exception = {};

/* File end: /Volumes/Lucid/html/bin/../src/lucid.html.js */

/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.factory.js */

lucid.html.factory=function(){
    this.hooks = {};
    this.defaults = {};
    this.hooks.javascript = function(jsToRun) {
        return eval(jsToRun);
    };
};

lucid.html.factory.prototype.addDefaults=function(instantiatorName, settings){
    if (typeof(this.defaults[instantiatorName]) == 'undefined') {
        this.defaults[instantiatorName] = {};
    }
    for (var key in settings) {
        this.defaults[instantiatorName][key] = settings[key];
    }
    return this;
};

lucid.html.factory.prototype.addHook=function(tags, action, callable){
    for (var i=0; i<tags.length; i++) {
        if (typeof(this.hooks[tags[i]+'__'+action]) != 'object') {
            this.hooks[tags[i]+'__'+action] = [];
        }
        this.hooks[tags[i]+'__'+action].push(callable);
    }
};

lucid.html.factory.prototype.setJavascriptHook=function(callable){
    this.hooks.javascript = callable;
};

lucid.html.factory.prototype.javascript=function(jsToRun) {
    return this.hooks.javascript(jsToRun);
};

lucid.html.factory.prototype.callHooks=function(tag, action)
{
    if (typeof(this.hooks[tag.instantiatorName+'__'+action]) == 'object') {
        for (var i=0; i<this.hooks[tag.instantiatorName+'__'+action].length; i++) {
            this.hooks[tag.instantiatorName+'__'+action][i](tag);
        }
    }
};

lucid.html.factory.prototype.build=function(tag){
    var obj;
    if (typeof(lucid.html.factory.tags[tag]) == 'function'){
        obj = new lucid.html.factory.tags[tag](this, tag);
    } else {
        obj = new lucid.html.tag(this, tag);
        obj.tag = tag;
    }
    
    if (typeof(this.defaults[tag]) == 'object') {
        for (var key in this.defaults[tag]) {
            obj.set(key, this.defaults[tag][key]);
        }
    }
    
    var newArgs = [];
    for (var i=1; i<arguments.length; i++) {
        newArgs.push(arguments[i]);
    }
    obj.setProperties(newArgs);
    
    
    this.callHooks(obj, 'create');
    return obj;
};

lucid.html.factory.tags = {};

/* File end: /Volumes/Lucid/html/bin/../src/lucid.html.factory.js */

/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.tag.js */
lucid.html.tag = function(factory, instantiatorName){
    this.factory = factory;
    this.instantiatorName = instantiatorName;

    this.tag = null;
    this.attributes = {};

    // From here: http://www.w3schools.com/tags/ref_standardattributes.asp
    this.allowedAttributes = ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate'];
    this.parameters = ['child'];
    this.allowChildren   = true;
    this.allowQuickClose = false;
    this.children = [];
    this.parent   = null;
    this.preHtml  = '';
    this.postHtml = '';
    this.preChildrenHtml  = '';
    this.postChildrenHtml = '';
};

lucid.html.tag.prototype.checkValidChild=function(child){
    return true;
};


// sort of a compatibility hack for php traits
lucid.html.tag.prototype.addTrait=function(newTrait){
    var callTraitInit = false;
    if (typeof(newTrait.traitInit) == 'function') {
        callTraitInit = true;
    }
    for(var key in newTrait) {
        this[key] = newTrait[key];
    }
    if (callTraitInit === true) {
        this.traitInit();
    }
    
    return this;
};

lucid.html.tag.prototype.build=function(){
    var args = [];
    for(var i=0; i<arguments.length; i++){
        args.push(arguments[i]);
    }
    var result = this.factory.build.apply(this.factory, args);
    return result;
};

lucid.html.tag.prototype.queryChildren=function(selector, recurse, tag, results) {
    if (typeof(recurse) == 'undefined') {
        recurse = true;
    }
    if (typeof(tag) == 'undefined') {
        tag = this;
    }
    if (typeof(results) == 'undefined') {
        results = [];
    }
    for (var i=0; i<tag.children.length; i++) {
        if (typeof(tag.children[i]) == 'object') {
            if (selector.test(tag.children[i]) === true) {
                results.push(tag.children[i]);
            }
            if (recurse === true) {
                results = this.queryChildren(selector, recurse, tag.children[i], results);
            }
        }
    }
    return results;
};

lucid.html.tag.prototype.queryParents=function(selector, recurse, tag, results) {
    if (typeof(recurse) == 'undefined') {
        recurse = true;
    }
    if (typeof(tag) == 'undefined') {
        tag = this;
    }
    if (typeof(results) == 'undefined') {
        results = [];
    }
    var parent = tag.getParent();
    if (parent !== null) {
        if (selector.test(parent) === true) {
            results.push(parent);
        }
        if (recurse === true) {
            results = this.queryParents(selector, recurse, parent, results);
        }
    }
    return results;
};

lucid.html.tag.prototype.setProperties=function(params) {
    for (var i=0;  i<params.length; i++) {
        var property = (i < this.parameters.length)?this.parameters[i]:'child';

        if (property == 'child') {
            this.add(params[i]);
        } else {
            this.set(property, params[i]);
        }
    }
    return this;
};

lucid.html.tag.prototype.requireProperties=function(traitName, names) {
    for(var name in names) {
        // http://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
        if (Number(parseFloat(name)) == name) {
            name = names[name];
            var description = '';
        } else {
            var description = names[name];
        }
        //console.log('checking for property '+name+': '+typeof(this[name]));
        if (typeof(this[name]) == 'undefined') {
            throw new lucid.html.exception.MissingRequiredProperty(this.instantiatorName, traitName, name, description);
        }
    }
};

lucid.html.tag.prototype.attributeAllowed=function(name){
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    return (typeof(this['set'+key]) == 'function' || this.parameters.indexOf(name) >= 0 || this.allowedAttributes.indexOf(name) >= 0 || typeof(this[name]) != 'undefined');
};

lucid.html.tag.prototype.set=function(name, value) {
    if (this.attributeAllowed(name) === false) {
        throw new lucid.html.exception.InvalidAttribute(this.instantiatorName, name, this.allowedAttributes);
    }
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    if (typeof(this['set'+key]) == 'function') {
        this['set'+key](value);
    } else {
        if (typeof(this[name]) == 'undefined') {
            this.attributes[name] = value;
        } else {
            this[name] = value;
        }
    }
    return this;
};

lucid.html.tag.prototype.setParent=function(parent){
    this.parent = parent;
    return this;
};

lucid.html.tag.prototype.getParent=function(){
    return this.parent;
};

lucid.html.tag.prototype.getTag=function(){
    return this.tag;
};

lucid.html.tag.prototype.get=function(name){
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    if (typeof(this['get'+key]) == 'function') {
        return this['get'+key]();
    } else {
        if (typeof(this[name]) == 'undefined') {
            if (typeof(this.attributes[name]) !== 'undefined') {
                return this.attributes[name];
            }
        } else {
            return this[name];
        }
        return null;
    }
};

lucid.html.tag.prototype.init=function(){
};

lucid.html.tag.prototype.render=function(){
    var html = '';
    html += this.preRender();
    html += this.preHtml;
    html += this.renderTagStart();
    html += this.preChildren();
    html += this.preChildrenHtml;
    html += this.renderChildren();
    html += this.postChildrenHtml;
    html += this.postChildren();
    html += this.renderTagEnd();
    html += this.postHtml;
    html += this.postRender();
    return html;
};

lucid.html.tag.prototype.preRender=function(){
    return '';
};

lucid.html.tag.prototype.postRender=function(){
    return '';
};

lucid.html.tag.prototype.preChildren=function(){
    return '';
};

lucid.html.tag.prototype.postChildren=function(){
    return '';
};


lucid.html.tag.prototype.renderChildren=function(whichList){
    var html = '';
    if (arguments.length < 1) {
        whichList = 'children';
    }
    for(var i=0; i<this[whichList].length; i++){
        if (typeof(this[whichList][i]) == 'object') {
            html += this[whichList][i].render();
        } else {
            html += this[whichList][i];
        }
    }
    return html;
};

lucid.html.tag.prototype.add=function(child){
    if (this.setupChild(child, 'add') === true) {
        this.children.push(child);
    }
    return this;
};

lucid.html.tag.prototype.prepend=function(child){
    if (this.setupChild(child, 'prepend') === true) {
        this.children.unshift(child);
    }
    return this;
};

lucid.html.tag.prototype.addTo=function(parent){
    parent.add(this);
    return this;
};

lucid.html.tag.prototype.prependTo=function(parent){
    parent.prepend(this);
    return this;
};

lucid.html.tag.prototype.setupChild=function(child, action){
    if (typeof(action) == 'undefined') {
        action = 'add';
    }
    if (this.allowChildren === false) {
        throw new lucid.html.exception.ChildrenNotAllowed(this.instantiatorName);
    }

    if ((child instanceof Array) === true) {
        for (var i=0; i<child.length; i++) {
            this[action](child[i]);
        }
        return false;
    } else if (typeof(child) == 'object') {
        this.checkValidChild(child);
        child.setParent(this);
    }
    return true;
};

lucid.html.tag.prototype.parent = function() {
    return this.parent;
};

lucid.html.tag.prototype.firstChild = function() {
    return (this.children.length === 0)?null:this.children[0];
};

lucid.html.tag.prototype.lastChild=function() {
    return this.children[this.children.length - 1];
};

lucid.html.tag.prototype.renderTagStart=function(){
    var html = '<'+this.tag;
    for(var key in this.attributes) {
        if (key != 'class') {
            renderMethod = 'render'+String(key).charAt(0).toUpperCase() + String(key).slice(1);
            if (typeof(this[renderMethod]) == 'function') {
                value = this[renderMethod]();
            } else {
                value = this.attributes[key];
            }
            if (typeof(value) != 'undefined' && value !== null) {
                html += ' ' + String(key).replace('_', '-')+'="'+value+'"';
            }
        }
    }

    if (typeof(this.attributes.class) == 'object') {
        var classValue = this.renderClass();
        if (classValue !== '') {
            html += ' class="'+String(classValue)+'"';
        }
    }

    if (this.allowQuickClose === true && this.children.length === 0) {
        return html += ' />';
    }

    return html+'>';
};

lucid.html.tag.prototype.renderTagEnd=function(){
    if (this.allowQuickClose === true && this.children.length === 0) {
        return '';
    }
    return '</'+this.tag+'>';
};

lucid.html.tag.prototype.paragraph=function(text){
    if (this.allowChildren === false) {
        throw 'Class '+this.tag+' does not support .paragraph() because this class does not support having children.';
    }
    this.add(lucid.html.build('p', text));
    return this;
};

lucid.html.tag.prototype.setClass=function(newClass){
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
    }
    this.attributes['class'].push(newClass);
    return this;
};

lucid.html.tag.prototype.renderClass=function() {
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
    }
    return ''+this.attributes['class'].join(' ');
};

lucid.html.tag.prototype.hasClass=function(classToCheck) {
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
        return false;
    }
    return (this.attributes['class'].indexOf(classToCheck) >= 0);
};

lucid.html.tag.prototype.addClass=function(classToAdd) {
    if(this.hasClass(classToAdd) === false) {
        this.attributes['class'].push(classToAdd);
    }
    return this;
};

lucid.html.tag.prototype.removeClass=function(classToRemove) {
    if (this.hasClass(classToRemove) === true){
        var newClasses = [];
        for(var i=0; i<this.attributes['class'].length; i++){
            if (this.attributes['class'][i] != classToRemove) {
                newClasses.push(this.attributes['class'][i] );
            }
        }
        this.attributes['class'] = newClasses;
    }

    return this;
};

lucid.html.tag.prototype.toggleClass=function(classToToggle, newState) {
    if(typeof(newState) == 'undefined' || newState === null){
        if (this.hasClass(classToToggle) === true) {
            this.removeClass(classToToggle);
        } else {
            this.addClass(classToToggle);
        }
    } else {
        if(newState === true) {
            this.addClass(classToToggle);
        } else {
            this.removeClass(classToToggle);
        }
    }
    return this;
};


lucid.html.tag.prototype.setStyle=function(newStyle) {
    if (typeof(this.attributes.style) != 'object') {
        this.attributes.style = {};
    }

    newStyleList = explode(';', trim(newStyle));
    for (var i=0; i<newStyleList.length; i++) {
        if (newStyleList[i] !== '') {
            var styleParts = String(newStyleList[i]).split(':');
            this.attributes.style[String(styleParts[0]).toLowerCase()] = String(styleParts[1]);
        }
    }
    return this;
};

lucid.html.tag.prototype.renderStyle=function() {
    var css = '';
    for (var key in this.attributes.style) {
        if (this.attributes.style[key] !== null) {
            css += key+':'+this.attributes.style[key];
        }
    }
    return css;
};

lucid.html.tag.prototype.setHidden=function(val) {
    if (val !== true && val !== false) {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'hidden', val, ['true', 'false']);
    }
    this.attributes.hidden = val;
    return this;
};

lucid.html.tag.prototype.renderHidden=function() {
    var val = (this.attributes.hidden === true)?'hidden':null;
    return val;
};
/* File end: /Volumes/Lucid/html/bin/../src/lucid.html.tag.js */

/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.Selector.js */
lucid.html.Selector=function(pattern){
    this.class = null;
    this.tag   = null;
    this.attributeName  = null;
    this.attributeValue = null;
    
    if (typeof(pattern) == 'string') {
        pattern = pattern.split('.');
        if (pattern.length > 1) {
            this.class = pattern.pop();
        } 
        pattern = pattern[0];
        
        pattern = pattern.split('[');
        if (pattern.length > 1) {
            var attr = String(pattern[1]).replace(']', '').split('=');
            this.attributeName  = attr[0];
            this.attributeValue = attr[1];
        }
        pattern = pattern[0];
        
        if (pattern !== '') {
            this.tag = pattern;
        }
    }
};

lucid.html.Selector.prototype.matchTag=function(tagToMatch){
    this.tag = tagToMatch;
    return this;
};

lucid.html.Selector.prototype.matchClass=function(classToMatch){
    this.class = classToMatch;
    return this;
};

lucid.html.Selector.prototype.matchAttribute=function(attributeName, attributeValue){
    this.attributeName  = attributeName;
    this.attributeValue = attributeValue;
    return this;
};

lucid.html.Selector.prototype.test=function(tagToTest) {
    var matches = true;
    if (this.tag !== null) {
        if (this.tag != tagToTest.getTag()) {
            matches = false;
        }
    }
    if (this.class !== null) {
        if (tagToTest.hasClass(this.class) === false) {
            matches = false;
        }
    }
    if (this.attributeName !== null) {
        if (this.attributeValue != tagToTest.get(this.attributeName)) {
            matches = false;
        }
    }
    return matches;    
};

/* File end: /Volumes/Lucid/html/bin/../src/lucid.html.Selector.js */

/* File start: /Volumes/Lucid/html/bin/../src/Exception/ChildrenNotAllowed.js */
lucid.html.exception.ChildrenNotAllowed=function(className){
    this.message = 'Class '+String(className)+' cannot have children.';
};
lucid.html.exception.ChildrenNotAllowed.prototype = Object.create(Error.prototype);

/* File end: /Volumes/Lucid/html/bin/../src/Exception/ChildrenNotAllowed.js */

/* File start: /Volumes/Lucid/html/bin/../src/Exception/InvalidAttribute.js */
lucid.html.exception.InvalidAttribute=function(className, badAttribute, allowedAttributes){
    this.message = 'Class '+String(className)+' cannot have attribute ' + String(badAttribute) + '. Supported attributes are: ' + allowedAttributes.join(', ');
};
lucid.html.exception.InvalidAttribute.prototype = Object.create(Error.prototype);

/* File end: /Volumes/Lucid/html/bin/../src/Exception/InvalidAttribute.js */

/* File start: /Volumes/Lucid/html/bin/../src/Exception/InvalidAttributeValue.js */
lucid.html.exception.InvalidAttributeValue=function(className, attributeName, badAttributeValue, allowedValues){
    this.message = 'Class '+String(className)+'.'+String(attributeName)+' cannot have value ' + String(badAttributeValue) + '.';
    if (typeof(allowedValues) == 'object' && allowedValues.length > 0){
        this.message += ' Supported attributes are: ' + allowedValues.join(', ');
    }
};
lucid.html.exception.InvalidAttributeValue.prototype = Object.create(Error.prototype);

/* File end: /Volumes/Lucid/html/bin/../src/Exception/InvalidAttributeValue.js */

/* File start: /Volumes/Lucid/html/bin/../src/Exception/MissingRequiredProperty.js */
lucid.html.exception.MissingRequiredProperty=function(className, traitName, propertyName, description){
    this.message = 'Class '+String(className)+' cannot use trait '+String(traitName)+' until it has a property named '+String(propertyName);
    if (typeof(description) == 'string' && description !== '') {
        this.message += String(description);
    }
};
lucid.html.exception.MissingRequiredProperty.prototype = Object.create(Error.prototype);

/* File end: /Volumes/Lucid/html/bin/../src/Exception/MissingRequiredProperty.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/js/lucid.html.base.js */
lucid.html.base={
    tags:{},
    traits:{}
};
/* File end: /Volumes/Lucid/html/bin/../src/Base/js/lucid.html.base.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Traits/Autofocusable.js */
lucid.html.base.traits.Autofocusable = {

    traitInit:function() {
        this.allowedAttributes.push('autofocus');
    },

    setAutofocus:function(val) {
        if (val !== true && val !== false) {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'autofocus', val, ['true', 'false']);
        }
        this.attributes.autofocus = val;
        return this;
    },

    renderAutofocus:function(){
        var val = (this.attributes.autofocus === true)?'autofocus':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Traits/Autofocusable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Traits/Checkable.js */
lucid.html.base.traits.Checkable = {

    traitInit:function() {
        this.allowedAttributes.push('checked');
    },

    setChecked:function(val){
        if (String(val) === '1') {
            val = true;
        } else if (String(val) === '0') {
            val = false;
        } else if (String(val) === '') {
            val = false;
        } else if (String(val) === 'true') {
            val = true;
        } else if (String(val) === 'false') {
            val = false;
        }


        var type = (typeof(this.attributes.type) == 'undefined')?'unknown':this.attributes.type;
        if (['radio', 'checkbox'].indexOf(type) < 0) {
            throw 'Attribute checked cannot be used on input type '+type+'; only for types radio and checkbox.';
        }

        if (typeof(val) != 'boolean') {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'checked', val, ['true', 'false']);
        }

        this.attributes.checked = (val === true || val === 'true' || val === 1 || val === String('1'));
        return this;
    },

    renderChecked:function(){
        var val = (this.attributes.checked === true)?'checked':null;
        return val;
    }
};
/* File end: /Volumes/Lucid/html/bin/../src/Base/Traits/Checkable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Traits/Disableable.js */
lucid.html.base.traits.Disableable = {

    traitInit:function() {
        this.allowedAttributes.push('disabled');
    },

    setDisabled:function(val) {
        if (val !== true && val !== false) {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'autofocus', val, ['true', 'false']);
        }
        this.attributes.disabled = val;
        return this;
    },

    renderDisabled:function(){
        var val = (this.attributes.disabled === true)?'disabled':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Traits/Disableable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Traits/Readonlyable.js */
lucid.html.base.traits.Readonlyable = {

    traitInit:function() {
        this.allowedAttributes.push('readonly');
    },

    setReadonly:function(val) {
        if (val !== true && val !== false) {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'readonly', val, ['true', 'false']);
        }
        this.attributes.readonly = val;
        return this;
    },

    renderReadonly:function(){
        var val = (this.attributes.readonly === true)?'readonly':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Traits/Readonlyable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Traits/Requireable.js */
lucid.html.base.traits.Requireable = {

    traitInit:function() {
        this.allowedAttributes.push('required');
    },

    setRequired:function(val) {
        if (val !== true && val !== false) {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'required', val, ['true', 'false']);
        }
        this.attributes.required = val;
        return this;
    },

    renderRequired:function(){
        var val = (this.attributes.required === true)?'required':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Traits/Requireable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/abbreviation.js */
lucid.html.base.tags.abbreviation = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'abbr';
	this.parameters = ['title'];
};
lucid.html.base.tags.abbreviation.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.abbreviation = lucid.html.base.tags.abbreviation;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/abbreviation.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/address.js */
lucid.html.base.tags.address = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'address';
};
lucid.html.base.tags.address.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.address = lucid.html.base.tags.address;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/address.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/anchor.js */
lucid.html.base.tags.anchor = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'a';
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	this.parameters = ['href'];
};
lucid.html.base.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.anchor = lucid.html.base.tags.anchor;

lucid.html.base.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/anchor.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/article.js */
lucid.html.base.tags.article = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'article';
};
lucid.html.base.tags.article.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.article = lucid.html.base.tags.article;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/article.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/aside.js */
lucid.html.base.tags.aside = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'aside';
};
lucid.html.base.tags.aside.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.aside = lucid.html.base.tags.aside;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/aside.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/base.js */
lucid.html.base.tags.base = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'base';
	this.parameters = ['href', 'target'];
};
lucid.html.base.tags.base.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.base = lucid.html.base.tags.base;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/base.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/blockquote.js */
lucid.html.base.tags.blockquote = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'blockquote';
	this.parameters = ['cite'];
};
lucid.html.base.tags.blockquote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.blockquote = lucid.html.base.tags.blockquote;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/blockquote.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/body.js */
lucid.html.base.tags.body = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'body';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.body.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.body = lucid.html.base.tags.body;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/body.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/bold.js */
lucid.html.base.tags.bold = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'b';
};
lucid.html.base.tags.bold.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.bold = lucid.html.base.tags.bold;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/bold.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/br.js */
lucid.html.base.tags.br = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'br';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.br.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.br = lucid.html.base.tags.br;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/br.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/button.js */
lucid.html.base.tags.button = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'button';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('name');
	this.parameters = ['child', 'onclick'];
	this.attributes['type'] = 'button';
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

};
lucid.html.base.tags.button.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.button = lucid.html.base.tags.button;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/button.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/canvas.js */
lucid.html.base.tags.canvas = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'canvas';
	this.parameters = ['height', 'width'];
};
lucid.html.base.tags.canvas.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.canvas = lucid.html.base.tags.canvas;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/canvas.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/caption.js */
lucid.html.base.tags.caption = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'caption';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.caption = lucid.html.base.tags.caption;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/caption.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/cite.js */
lucid.html.base.tags.cite = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'cite';
};
lucid.html.base.tags.cite.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cite = lucid.html.base.tags.cite;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/cite.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/code.js */
lucid.html.base.tags.code = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'code';
};
lucid.html.base.tags.code.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.code = lucid.html.base.tags.code;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/code.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/column.js */
lucid.html.base.tags.column = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'col';
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('span');
};
lucid.html.base.tags.column.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.column = lucid.html.base.tags.column;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/column.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/columnGroup.js */
lucid.html.base.tags.columnGroup = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'colgroup';
};
lucid.html.base.tags.columnGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.columnGroup = lucid.html.base.tags.columnGroup;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/columnGroup.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/dataList.js */
lucid.html.base.tags.dataList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'datalist';
};
lucid.html.base.tags.dataList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.dataList = lucid.html.base.tags.dataList;

lucid.html.base.tags.dataList.prototype.checkValidChild=function(child){
	if (['option'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag datalist only allows these tags as children: option';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/dataList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/definition.js */
lucid.html.base.tags.definition = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dfn';
};
lucid.html.base.tags.definition.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definition = lucid.html.base.tags.definition;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/definition.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/definitionDescription.js */
lucid.html.base.tags.definitionDescription = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dd';
};
lucid.html.base.tags.definitionDescription.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definitionDescription = lucid.html.base.tags.definitionDescription;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/definitionDescription.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/definitionList.js */
lucid.html.base.tags.definitionList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dl';
};
lucid.html.base.tags.definitionList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definitionList = lucid.html.base.tags.definitionList;

lucid.html.base.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dt'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dt';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/definitionList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/definitionTerm.js */
lucid.html.base.tags.definitionTerm = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dt';
};
lucid.html.base.tags.definitionTerm.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definitionTerm = lucid.html.base.tags.definitionTerm;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/definitionTerm.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/details.js */
lucid.html.base.tags.details = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'details';
};
lucid.html.base.tags.details.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.details = lucid.html.base.tags.details;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/details.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/dialog.js */
lucid.html.base.tags.dialog = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dialog';
	this.allowedAttributes.push('open');
};
lucid.html.base.tags.dialog.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.dialog = lucid.html.base.tags.dialog;

lucid.html.base.tags.dialog.prototype.setOpen=function(val){
    if (val !== true && val !== false) {
        throw 'Attribute open only accepts values true or false.';
    }
    this.attributes.open = val;
    return this;
};

lucid.html.base.tags.dialog.prototype.renderOpen=function(){
    var val = (this.attributes.open === true)?'open':null;
    return val;
};
/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/dialog.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/div.js */
lucid.html.base.tags.div = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
};
lucid.html.base.tags.div.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.div = lucid.html.base.tags.div;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/div.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/emphasis.js */
lucid.html.base.tags.emphasis = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'em';
};
lucid.html.base.tags.emphasis.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.emphasis = lucid.html.base.tags.emphasis;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/emphasis.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/fieldset.js */
lucid.html.base.tags.fieldset = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'fieldset';
	this.parameters = ['legend'];
	this.legend = null;
};
lucid.html.base.tags.fieldset.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.fieldset = lucid.html.base.tags.fieldset;

lucid.html.base.tags.fieldset.prototype.getLegend=function(){
    if (this.legend === null) {
        this.legend = this.build('legend');
    }
    return this.legend;
};

lucid.html.base.tags.fieldset.prototype.setLegend=function(newValue){
    var legend = this.get('legend');
    legend.children = [];
    legend.add(newValue);
    return this;
};

lucid.html.base.tags.fieldset.prototype.preChildren=function(){
    if (this.legend !== null) {
        this.preChildrenHtml += String(this.legend.render())
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/fieldset.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/figure.js */
lucid.html.base.tags.figure = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'figure';
};
lucid.html.base.tags.figure.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.figure = lucid.html.base.tags.figure;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/figure.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/figureCaption.js */
lucid.html.base.tags.figureCaption = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'figcaption';
};
lucid.html.base.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.figureCaption = lucid.html.base.tags.figureCaption;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/figureCaption.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/footer.js */
lucid.html.base.tags.footer = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'footer';
};
lucid.html.base.tags.footer.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.footer = lucid.html.base.tags.footer;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/footer.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/form.js */
lucid.html.base.tags.form = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'form';
	this.allowedAttributes.push('onsubmit');
	this.allowedAttributes.push('enctype');
	this.allowedAttributes.push('method');
	this.allowedAttributes.push('target');
	this.parameters = ['name', 'action'];
};
lucid.html.base.tags.form.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.form = lucid.html.base.tags.form;

lucid.html.base.tags.form.prototype.checkValidChild=function(child){
	if (['form'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag form does not allow these tags as children: form';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/form.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/h1.js */
lucid.html.base.tags.h1 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h1';
};
lucid.html.base.tags.h1.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h1 = lucid.html.base.tags.h1;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/h1.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/h2.js */
lucid.html.base.tags.h2 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h2';
};
lucid.html.base.tags.h2.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h2 = lucid.html.base.tags.h2;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/h2.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/h3.js */
lucid.html.base.tags.h3 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h3';
};
lucid.html.base.tags.h3.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h3 = lucid.html.base.tags.h3;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/h3.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/h4.js */
lucid.html.base.tags.h4 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h4';
};
lucid.html.base.tags.h4.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h4 = lucid.html.base.tags.h4;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/h4.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/h5.js */
lucid.html.base.tags.h5 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h5';
};
lucid.html.base.tags.h5.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h5 = lucid.html.base.tags.h5;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/h5.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/h6.js */
lucid.html.base.tags.h6 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h6';
};
lucid.html.base.tags.h6.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h6 = lucid.html.base.tags.h6;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/h6.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/head.js */
lucid.html.base.tags.head = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'head';
};
lucid.html.base.tags.head.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.head = lucid.html.base.tags.head;

lucid.html.base.tags.head.prototype.checkValidChild=function(child){
	if (['title', 'link', 'script', 'base', 'meta', 'style'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag head only allows these tags as children: title, link, script, base, meta, style';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/head.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/header.js */
lucid.html.base.tags.header = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'header';
};
lucid.html.base.tags.header.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.header = lucid.html.base.tags.header;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/header.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/hr.js */
lucid.html.base.tags.hr = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'hr';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.hr.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.hr = lucid.html.base.tags.hr;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/hr.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/image.js */
lucid.html.base.tags.image = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.image.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.image = lucid.html.base.tags.image;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/image.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/input.js */
lucid.html.base.tags.input = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'input';
	this.allowQuickClose = true;
	this.allowChildren = false;
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Readonlyable);
	this.addTrait(lucid.html.base.traits.Requireable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

};
lucid.html.base.tags.input.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.input = lucid.html.base.tags.input;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/input.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputCheckbox.js */
lucid.html.base.tags.inputCheckbox = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('value');
	this.parameters = ['name', 'checked', 'postHtml'];
	this.attributes['type'] = 'checkbox';
	this.addTrait(lucid.html.base.traits.Checkable);

};
lucid.html.base.tags.inputCheckbox.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputCheckbox = lucid.html.base.tags.inputCheckbox;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputCheckbox.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputEmail.js */
lucid.html.base.tags.inputEmail = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'email';
};
lucid.html.base.tags.inputEmail.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputEmail = lucid.html.base.tags.inputEmail;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputEmail.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputFile.js */
lucid.html.base.tags.inputFile = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.parameters = ['name'];
	this.attributes['type'] = 'file';
};
lucid.html.base.tags.inputFile.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputFile = lucid.html.base.tags.inputFile;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputFile.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputNumber.js */
lucid.html.base.tags.inputNumber = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.allowedAttributes.push('min');
	this.allowedAttributes.push('max');
	this.parameters = ['name', 'value', 'required', 'placeholder', 'min', 'max'];
	this.attributes['type'] = 'number';
};
lucid.html.base.tags.inputNumber.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputNumber = lucid.html.base.tags.inputNumber;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputNumber.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputPassword.js */
lucid.html.base.tags.inputPassword = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required'];
	this.attributes['type'] = 'password';
};
lucid.html.base.tags.inputPassword.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputPassword = lucid.html.base.tags.inputPassword;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputPassword.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputRadio.js */
lucid.html.base.tags.inputRadio = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.parameters = ['name', 'value', 'checked', 'postHtml'];
	this.attributes['type'] = 'radio';
	this.addTrait(lucid.html.base.traits.Checkable);

};
lucid.html.base.tags.inputRadio.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputRadio = lucid.html.base.tags.inputRadio;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputRadio.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputSelect.js */
lucid.html.base.tags.inputSelect = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'select';
	this.parameters = ['name', 'value', 'data', 'onchange'];
	this.data = null;
	this.value = null;
};
lucid.html.base.tags.inputSelect.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.inputSelect = lucid.html.base.tags.inputSelect;

lucid.html.base.tags.inputSelect.prototype.checkValidChild=function(child){
	if (['option', 'optgroup'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag select only allows these tags as children: option, optgroup';
	}
};
    
lucid.html.base.tags.inputSelect.prototype.preRender=function(){
    if (this.children.length > 0) {
        for (var i=0; i<this.children.length; i++) {
            this.children[i].setSelected((this.children[i].get('value') == this.value));
        }
    }
    if (this.data !== null) {
        for (var i=0; i<this.data.length; i++) {
            var value = '';
            var label = '';
            if (typeof(this.data[i].label) != 'undefined') {
                value = this.data[i].value;
                label = this.data[i].label;
            } else if (typeof(this.data[i][1]) != 'undefined') {
                value = this.data[i][0];
                label = this.data[i][1];
            }
            
            this.add(this.build('option', value, label, (this.value == value)));
        }
        
    }
    return lucid.html.tag.prototype.preRender.call(this);
};

lucid.html.base.tags.inputSelect.prototype.setValue=function(newValue) {
    this.value = newValue;
    if (this.children.length > 0) {
        for(var i=0; i<this.children.length; i++) {
            this.children[i].setSelected((this.children[i].getValue() == this.value));
        }
    }
    return this;
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputSelect.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputTelephone.js */
lucid.html.base.tags.inputTelephone = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'tel';
};
lucid.html.base.tags.inputTelephone.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputTelephone = lucid.html.base.tags.inputTelephone;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputTelephone.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputText.js */
lucid.html.base.tags.inputText = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'text';
};
lucid.html.base.tags.inputText.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputText = lucid.html.base.tags.inputText;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputText.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputTextarea.js */
lucid.html.base.tags.inputTextarea = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'textarea';
	this.parameters = ['name', 'rows', 'cols'];
	this.allowQuickClose = false;
	this.allowChildren = true;
};
lucid.html.base.tags.inputTextarea.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputTextarea = lucid.html.base.tags.inputTextarea;

lucid.html.base.tags.inputTextarea.prototype.setValue=function(newValue){
    if (this.children.length === 0){
        this.add(newValue);
    } else {
        this.children = [];
        this.add(newValue);
    }
    return this;
};

lucid.html.base.tags.inputTextarea.prototype.getValue=function(){
    if (this.children.length === 0){
        return '';
    } else {
        return this.renderChildren();
    }
};
/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputTextarea.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/inputUrl.js */
lucid.html.base.tags.inputUrl = function(factory){
	this.factory = factory;
	lucid.html.base.tags.input.apply(this, arguments);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'url';
};
lucid.html.base.tags.inputUrl.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.factory.tags.inputUrl = lucid.html.base.tags.inputUrl;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/inputUrl.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/insert.js */
lucid.html.base.tags.insert = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'ins';
};
lucid.html.base.tags.insert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.insert = lucid.html.base.tags.insert;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/insert.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/italic.js */
lucid.html.base.tags.italic = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'i';
};
lucid.html.base.tags.italic.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.italic = lucid.html.base.tags.italic;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/italic.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/label.js */
lucid.html.base.tags.label = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'label';
	this.parameters = ['for'];
};
lucid.html.base.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.label = lucid.html.base.tags.label;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/label.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/legend.js */
lucid.html.base.tags.legend = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'legend';
};
lucid.html.base.tags.legend.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.legend = lucid.html.base.tags.legend;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/legend.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/listItem.js */
lucid.html.base.tags.listItem = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'li';
};
lucid.html.base.tags.listItem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.listItem = lucid.html.base.tags.listItem;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/listItem.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/main.js */
lucid.html.base.tags.main = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'main';
};
lucid.html.base.tags.main.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.main = lucid.html.base.tags.main;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/main.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/mark.js */
lucid.html.base.tags.mark = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'mark';
};
lucid.html.base.tags.mark.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.mark = lucid.html.base.tags.mark;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/mark.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/menu.js */
lucid.html.base.tags.menu = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'menu';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
};
lucid.html.base.tags.menu.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.menu = lucid.html.base.tags.menu;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/menu.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/menuitem.js */
lucid.html.base.tags.menuitem = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'menuitem';
	this.allowedAttributes.push('checked');
	this.allowedAttributes.push('default');
	this.allowedAttributes.push('disabled');
	this.allowedAttributes.push('icon');
	this.allowedAttributes.push('label');
	this.allowedAttributes.push('radiogroup');
	this.allowedAttributes.push('type');
};
lucid.html.base.tags.menuitem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.menuitem = lucid.html.base.tags.menuitem;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/menuitem.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/meter.js */
lucid.html.base.tags.meter = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'meter';
	this.allowedAttributes.push('form');
	this.allowedAttributes.push('high');
	this.allowedAttributes.push('low');
	this.allowedAttributes.push('max');
	this.allowedAttributes.push('min');
	this.allowedAttributes.push('optimum');
	this.allowedAttributes.push('value');
};
lucid.html.base.tags.meter.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.meter = lucid.html.base.tags.meter;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/meter.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/nav.js */
lucid.html.base.tags.nav = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'nav';
};
lucid.html.base.tags.nav.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.nav = lucid.html.base.tags.nav;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/nav.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/option.js */
lucid.html.base.tags.option = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'option';
	this.parameters = ['value', 'child', 'selected'];
};
lucid.html.base.tags.option.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.option = lucid.html.base.tags.option;

lucid.html.base.tags.option.prototype.setSelected=function(val) {
    if (this.parent !== null) {
        for(var i=0; i<this.parent.children.length; i++) {
            if (typeof(this.parent.children[i].attributes.selected) != 'undefined') {
                delete this.parent.children[i].attributes.selected;
            }
        }
    }
    if (val === true) {
        this.attributes.selected = 'selected';
    }
};

lucid.html.base.tags.option.prototype.getSelected=function(){
    return (typeof(this.attributes.selected) == 'undefined')?false:true;
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/option.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/orderedList.js */
lucid.html.base.tags.orderedList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'ol';
};
lucid.html.base.tags.orderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.orderedList = lucid.html.base.tags.orderedList;

lucid.html.base.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/orderedList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/paragraph.js */
lucid.html.base.tags.paragraph = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'p';
};
lucid.html.base.tags.paragraph.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.paragraph = lucid.html.base.tags.paragraph;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/paragraph.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/preformatted.js */
lucid.html.base.tags.preformatted = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'pre';
};
lucid.html.base.tags.preformatted.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.preformatted = lucid.html.base.tags.preformatted;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/preformatted.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/progress.js */
lucid.html.base.tags.progress = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'progress';
	this.parameters = ['value', 'max'];
};
lucid.html.base.tags.progress.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.progress = lucid.html.base.tags.progress;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/progress.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/quote.js */
lucid.html.base.tags.quote = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'q';
};
lucid.html.base.tags.quote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.quote = lucid.html.base.tags.quote;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/quote.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/sample.js */
lucid.html.base.tags.sample = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'samp';
};
lucid.html.base.tags.sample.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.sample = lucid.html.base.tags.sample;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/sample.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/section.js */
lucid.html.base.tags.section = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'section';
};
lucid.html.base.tags.section.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.section = lucid.html.base.tags.section;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/section.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/small.js */
lucid.html.base.tags.small = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'small';
};
lucid.html.base.tags.small.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.small = lucid.html.base.tags.small;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/small.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/span.js */
lucid.html.base.tags.span = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'span';
};
lucid.html.base.tags.span.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.span = lucid.html.base.tags.span;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/span.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/strikethrough.js */
lucid.html.base.tags.strikethrough = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 's';
};
lucid.html.base.tags.strikethrough.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.strikethrough = lucid.html.base.tags.strikethrough;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/strikethrough.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/strong.js */
lucid.html.base.tags.strong = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'strong';
};
lucid.html.base.tags.strong.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.strong = lucid.html.base.tags.strong;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/strong.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/style.js */
lucid.html.base.tags.style = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'style';
	this.allowedAttributes.push('scoped');
	this.allowedAttributes.push('type');
	this.parameters = ['media'];
};
lucid.html.base.tags.style.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.style = lucid.html.base.tags.style;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/style.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/subscript.js */
lucid.html.base.tags.subscript = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'sub';
};
lucid.html.base.tags.subscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.subscript = lucid.html.base.tags.subscript;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/subscript.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/summary.js */
lucid.html.base.tags.summary = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'summary';
};
lucid.html.base.tags.summary.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.summary = lucid.html.base.tags.summary;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/summary.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/superscript.js */
lucid.html.base.tags.superscript = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'sup';
};
lucid.html.base.tags.superscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.superscript = lucid.html.base.tags.superscript;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/superscript.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/table.js */
lucid.html.base.tags.table = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'table';
	this.allowedAttributes.push('cellpadding');
	this.allowedAttributes.push('cellspacing');
	this.allowedAttributes.push('border');
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('sortable');
};
lucid.html.base.tags.table.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.table = lucid.html.base.tags.table;

lucid.html.base.tags.table.prototype.checkValidChild=function(child){
	if (['thead', 'tfoot', 'tbody', 'tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag table only allows these tags as children: thead, tfoot, tbody, tr';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/table.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/tableBody.js */
lucid.html.base.tags.tableBody = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'tbody';
};
lucid.html.base.tags.tableBody.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableBody = lucid.html.base.tags.tableBody;

lucid.html.base.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/tableBody.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/tableData.js */
lucid.html.base.tags.tableData = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'td';
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
};
lucid.html.base.tags.tableData.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableData = lucid.html.base.tags.tableData;

lucid.html.base.tags.tableData.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag td does not allow these tags as children: th, td, tr';
	}
};

lucid.html.factory.tags.tableData.prototype.renderColspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/tableData.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/tableFoot.js */
lucid.html.base.tags.tableFoot = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.base.tags.tableFoot.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableFoot = lucid.html.base.tags.tableFoot;

lucid.html.base.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/tableFoot.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/tableHead.js */
lucid.html.base.tags.tableHead = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'thead';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.base.tags.tableHead.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableHead = lucid.html.base.tags.tableHead;

lucid.html.base.tags.tableHead.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag thead only allows these tags as children: th, td';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/tableHead.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/tableHeader.js */
lucid.html.base.tags.tableHeader = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'th';
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
};
lucid.html.base.tags.tableHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableHeader = lucid.html.base.tags.tableHeader;

lucid.html.base.tags.tableHeader.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag th does not allow these tags as children: th, td, tr';
	}
};

lucid.html.factory.tags.tableHeader.prototype.renderColspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/tableHeader.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/tableRow.js */
lucid.html.base.tags.tableRow = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'tr';
};
lucid.html.base.tags.tableRow.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.tableRow = lucid.html.base.tags.tableRow;

lucid.html.base.tags.tableRow.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tr only allows these tags as children: th, td';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/tableRow.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/time.js */
lucid.html.base.tags.time = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'time';
	this.allowedAttributes.push('datetime');
};
lucid.html.base.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.time = lucid.html.base.tags.time;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/time.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/underline.js */
lucid.html.base.tags.underline = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'u';
};
lucid.html.base.tags.underline.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.underline = lucid.html.base.tags.underline;

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/underline.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/Tags/unorderedList.js */
lucid.html.base.tags.unorderedList = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'ul';
};
lucid.html.base.tags.unorderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.unorderedList = lucid.html.base.tags.unorderedList;

lucid.html.base.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/Tags/unorderedList.js */
