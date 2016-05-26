
/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.js */
if (typeof lucid == 'undefined') {
    var lucid = {};
}
lucid.html = {};

lucid.html.build=function(){
    return lucid.html.builder.build.apply(null, arguments);
};
/* File end: /Volumes/Lucid/html/bin/../src/lucid.html.js */

/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.builder.js */
lucid.html.builder=function(){
    return 'called';
};

lucid.html.builder.tags = {};

lucid.html.builder.build=function(tag){
    var obj;
    if (typeof(lucid.html.builder.tags[tag]) == 'function'){
        obj = new lucid.html.builder.tags[tag]();
        
        var newArgs = [];
        for (var i=1; i<arguments.length; i++) {
            newArgs.push(arguments[i]);
        }
        obj.setProperties(newArgs);
    } else {
        obj = new lucid.html.tag();
        obj.tag = tag;
    }
    obj.instantiatorName = tag;
    return obj;
};


/* File end: /Volumes/Lucid/html/bin/../src/lucid.html.builder.js */

/* File start: /Volumes/Lucid/html/bin/../src/lucid.html.tag.js */
lucid.html.tag = function(){
    this.tag = null;
    this.instantiatorName = null;
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
    for(var key in newTrait) {
        if (key != 'traitInit') {
            this[key] = newTrait[key];
        }
    }
    if (typeof(newTrait.traitInit) == 'function') {
        newTrait.traitInit.call(this);
    }
    return this;
};

lucid.html.tag.prototype.build=function(){
    return lucid.html.build.apply(null, arguments);
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

lucid.html.tag.prototype.set=function(name, value) {
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    if (typeof(this['set'+key]) == 'function') {
        this['set'+key](value);
    } else {
        if (this.allowedAttributes.indexOf(name) < 0 && this.parameters.indexOf(name) < 0) {
            throw 'Invalid attribute '+name+'. Tag '+this.tag+' only allows these attributes: ' + ((this.allowedAttributes.concat(this.parameters)).join(', '));
        }
        if (typeof(this[name]) == 'undefined') {
            this.attributes[name] = value;
        } else {
            this[name] = value;
        }
    }
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

lucid.html.tag.prototype.setupChild=function(child, action){
    if (typeof(action) == 'undefined') {
        action = 'add';
    }
    if (this.allowChildren === false) {
        throw 'Tag '+this.tag+' does not allow children to be added.';
    }

    if ((child instanceof Array) === true) {
        for (var i=0; i<child.length; i++) {
            this[action](child[i]);
        }
        return false;
    } else if (typeof(child) == 'object') {
        this.checkValidChild(child);
        child.parent = this;
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
    return this.attributes['class'].join(' ');
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
        throw 'Attribute hidden only accepts values true or false.';
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
        this.tag = pattern[0];
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

/* File start: /Volumes/Lucid/html/bin/../src/Base/js/lucid.html.base.js */
lucid.html.base={
    tags:{},
    traits:{}
};
/* File end: /Volumes/Lucid/html/bin/../src/Base/js/lucid.html.base.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/traits/Autofocusable.js */
lucid.html.base.traits.Autofocusable = {

    traitInit:function() {
        this.allowedAttributes.push('autofocus');
    },

    setAutofocus:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute autofocus only accepts values true or false.';
        }
        this.attributes.autofocus = val;
        return this;
    },

    renderAutofocus:function(){
        var val = (this.attributes.autofocus === true)?'autofocus':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/traits/Autofocusable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/traits/Checkable.js */
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
            throw 'Attribute checked only accepts values true or false.';
        }

        this.attributes.checked = (val === true || val === 'true' || val === 1 || val === String('1'));
        return this;
    },

    renderChecked:function(){
        var val = (this.attributes.checked === true)?'checked':null;
        return val;
    }
};
/* File end: /Volumes/Lucid/html/bin/../src/Base/traits/Checkable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/traits/Disableable.js */
lucid.html.base.traits.Disableable = {

    traitInit:function() {
        this.allowedAttributes.push('disabled');
    },

    setDisabled:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute checked only accepts values true or false.';
        }
        this.attributes.disabled = val;
        return this;
    },

    renderDisabled:function(){
        var val = (this.attributes.disabled === true)?'disabled':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/traits/Disableable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/traits/Readonlyable.js */
lucid.html.base.traits.Readonlyable = {

    traitInit:function() {
        this.allowedAttributes.push('readonly');
    },

    setReadonly:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute readonly only accepts values true or false.';
        }
        this.attributes.readonly = val;
        return this;
    },

    renderReadonly:function(){
        var val = (this.attributes.readonly === true)?'readonly':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/traits/Readonlyable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/traits/Requireable.js */
lucid.html.base.traits.Requireable = {

    traitInit:function() {
        this.allowedAttributes.push('required');
    },

    setRequired:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute required only accepts values true or false.';
        }
        this.attributes.required = val;
        return this;
    },

    renderRequired:function(){
        var val = (this.attributes.required === true)?'required':null;
        return val;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/traits/Requireable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/abbreviation.js */
lucid.html.base.tags.abbreviation = function(){
	lucid.html.tag.call(this);
	this.tag = 'abbr';
	this.parameters = ['title'];
};
lucid.html.base.tags.abbreviation.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.abbreviation = lucid.html.base.tags.abbreviation;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/abbreviation.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/address.js */
lucid.html.base.tags.address = function(){
	lucid.html.tag.call(this);
	this.tag = 'address';
};
lucid.html.base.tags.address.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.address = lucid.html.base.tags.address;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/address.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/anchor.js */
lucid.html.base.tags.anchor = function(){
	lucid.html.tag.call(this);
	this.tag = 'a';
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	this.parameters = ['href'];
};
lucid.html.base.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.anchor = lucid.html.base.tags.anchor;

lucid.html.base.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/anchor.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/article.js */
lucid.html.base.tags.article = function(){
	lucid.html.tag.call(this);
	this.tag = 'article';
};
lucid.html.base.tags.article.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.article = lucid.html.base.tags.article;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/article.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/aside.js */
lucid.html.base.tags.aside = function(){
	lucid.html.tag.call(this);
	this.tag = 'aside';
};
lucid.html.base.tags.aside.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.aside = lucid.html.base.tags.aside;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/aside.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/base.js */
lucid.html.base.tags.base = function(){
	lucid.html.tag.call(this);
	this.tag = 'base';
	this.parameters = ['href', 'target'];
};
lucid.html.base.tags.base.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.base = lucid.html.base.tags.base;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/base.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/blockquote.js */
lucid.html.base.tags.blockquote = function(){
	lucid.html.tag.call(this);
	this.tag = 'blockquote';
	this.parameters = ['cite'];
};
lucid.html.base.tags.blockquote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.blockquote = lucid.html.base.tags.blockquote;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/blockquote.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/body.js */
lucid.html.base.tags.body = function(){
	lucid.html.tag.call(this);
	this.tag = 'body';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.body.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.body = lucid.html.base.tags.body;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/body.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/bold.js */
lucid.html.base.tags.bold = function(){
	lucid.html.tag.call(this);
	this.tag = 'b';
};
lucid.html.base.tags.bold.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.bold = lucid.html.base.tags.bold;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/bold.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/br.js */
lucid.html.base.tags.br = function(){
	lucid.html.tag.call(this);
	this.tag = 'br';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.br.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.br = lucid.html.base.tags.br;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/br.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/button.js */
lucid.html.base.tags.button = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

	this.tag = 'button';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('name');
	this.parameters = ['child', 'onclick'];
	this.attributes['type'] = 'button';
};
lucid.html.base.tags.button.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.button = lucid.html.base.tags.button;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/button.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/canvas.js */
lucid.html.base.tags.canvas = function(){
	lucid.html.tag.call(this);
	this.tag = 'canvas';
	this.parameters = ['height', 'width'];
};
lucid.html.base.tags.canvas.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.canvas = lucid.html.base.tags.canvas;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/canvas.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/caption.js */
lucid.html.base.tags.caption = function(){
	lucid.html.tag.call(this);
	this.tag = 'caption';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.caption = lucid.html.base.tags.caption;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/caption.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/cite.js */
lucid.html.base.tags.cite = function(){
	lucid.html.tag.call(this);
	this.tag = 'cite';
};
lucid.html.base.tags.cite.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cite = lucid.html.base.tags.cite;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/cite.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/code.js */
lucid.html.base.tags.code = function(){
	lucid.html.tag.call(this);
	this.tag = 'code';
};
lucid.html.base.tags.code.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.code = lucid.html.base.tags.code;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/code.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/column.js */
lucid.html.base.tags.column = function(){
	lucid.html.tag.call(this);
	this.tag = 'col';
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('span');
};
lucid.html.base.tags.column.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.column = lucid.html.base.tags.column;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/column.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/columnGroup.js */
lucid.html.base.tags.columnGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'colgroup';
};
lucid.html.base.tags.columnGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.columnGroup = lucid.html.base.tags.columnGroup;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/columnGroup.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/dataList.js */
lucid.html.base.tags.dataList = function(){
	lucid.html.tag.call(this);
	this.tag = 'datalist';
};
lucid.html.base.tags.dataList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.dataList = lucid.html.base.tags.dataList;

lucid.html.base.tags.dataList.prototype.checkValidChild=function(child){
	if (['option'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag datalist only allows these tags as children: option';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/dataList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/definition.js */
lucid.html.base.tags.definition = function(){
	lucid.html.tag.call(this);
	this.tag = 'dfn';
};
lucid.html.base.tags.definition.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definition = lucid.html.base.tags.definition;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/definition.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/definitionDescription.js */
lucid.html.base.tags.definitionDescription = function(){
	lucid.html.tag.call(this);
	this.tag = 'dd';
};
lucid.html.base.tags.definitionDescription.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionDescription = lucid.html.base.tags.definitionDescription;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/definitionDescription.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/definitionList.js */
lucid.html.base.tags.definitionList = function(){
	lucid.html.tag.call(this);
	this.tag = 'dl';
};
lucid.html.base.tags.definitionList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionList = lucid.html.base.tags.definitionList;

lucid.html.base.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dt'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dt';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/definitionList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/definitionTerm.js */
lucid.html.base.tags.definitionTerm = function(){
	lucid.html.tag.call(this);
	this.tag = 'dt';
};
lucid.html.base.tags.definitionTerm.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionTerm = lucid.html.base.tags.definitionTerm;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/definitionTerm.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/details.js */
lucid.html.base.tags.details = function(){
	lucid.html.tag.call(this);
	this.tag = 'details';
};
lucid.html.base.tags.details.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.details = lucid.html.base.tags.details;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/details.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/dialog.js */
lucid.html.base.tags.dialog = function(){
	lucid.html.tag.call(this);
	this.tag = 'dialog';
	this.allowedAttributes.push('open');
};
lucid.html.base.tags.dialog.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.dialog = lucid.html.base.tags.dialog;

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
/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/dialog.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/div.js */
lucid.html.base.tags.div = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
};
lucid.html.base.tags.div.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.div = lucid.html.base.tags.div;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/div.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/emphasis.js */
lucid.html.base.tags.emphasis = function(){
	lucid.html.tag.call(this);
	this.tag = 'em';
};
lucid.html.base.tags.emphasis.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.emphasis = lucid.html.base.tags.emphasis;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/emphasis.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/fieldset.js */
lucid.html.base.tags.fieldset = function(){
	lucid.html.tag.call(this);
	this.tag = 'fieldset';
	this.parameters = ['legend'];
	this.legend = null;
};
lucid.html.base.tags.fieldset.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.fieldset = lucid.html.base.tags.fieldset;

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

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/fieldset.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/figure.js */
lucid.html.base.tags.figure = function(){
	lucid.html.tag.call(this);
	this.tag = 'figure';
};
lucid.html.base.tags.figure.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figure = lucid.html.base.tags.figure;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/figure.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/figureCaption.js */
lucid.html.base.tags.figureCaption = function(){
	lucid.html.tag.call(this);
	this.tag = 'figcaption';
};
lucid.html.base.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figureCaption = lucid.html.base.tags.figureCaption;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/figureCaption.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/footer.js */
lucid.html.base.tags.footer = function(){
	lucid.html.tag.call(this);
	this.tag = 'footer';
};
lucid.html.base.tags.footer.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.footer = lucid.html.base.tags.footer;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/footer.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/form.js */
lucid.html.base.tags.form = function(){
	lucid.html.tag.call(this);
	this.tag = 'form';
	this.allowedAttributes.push('onsubmit');
	this.allowedAttributes.push('enctype');
	this.allowedAttributes.push('method');
	this.allowedAttributes.push('target');
	this.parameters = ['name', 'action'];
};
lucid.html.base.tags.form.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.form = lucid.html.base.tags.form;

lucid.html.base.tags.form.prototype.checkValidChild=function(child){
	if (['form'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag form does not allow these tags as children: form';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/form.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/h1.js */
lucid.html.base.tags.h1 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h1';
};
lucid.html.base.tags.h1.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h1 = lucid.html.base.tags.h1;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/h1.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/h2.js */
lucid.html.base.tags.h2 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h2';
};
lucid.html.base.tags.h2.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h2 = lucid.html.base.tags.h2;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/h2.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/h3.js */
lucid.html.base.tags.h3 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h3';
};
lucid.html.base.tags.h3.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h3 = lucid.html.base.tags.h3;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/h3.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/h4.js */
lucid.html.base.tags.h4 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h4';
};
lucid.html.base.tags.h4.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h4 = lucid.html.base.tags.h4;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/h4.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/h5.js */
lucid.html.base.tags.h5 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h5';
};
lucid.html.base.tags.h5.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h5 = lucid.html.base.tags.h5;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/h5.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/h6.js */
lucid.html.base.tags.h6 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h6';
};
lucid.html.base.tags.h6.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h6 = lucid.html.base.tags.h6;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/h6.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/head.js */
lucid.html.base.tags.head = function(){
	lucid.html.tag.call(this);
	this.tag = 'head';
};
lucid.html.base.tags.head.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.head = lucid.html.base.tags.head;

lucid.html.base.tags.head.prototype.checkValidChild=function(child){
	if (['title', 'link', 'script', 'base', 'meta', 'style'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag head only allows these tags as children: title, link, script, base, meta, style';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/head.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/header.js */
lucid.html.base.tags.header = function(){
	lucid.html.tag.call(this);
	this.tag = 'header';
};
lucid.html.base.tags.header.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.header = lucid.html.base.tags.header;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/header.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/hr.js */
lucid.html.base.tags.hr = function(){
	lucid.html.tag.call(this);
	this.tag = 'hr';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.hr.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.hr = lucid.html.base.tags.hr;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/hr.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/image.js */
lucid.html.base.tags.image = function(){
	lucid.html.tag.call(this);
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.image.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.image = lucid.html.base.tags.image;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/image.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/input.js */
lucid.html.base.tags.input = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Readonlyable);
	this.addTrait(lucid.html.base.traits.Requireable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

	this.tag = 'input';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.input.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.input = lucid.html.base.tags.input;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/input.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputCheckbox.js */
lucid.html.base.tags.inputCheckbox = function(){
	lucid.html.base.tags.input.call(this);
	this.addTrait(lucid.html.base.traits.Checkable);

	this.tag = 'input';
	this.allowedAttributes.push('value');
	this.parameters = ['name', 'checked', 'postHtml'];
	this.attributes['type'] = 'checkbox';
};
lucid.html.base.tags.inputCheckbox.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputCheckbox = lucid.html.base.tags.inputCheckbox;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputCheckbox.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputEmail.js */
lucid.html.base.tags.inputEmail = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'email';
};
lucid.html.base.tags.inputEmail.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputEmail = lucid.html.base.tags.inputEmail;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputEmail.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputFile.js */
lucid.html.base.tags.inputFile = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.parameters = ['name'];
	this.attributes['type'] = 'file';
};
lucid.html.base.tags.inputFile.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputFile = lucid.html.base.tags.inputFile;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputFile.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputNumber.js */
lucid.html.base.tags.inputNumber = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.allowedAttributes.push('min');
	this.allowedAttributes.push('max');
	this.parameters = ['name', 'value', 'required', 'placeholder', 'min', 'max'];
	this.attributes['type'] = 'number';
};
lucid.html.base.tags.inputNumber.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputNumber = lucid.html.base.tags.inputNumber;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputNumber.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputPassword.js */
lucid.html.base.tags.inputPassword = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required'];
	this.attributes['type'] = 'password';
};
lucid.html.base.tags.inputPassword.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputPassword = lucid.html.base.tags.inputPassword;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputPassword.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputRadio.js */
lucid.html.base.tags.inputRadio = function(){
	lucid.html.base.tags.input.call(this);
	this.addTrait(lucid.html.base.traits.Checkable);

	this.tag = 'input';
	this.parameters = ['name', 'value', 'checked', 'postHtml'];
	this.attributes['type'] = 'radio';
};
lucid.html.base.tags.inputRadio.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputRadio = lucid.html.base.tags.inputRadio;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputRadio.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputSelect.js */
lucid.html.base.tags.inputSelect = function(){
	lucid.html.tag.call(this);
	this.tag = 'select';
	this.parameters = ['name', 'value', 'data', 'onchange'];
	this.data = null;
	this.value = null;
};
lucid.html.base.tags.inputSelect.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.inputSelect = lucid.html.base.tags.inputSelect;

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
            
            this.add(lucid.html.build('option', value, label, (this.value == value)));
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

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputSelect.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputTelephone.js */
lucid.html.base.tags.inputTelephone = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'tel';
};
lucid.html.base.tags.inputTelephone.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputTelephone = lucid.html.base.tags.inputTelephone;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputTelephone.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputText.js */
lucid.html.base.tags.inputText = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'text';
};
lucid.html.base.tags.inputText.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputText = lucid.html.base.tags.inputText;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputText.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputTextarea.js */
lucid.html.base.tags.inputTextarea = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'textarea';
	this.parameters = ['name', 'rows', 'cols'];
	this.allowQuickClose = false;
	this.allowChildren = true;
};
lucid.html.base.tags.inputTextarea.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputTextarea = lucid.html.base.tags.inputTextarea;

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
/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputTextarea.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/inputUrl.js */
lucid.html.base.tags.inputUrl = function(){
	lucid.html.base.tags.input.call(this);
	this.tag = 'input';
	this.allowedAttributes.push('autocomplete');
	this.allowedAttributes.push('size');
	this.parameters = ['name', 'value', 'required', 'placeholder'];
	this.attributes['type'] = 'url';
};
lucid.html.base.tags.inputUrl.prototype = Object.create(lucid.html.base.tags.input.prototype);
lucid.html.builder.tags.inputUrl = lucid.html.base.tags.inputUrl;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/inputUrl.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/insert.js */
lucid.html.base.tags.insert = function(){
	lucid.html.tag.call(this);
	this.tag = 'ins';
};
lucid.html.base.tags.insert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.insert = lucid.html.base.tags.insert;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/insert.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/italic.js */
lucid.html.base.tags.italic = function(){
	lucid.html.tag.call(this);
	this.tag = 'i';
};
lucid.html.base.tags.italic.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.italic = lucid.html.base.tags.italic;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/italic.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/label.js */
lucid.html.base.tags.label = function(){
	lucid.html.tag.call(this);
	this.tag = 'label';
	this.parameters = ['for'];
};
lucid.html.base.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.label = lucid.html.base.tags.label;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/label.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/legend.js */
lucid.html.base.tags.legend = function(){
	lucid.html.tag.call(this);
	this.tag = 'legend';
};
lucid.html.base.tags.legend.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.legend = lucid.html.base.tags.legend;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/legend.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/listItem.js */
lucid.html.base.tags.listItem = function(){
	lucid.html.tag.call(this);
	this.tag = 'li';
};
lucid.html.base.tags.listItem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.listItem = lucid.html.base.tags.listItem;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/listItem.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/main.js */
lucid.html.base.tags.main = function(){
	lucid.html.tag.call(this);
	this.tag = 'main';
};
lucid.html.base.tags.main.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.main = lucid.html.base.tags.main;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/main.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/mark.js */
lucid.html.base.tags.mark = function(){
	lucid.html.tag.call(this);
	this.tag = 'mark';
};
lucid.html.base.tags.mark.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.mark = lucid.html.base.tags.mark;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/mark.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/menu.js */
lucid.html.base.tags.menu = function(){
	lucid.html.tag.call(this);
	this.tag = 'menu';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
};
lucid.html.base.tags.menu.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.menu = lucid.html.base.tags.menu;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/menu.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/menuitem.js */
lucid.html.base.tags.menuitem = function(){
	lucid.html.tag.call(this);
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
lucid.html.builder.tags.menuitem = lucid.html.base.tags.menuitem;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/menuitem.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/meter.js */
lucid.html.base.tags.meter = function(){
	lucid.html.tag.call(this);
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
lucid.html.builder.tags.meter = lucid.html.base.tags.meter;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/meter.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/nav.js */
lucid.html.base.tags.nav = function(){
	lucid.html.tag.call(this);
	this.tag = 'nav';
};
lucid.html.base.tags.nav.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.nav = lucid.html.base.tags.nav;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/nav.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/option.js */
lucid.html.base.tags.option = function(){
	lucid.html.tag.call(this);
	this.tag = 'option';
	this.parameters = ['value', 'child', 'selected'];
};
lucid.html.base.tags.option.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.option = lucid.html.base.tags.option;

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

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/option.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/orderedList.js */
lucid.html.base.tags.orderedList = function(){
	lucid.html.tag.call(this);
	this.tag = 'ol';
};
lucid.html.base.tags.orderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.orderedList = lucid.html.base.tags.orderedList;

lucid.html.base.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/orderedList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/paragraph.js */
lucid.html.base.tags.paragraph = function(){
	lucid.html.tag.call(this);
	this.tag = 'p';
};
lucid.html.base.tags.paragraph.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.paragraph = lucid.html.base.tags.paragraph;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/paragraph.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/preformatted.js */
lucid.html.base.tags.preformatted = function(){
	lucid.html.tag.call(this);
	this.tag = 'pre';
};
lucid.html.base.tags.preformatted.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.preformatted = lucid.html.base.tags.preformatted;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/preformatted.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/progress.js */
lucid.html.base.tags.progress = function(){
	lucid.html.tag.call(this);
	this.tag = 'progress';
	this.parameters = ['value', 'max'];
};
lucid.html.base.tags.progress.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.progress = lucid.html.base.tags.progress;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/progress.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/quote.js */
lucid.html.base.tags.quote = function(){
	lucid.html.tag.call(this);
	this.tag = 'q';
};
lucid.html.base.tags.quote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.quote = lucid.html.base.tags.quote;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/quote.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/sample.js */
lucid.html.base.tags.sample = function(){
	lucid.html.tag.call(this);
	this.tag = 'samp';
};
lucid.html.base.tags.sample.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.sample = lucid.html.base.tags.sample;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/sample.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/section.js */
lucid.html.base.tags.section = function(){
	lucid.html.tag.call(this);
	this.tag = 'section';
};
lucid.html.base.tags.section.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.section = lucid.html.base.tags.section;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/section.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/small.js */
lucid.html.base.tags.small = function(){
	lucid.html.tag.call(this);
	this.tag = 'small';
};
lucid.html.base.tags.small.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.small = lucid.html.base.tags.small;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/small.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/span.js */
lucid.html.base.tags.span = function(){
	lucid.html.tag.call(this);
	this.tag = 'span';
};
lucid.html.base.tags.span.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.span = lucid.html.base.tags.span;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/span.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/strikethrough.js */
lucid.html.base.tags.strikethrough = function(){
	lucid.html.tag.call(this);
	this.tag = 's';
};
lucid.html.base.tags.strikethrough.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strikethrough = lucid.html.base.tags.strikethrough;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/strikethrough.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/strong.js */
lucid.html.base.tags.strong = function(){
	lucid.html.tag.call(this);
	this.tag = 'strong';
};
lucid.html.base.tags.strong.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strong = lucid.html.base.tags.strong;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/strong.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/style.js */
lucid.html.base.tags.style = function(){
	lucid.html.tag.call(this);
	this.tag = 'style';
	this.allowedAttributes.push('scoped');
	this.allowedAttributes.push('type');
	this.parameters = ['media'];
};
lucid.html.base.tags.style.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.style = lucid.html.base.tags.style;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/style.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/subscript.js */
lucid.html.base.tags.subscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sub';
};
lucid.html.base.tags.subscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.subscript = lucid.html.base.tags.subscript;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/subscript.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/summary.js */
lucid.html.base.tags.summary = function(){
	lucid.html.tag.call(this);
	this.tag = 'summary';
};
lucid.html.base.tags.summary.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.summary = lucid.html.base.tags.summary;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/summary.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/superscript.js */
lucid.html.base.tags.superscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sup';
};
lucid.html.base.tags.superscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.superscript = lucid.html.base.tags.superscript;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/superscript.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/table.js */
lucid.html.base.tags.table = function(){
	lucid.html.tag.call(this);
	this.tag = 'table';
	this.allowedAttributes.push('cellpadding');
	this.allowedAttributes.push('cellspacing');
	this.allowedAttributes.push('border');
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('sortable');
};
lucid.html.base.tags.table.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.table = lucid.html.base.tags.table;

lucid.html.base.tags.table.prototype.checkValidChild=function(child){
	if (['thead', 'tfoot', 'tbody', 'tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag table only allows these tags as children: thead, tfoot, tbody, tr';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/table.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/tableBody.js */
lucid.html.base.tags.tableBody = function(){
	lucid.html.tag.call(this);
	this.tag = 'tbody';
};
lucid.html.base.tags.tableBody.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableBody = lucid.html.base.tags.tableBody;

lucid.html.base.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/tableBody.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/tableData.js */
lucid.html.base.tags.tableData = function(){
	lucid.html.tag.call(this);
	this.tag = 'td';
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
};
lucid.html.base.tags.tableData.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableData = lucid.html.base.tags.tableData;

lucid.html.base.tags.tableData.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag td does not allow these tags as children: th, td, tr';
	}
};

lucid.html.builder.tags.tableData.prototype.renderColspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/tableData.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/tableFoot.js */
lucid.html.base.tags.tableFoot = function(){
	lucid.html.tag.call(this);
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.base.tags.tableFoot.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableFoot = lucid.html.base.tags.tableFoot;

lucid.html.base.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/tableFoot.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/tableHead.js */
lucid.html.base.tags.tableHead = function(){
	lucid.html.tag.call(this);
	this.tag = 'thead';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.base.tags.tableHead.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableHead = lucid.html.base.tags.tableHead;

lucid.html.base.tags.tableHead.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag thead only allows these tags as children: th, td';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/tableHead.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/tableHeader.js */
lucid.html.base.tags.tableHeader = function(){
	lucid.html.tag.call(this);
	this.tag = 'th';
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
};
lucid.html.base.tags.tableHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableHeader = lucid.html.base.tags.tableHeader;

lucid.html.base.tags.tableHeader.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag th does not allow these tags as children: th, td, tr';
	}
};

lucid.html.builder.tags.tableHeader.prototype.renderColspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/tableHeader.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/tableRow.js */
lucid.html.base.tags.tableRow = function(){
	lucid.html.tag.call(this);
	this.tag = 'tr';
};
lucid.html.base.tags.tableRow.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableRow = lucid.html.base.tags.tableRow;

lucid.html.base.tags.tableRow.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tr only allows these tags as children: th, td';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/tableRow.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/time.js */
lucid.html.base.tags.time = function(){
	lucid.html.tag.call(this);
	this.tag = 'time';
	this.allowedAttributes.push('datetime');
};
lucid.html.base.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.time = lucid.html.base.tags.time;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/time.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/underline.js */
lucid.html.base.tags.underline = function(){
	lucid.html.tag.call(this);
	this.tag = 'u';
};
lucid.html.base.tags.underline.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.underline = lucid.html.base.tags.underline;

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/underline.js */

/* File start: /Volumes/Lucid/html/bin/../src/Base/tags/unorderedList.js */
lucid.html.base.tags.unorderedList = function(){
	lucid.html.tag.call(this);
	this.tag = 'ul';
};
lucid.html.base.tags.unorderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.unorderedList = lucid.html.base.tags.unorderedList;

lucid.html.base.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};

/* File end: /Volumes/Lucid/html/bin/../src/Base/tags/unorderedList.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/js/lucid.html.bootstrap.js */
lucid.html.bootstrap={
    tags:{},
    traits:{}
};
/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/js/lucid.html.bootstrap.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Activable.js */
lucid.html.bootstrap.traits.Activable = {

    setActive:function(val) {
        if (val === true) {
            this.addClass('active');
        } else if (val === false) {
            this.removeClass('active');
        } else {
            throw 'Tag '+String(this.tag)+' active property may only be set to true or false';
        }
        return this;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Activable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Modifiable.js */
lucid.html.bootstrap.traits.Modifiable = {

    traitInit:function() {
        // check for
    },

    setModifier:function(val) {
        if (this.bootstrapModifiersAllowed.indexOf(val) < 0) {
            throw 'Tag '+this.instantiatorName+' does not support modifier '+String(val)+'. The only supported modifiers are: '+(this.bootstrapModifiersAllowed.join(', '));
        }

        var classesToRemove = [];
        for (var i=0; i<this.bootstrapModifiersAllowed.length; i++) {
            classesToRemove.push(this.bootstrapModifierPrefix + '-' + this.bootstrapModifiersAllowed[i]);
        }
        this.removeClass(classesToRemove);
        
        if (val === null) {
            return this;
        } else {
            this.addClass(this.bootstrapModifierPrefix+'-'+val);
            return this;
        }
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Modifiable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Pillable.js */
lucid.html.bootstrap.traits.Pillable = {

    setPill:function(val) {
        if (val === true) {
            this.addClass('label-pill');
        } else if (val === false) {
            this.removeClass('label-pill');
        } else {
            throw 'Tag '+String(this.tag)+' pill property may only be set to true or false';
        }
        return this;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Pillable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Pullable.js */
lucid.html.bootstrap.traits.Pullable = {
    setPull:function(val) {
        if (typeof(this.attributes.class) == 'undefined') {
            this.attributes.class = [];
        }
        
        var newClasses = [];
        for (var i=0; i<this.attributes.class.length; i++) {
            var testClass = String(this.attributes.class[i]);
            if (testClass.indexOf('pull-') !== 0) {
                newClasses.push(testClass);
            }
        }
        
        var sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

        if (typeof(val) == 'object') {
            for (var j=0; j < val.length; j++) {
                if (val[j] !== null) {
                    newClasses.push('pull-'+sizes[j]+'-'+val[j]);
                }
            }

        } else {
            for (var k=0; k < sizes.length; k++) {
                newClasses.push('pull-'+sizes[k]+'-'+val);
            }
        }
        this.attributes.class = newClasses;
        return this;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Pullable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Sizeable.js */
lucid.html.bootstrap.traits.Sizeable = {

    traitInit:function() {
        // check for
    },

    setSize:function(val) {
        if (this.bootstrapSizesAllowed.indexOf(val) < 0) {
            throw 'Tag '+this.instantiatorName+' does not support size '+String(val)+'. The only supported modifiers are: '+(this.bootstrapSizesAllowed.join(', '));
        }

        var classesToRemove = [];
        for (var i=0; i<this.bootstrapSizesAllowed.length; i++) {
            classesToRemove.push(this.bootstrapSizePrefix + '-' + this.bootstrapSizesAllowed[i]);
        }
        this.removeClass(classesToRemove);
        
        if (val === null) {
            return this;
        } else {
            this.addClass(this.bootstrapSizePrefix+'-'+val);
            return this;
        }
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/traits/Sizeable.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/alert.js */
lucid.html.bootstrap.tags.alert = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'div';
	this.parameters = ['modifier', 'title'];
	this.title = null;
	this.bootstrapModifierPrefix = 'alert';
	this.bootstrapModifiersAllowed = ['success', 'warning','danger', 'info'];
	this.attributes['role'] = 'alert';
	this.addClass('alert');
};
lucid.html.bootstrap.tags.alert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.alert = lucid.html.bootstrap.tags.alert;

lucid.html.bootstrap.tags.alert.prototype.getTitle=function(){
    if (this.title === null) {
        this.title = this.build('strong');
    }
    return this.title;
};

lucid.html.bootstrap.tags.alert.prototype.setTitle=function(newValue){
    var title = this.get('title');
    title.children = [];
    title.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.alert.prototype.preChildren=function(){
    if (this.title !== null) {
        this.preChildrenHtml += String(this.title.render())+ ' ';
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/alert.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/anchor.js */
lucid.html.bootstrap.tags.anchor = function(){
	lucid.html.base.tags.anchor.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'a';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.anchor.prototype = Object.create(lucid.html.base.tags.anchor.prototype);
lucid.html.builder.tags.anchor = lucid.html.bootstrap.tags.anchor;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/anchor.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/anchorButton.js */
lucid.html.bootstrap.tags.anchorButton = function(){
	lucid.html.base.tags.button.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'a';
	this.parameters = ['modifier', 'onclick'];
	this.title = null;
	this.bootstrapModifierPrefix = 'btn';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info'];
	this.bootstrapSizePrefix = 'btn';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.attributes['role'] = 'button';
	this.attributes['type'] = null;
	this.addClass('btn');
};
lucid.html.bootstrap.tags.anchorButton.prototype = Object.create(lucid.html.base.tags.button.prototype);
lucid.html.builder.tags.anchorButton = lucid.html.bootstrap.tags.anchorButton;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/anchorButton.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/badge.js */
lucid.html.bootstrap.tags.badge = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);
	this.addTrait(lucid.html.bootstrap.traits.Pillable);

	this.tag = 'span';
	this.parameters = ['modifier'];
	this.bootstrapModifierPrefix = 'label';
	this.bootstrapModifiersAllowed = ['default', 'primary', 'secondary', 'success', 'warning','danger', 'info'];
	this.addClass('label');
};
lucid.html.bootstrap.tags.badge.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.badge = lucid.html.bootstrap.tags.badge;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/badge.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/button.js */
lucid.html.bootstrap.tags.button = function(){
	lucid.html.base.tags.button.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'button';
	this.parameters = ['modifier', 'onclick'];
	this.title = null;
	this.bootstrapModifierPrefix = 'btn';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'btn';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.attributes['type'] = 'button';
	this.addClass('btn');
};
lucid.html.bootstrap.tags.button.prototype = Object.create(lucid.html.base.tags.button.prototype);
lucid.html.builder.tags.button = lucid.html.bootstrap.tags.button;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/button.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/card.js */
lucid.html.bootstrap.tags.card = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.parameters = ['header', 'block', 'footer'];
	this.header = null;
	this.block = null;
	this.footer = null;
	this.addClass('card');
};
lucid.html.bootstrap.tags.card.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.card = lucid.html.bootstrap.tags.card;

lucid.html.bootstrap.tags.card.prototype.getHeader=function(){
    if (this.header === null) {
        this.header = this.build('cardHeader');
    }
    return this.header;
};

lucid.html.bootstrap.tags.card.prototype.setHeader=function(newValue){
    var header = this.get('header');
    header.children = [];
    header.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getBlock=function(){
    if (this.block === null) {
        this.block = this.build('cardBlock');
        this.add(this.block);
    }
    return this.block;
};

lucid.html.bootstrap.tags.card.prototype.setBlock=function(newValue){
    var block = this.get('block');
    block.children = [];
    block.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getFooter=function(){
    if (this.footer === null) {
        this.footer = this.build('cardFooter');
    }
    return this.footer;
};

lucid.html.bootstrap.tags.card.prototype.setFooter=function(newValue){
    var footer = this.get('footer');
    footer.children = [];
    footer.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getTitle=function(){
    return this.get('block').get('title');
};

lucid.html.bootstrap.tags.card.prototype.setTitle=function(newValue){
    var block = this.get('block');
    block.set('title', newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getSubtitle=function(){
    return this.get('block').get('subtitle');
};

lucid.html.bootstrap.tags.card.prototype.setSubtitle=function(newValue){
    var block = this.get('block');
    block.set('subtitle', newValue);
    return this;
};


lucid.html.bootstrap.tags.card.prototype.preChildren=function(){
    if (this.header !== null) {
        this.preChildrenHtml += String(this.header.render());
    }
    if (this.footer !== null) {
        this.postChildrenHtml += String(this.footer.render());
    }
    
    for (var i=0; i<this.children.length; i++) {
        if (typeof(this.children[i]) == 'object') {
            if (this.children[i].tag == 'ul') {
                for (var j=0; j<this.children[i].children.length; j++) {
                    this.children[i].children[j].addClass('list-group-item');
                }
            }
            if (this.children[i].tag == 'img') {
                if (i === 0 && this.header === null) {
                    this.children[i].addClass('card-img-top');
                } else if (i == (this.children.length - 1) && this.footer === null) {
                    this.children[i].addClass('card-img-bottom');
                }
            }
        }
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};


lucid.html.bootstrap.tags.card.prototype.add=function(child){
    if (typeof(child) == 'object') {
        if (
            child.hasClass('card-header') === true || 
            child.hasClass('card-block') === true || 
            child.hasClass('card-footer')  === true || 
            child.tag == 'ul' || 
            child.tag == 'img'
        ) {
            if (child.tag == 'ul') {
                child.addClass('list-group').addClass('list-group-flush');
            }
            return lucid.html.tag.prototype.add.call(this, child);
        } else {
            var block = this.get('block');
            block.add(child);
            return this;
        }
    } else {
        var block = this.get('block');
        block.add(child);
        return this;
    }
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/card.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardBlock.js */
lucid.html.bootstrap.tags.cardBlock = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.parameters = ['title', 'subtitle'];
	this.title = null;
	this.subtitle = null;
	this.addClass('card-block');
};
lucid.html.bootstrap.tags.cardBlock.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardBlock = lucid.html.bootstrap.tags.cardBlock;

lucid.html.bootstrap.tags.cardBlock.prototype.getTitle=function(){
    if (this.title === null) {
        this.title = this.build('cardTitle');
    }
    return this.title;
};

lucid.html.bootstrap.tags.cardBlock.prototype.setTitle=function(newValue){
    var title = this.get('title');
    title.children = [];
    title.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.cardBlock.prototype.getSubtitle=function(){
    if (this.subtitle === null) {
        this.subtitle = this.build('cardSubtitle');
    }
    return this.subtitle;
};

lucid.html.bootstrap.tags.cardBlock.prototype.setSubtitle=function(newValue){
    var subtitle = this.get('subtitle');
    subtitle.children = [];
    subtitle.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.cardBlock.prototype.preChildren=function(){
    if (this.title !== null) {
        this.preChildrenHtml += String(this.title.render());
    }
    if (this.subtitle !== null) {
        this.preChildrenHtml += String(this.subtitle.render());
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};

lucid.html.bootstrap.tags.cardBlock.prototype.add=function(child){
    if (typeof(child) == 'string') {
        lucid.html.tag.prototype.add.call(this, this.build('paragraph').addClass('card-text').add(child));
    } else {
        if (
            (child.tag == 'h3' && child.hasClass('card-title') === true) || 
            (child.tag == 'h4' && child.hasClass('card-title') === true) || 
            (child.tag == 'h6' && child.hasClass('card-subtitle') === true) || 
            (child.tag == 'a' && child.hasClass('btn') === true) || 
            (child.tag == 'a' && child.hasClass('card-link') === true) || 
            (child.tag == 'p' && child.hasClass('card-text') === true)
        ) {
            lucid.html.tag.prototype.add.call(this, child);
        } else {
            lucid.html.tag.prototype.add.call(this, this.build('paragraph').addClass('card-text').add(child));
        }
    }
    return this;
};

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardBlock.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardFooter.js */
lucid.html.bootstrap.tags.cardFooter = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('card-footer');
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.cardFooter.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardFooter = lucid.html.bootstrap.tags.cardFooter;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardFooter.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardHeader.js */
lucid.html.bootstrap.tags.cardHeader = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('card-header');
};
lucid.html.bootstrap.tags.cardHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardHeader = lucid.html.bootstrap.tags.cardHeader;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardHeader.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardSubtitle.js */
lucid.html.bootstrap.tags.cardSubtitle = function(){
	lucid.html.tag.call(this);
	this.tag = 'h6';
	this.addClass('card-subtitle');
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.cardSubtitle.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardSubtitle = lucid.html.bootstrap.tags.cardSubtitle;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardSubtitle.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardTitle.js */
lucid.html.bootstrap.tags.cardTitle = function(){
	lucid.html.tag.call(this);
	this.tag = 'h4';
	this.addClass('card-title');
};
lucid.html.bootstrap.tags.cardTitle.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardTitle = lucid.html.bootstrap.tags.cardTitle;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/cardTitle.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/div.js */
lucid.html.bootstrap.tags.div = function(){
	lucid.html.base.tags.div.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'div';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.div.prototype = Object.create(lucid.html.base.tags.div.prototype);
lucid.html.builder.tags.div = lucid.html.bootstrap.tags.div;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/div.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/formGroup.js */
lucid.html.bootstrap.tags.formGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'fieldset';
	this.addClass('form-group');
};
lucid.html.bootstrap.tags.formGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.formGroup = lucid.html.bootstrap.tags.formGroup;

lucid.html.bootstrap.tags.formGroup.prototype.preRender=function(){
    var checkboxSelector = new lucid.html.Selector('input[type=checkbox]');
    var checkboxes = this.queryChildren(checkboxSelector, true);

    var radioSelector = new lucid.html.Selector('input[type=radio]');
    var radios = this.queryChildren(radioSelector, true);

    if (checkboxes.length > 0) {
        this.tag = 'div';
        this.removeClass('form-group');
        this.addClass('checkbox');
		this.preChildrenHtml  += '<label>';
		this.postChildrenHtml += '</label>';
    }
    if (radios.length > 0) {
        this.tag = 'div';
        this.removeClass('form-group');
        this.addClass('radio');
		this.preChildrenHtml  += '<label>';
		this.postChildrenHtml += '</label>';
    }
    return lucid.html.tag.prototype.preRender.call(this);
};
/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/formGroup.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputEmail.js */
lucid.html.bootstrap.tags.inputEmail = function(){
	lucid.html.base.tags.inputEmail.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputEmail.prototype = Object.create(lucid.html.base.tags.inputEmail.prototype);
lucid.html.builder.tags.inputEmail = lucid.html.bootstrap.tags.inputEmail;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputEmail.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputFile.js */
lucid.html.bootstrap.tags.inputFile = function(){
	lucid.html.base.tags.inputFile.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control-file');
};
lucid.html.bootstrap.tags.inputFile.prototype = Object.create(lucid.html.base.tags.inputFile.prototype);
lucid.html.builder.tags.inputFile = lucid.html.bootstrap.tags.inputFile;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputFile.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputGroup.js */
lucid.html.bootstrap.tags.inputGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('input-group');
};
lucid.html.bootstrap.tags.inputGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.inputGroup = lucid.html.bootstrap.tags.inputGroup;

lucid.html.bootstrap.tags.inputGroup.prototype.add=function(child){
    if (typeof(child) == 'object') {
        if (child.tag == 'input' || child.tag == 'select' || child.tag == 'textarea') {
            lucid.html.tag.prototype.add.call(this, child);
        } else if (child.tag == 'button' || (child.tag == 'a' && child.hasClass('btn') === true)) {
            lucid.html.tag.prototype.add.call(this, '<span class="input-group-btn">');
            lucid.html.tag.prototype.add.call(this, child);
            lucid.html.tag.prototype.add.call(this, '</span>');
        } else {
            lucid.html.tag.prototype.add.call(this, '<span class="input-group-addon">');
            lucid.html.tag.prototype.add.call(this, child);
            lucid.html.tag.prototype.add.call(this, '</span>');
        }
    } else {
        lucid.html.tag.prototype.add.call(this, '<span class="input-group-addon">');
        lucid.html.tag.prototype.add.call(this, child);
        lucid.html.tag.prototype.add.call(this, '</span>');
    }
    return this;
};
/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputGroup.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputHelp.js */
lucid.html.bootstrap.tags.inputHelp = function(){
	lucid.html.tag.call(this);
	this.tag = 'small';
	this.addClass('text-muted');
};
lucid.html.bootstrap.tags.inputHelp.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.inputHelp = lucid.html.bootstrap.tags.inputHelp;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputHelp.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputNumber.js */
lucid.html.bootstrap.tags.inputNumber = function(){
	lucid.html.base.tags.inputNumber.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputNumber.prototype = Object.create(lucid.html.base.tags.inputNumber.prototype);
lucid.html.builder.tags.inputNumber = lucid.html.bootstrap.tags.inputNumber;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputNumber.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputPassword.js */
lucid.html.bootstrap.tags.inputPassword = function(){
	lucid.html.base.tags.inputPassword.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputPassword.prototype = Object.create(lucid.html.base.tags.inputPassword.prototype);
lucid.html.builder.tags.inputPassword = lucid.html.bootstrap.tags.inputPassword;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputPassword.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputSelect.js */
lucid.html.bootstrap.tags.inputSelect = function(){
	lucid.html.base.tags.inputSelect.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'select';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputSelect.prototype = Object.create(lucid.html.base.tags.inputSelect.prototype);
lucid.html.builder.tags.inputSelect = lucid.html.bootstrap.tags.inputSelect;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputSelect.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputTelephone.js */
lucid.html.bootstrap.tags.inputTelephone = function(){
	lucid.html.base.tags.inputTelephone.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputTelephone.prototype = Object.create(lucid.html.base.tags.inputTelephone.prototype);
lucid.html.builder.tags.inputTelephone = lucid.html.bootstrap.tags.inputTelephone;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputTelephone.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputText.js */
lucid.html.bootstrap.tags.inputText = function(){
	lucid.html.base.tags.inputText.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputText.prototype = Object.create(lucid.html.base.tags.inputText.prototype);
lucid.html.builder.tags.inputText = lucid.html.bootstrap.tags.inputText;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputText.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputTextarea.js */
lucid.html.bootstrap.tags.inputTextarea = function(){
	lucid.html.base.tags.inputTextarea.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'inputTextarea';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputTextarea.prototype = Object.create(lucid.html.base.tags.inputTextarea.prototype);
lucid.html.builder.tags.inputTextarea = lucid.html.bootstrap.tags.inputTextarea;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputTextarea.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputUrl.js */
lucid.html.bootstrap.tags.inputUrl = function(){
	lucid.html.base.tags.inputUrl.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'input';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
};
lucid.html.bootstrap.tags.inputUrl.prototype = Object.create(lucid.html.base.tags.inputUrl.prototype);
lucid.html.builder.tags.inputUrl = lucid.html.bootstrap.tags.inputUrl;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/inputUrl.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/paragraph.js */
lucid.html.bootstrap.tags.paragraph = function(){
	lucid.html.base.tags.paragraph.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'p';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.paragraph.prototype = Object.create(lucid.html.base.tags.paragraph.prototype);
lucid.html.builder.tags.paragraph = lucid.html.bootstrap.tags.paragraph;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/paragraph.js */

/* File start: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/span.js */
lucid.html.bootstrap.tags.span = function(){
	lucid.html.base.tags.span.call(this);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

	this.tag = 'span';
	this.bootstrapModifierPrefix = 'text';
	this.bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info', 'muted'];
};
lucid.html.bootstrap.tags.span.prototype = Object.create(lucid.html.base.tags.span.prototype);
lucid.html.builder.tags.span = lucid.html.bootstrap.tags.span;

/* File end: /Volumes/Lucid/html/bin/../src/Bootstrap/tags/span.js */
