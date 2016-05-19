
/* File start: /Users/mike/projects/components/html/bin/../src/base/js/lucid.html.js */
if (typeof lucid == 'undefined') {
    var lucid = {};
}
lucid.html = {};

lucid.html.build=function(){
    return lucid.html.builder.build.apply(lucid.html.build, lucid.html.build.arguments);
};
/* File end: /Users/mike/projects/components/html/bin/../src/base/js/lucid.html.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/js/lucid.html.builder.js */
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
    return obj;
};


/* File end: /Users/mike/projects/components/html/bin/../src/base/js/lucid.html.builder.js */

/* File start: /Users/mike/projects/components/html/bin/../src/tag.js */
lucid.html.tag = function(){
    this.tag  = null;
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

    this.traits = [];

    this.init();
};

// sort of a compatibility hack for php traits
lucid.html.tag.prototype.addTrait=function(){
};

lucid.html.tag.prototype.build=function(){
    return lucid.html.build.apply(null, arguments);
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
            throw 'Invalid attribute '+name+'. Tag '+this.tag+' only allows these attributes: ' + (this.allowedAttributes.concat(this.parameters).join(', '));
        }
        this.attributes[name] = value;
    }
    return this;
};

lucid.html.tag.prototype.get=function(name){
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    if (typeof(this['get'+key]) == 'function') {
        return this['get'+key]();
    } else {
        if (typeof(this.attributes[name]) !== 'undefined') {
            return this.attributes[name];
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
/* File end: /Users/mike/projects/components/html/bin/../src/tag.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/abbreviation.js */
lucid.html.builder.tags.abbreviation = function(){
	lucid.html.tag.call(this);
	this.tag = 'abbr';
	this.parameters = ['title'];
};
lucid.html.builder.tags.abbreviation.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.abbreviation.prototype.constructor = lucid.html.builder.tags.abbreviation;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/abbreviation.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/address.js */
lucid.html.builder.tags.address = function(){
	lucid.html.tag.call(this);
	this.tag = 'address';
};
lucid.html.builder.tags.address.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.address.prototype.constructor = lucid.html.builder.tags.address;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/address.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/anchor.js */
lucid.html.builder.tags.anchor = function(){
	lucid.html.tag.call(this);
	this.tag = 'a';
	this.parameters = ['href'];
};
lucid.html.builder.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.anchor.prototype.constructor = lucid.html.builder.tags.anchor;

lucid.html.builder.tags.anchor.prototype.init=function(){
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.builder.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/anchor.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/article.js */
lucid.html.builder.tags.article = function(){
	lucid.html.tag.call(this);
	this.tag = 'article';
};
lucid.html.builder.tags.article.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.article.prototype.constructor = lucid.html.builder.tags.article;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/article.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/blockquote.js */
lucid.html.builder.tags.blockquote = function(){
	lucid.html.tag.call(this);
	this.tag = 'blockquote';
	this.parameters = ['cite'];
};
lucid.html.builder.tags.blockquote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.blockquote.prototype.constructor = lucid.html.builder.tags.blockquote;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/blockquote.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/bold.js */
lucid.html.builder.tags.bold = function(){
	lucid.html.tag.call(this);
	this.tag = 'b';
};
lucid.html.builder.tags.bold.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.bold.prototype.constructor = lucid.html.builder.tags.bold;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/bold.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/br.js */
lucid.html.builder.tags.br = function(){
	lucid.html.tag.call(this);
	this.tag = 'br';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.br.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.br.prototype.constructor = lucid.html.builder.tags.br;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/br.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/caption.js */
lucid.html.builder.tags.caption = function(){
	lucid.html.tag.call(this);
	this.tag = 'caption';
};
lucid.html.builder.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.caption.prototype.constructor = lucid.html.builder.tags.caption;

lucid.html.builder.tags.caption.prototype.init=function(){
	this.allowedAttributes.push('align');
	lucid.html.tag.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/caption.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/cite.js */
lucid.html.builder.tags.cite = function(){
	lucid.html.tag.call(this);
	this.tag = 'cite';
};
lucid.html.builder.tags.cite.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cite.prototype.constructor = lucid.html.builder.tags.cite;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/cite.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/code.js */
lucid.html.builder.tags.code = function(){
	lucid.html.tag.call(this);
	this.tag = 'code';
};
lucid.html.builder.tags.code.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.code.prototype.constructor = lucid.html.builder.tags.code;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/code.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/column.js */
lucid.html.builder.tags.column = function(){
	lucid.html.tag.call(this);
	this.tag = 'col';
};
lucid.html.builder.tags.column.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.column.prototype.constructor = lucid.html.builder.tags.column;

lucid.html.builder.tags.column.prototype.init=function(){
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('span');
	lucid.html.tag.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/column.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/columnGroup.js */
lucid.html.builder.tags.columnGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'colgroup';
};
lucid.html.builder.tags.columnGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.columnGroup.prototype.constructor = lucid.html.builder.tags.columnGroup;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/columnGroup.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definition.js */
lucid.html.builder.tags.definition = function(){
	lucid.html.tag.call(this);
	this.tag = 'dfn';
};
lucid.html.builder.tags.definition.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definition.prototype.constructor = lucid.html.builder.tags.definition;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definition.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definitionDescription.js */
lucid.html.builder.tags.definitionDescription = function(){
	lucid.html.tag.call(this);
	this.tag = 'dd';
};
lucid.html.builder.tags.definitionDescription.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionDescription.prototype.constructor = lucid.html.builder.tags.definitionDescription;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definitionDescription.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definitionList.js */
lucid.html.builder.tags.definitionList = function(){
	lucid.html.tag.call(this);
	this.tag = 'dl';
};
lucid.html.builder.tags.definitionList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionList.prototype.constructor = lucid.html.builder.tags.definitionList;

lucid.html.builder.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dt'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dt';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definitionList.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definitionTerm.js */
lucid.html.builder.tags.definitionTerm = function(){
	lucid.html.tag.call(this);
	this.tag = 'dt';
};
lucid.html.builder.tags.definitionTerm.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionTerm.prototype.constructor = lucid.html.builder.tags.definitionTerm;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definitionTerm.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/details.js */
lucid.html.builder.tags.details = function(){
	lucid.html.tag.call(this);
	this.tag = 'details';
};
lucid.html.builder.tags.details.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.details.prototype.constructor = lucid.html.builder.tags.details;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/details.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/div.js */
lucid.html.builder.tags.div = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
};
lucid.html.builder.tags.div.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.div.prototype.constructor = lucid.html.builder.tags.div;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/div.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/emphasis.js */
lucid.html.builder.tags.emphasis = function(){
	lucid.html.tag.call(this);
	this.tag = 'em';
};
lucid.html.builder.tags.emphasis.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.emphasis.prototype.constructor = lucid.html.builder.tags.emphasis;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/emphasis.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/figure.js */
lucid.html.builder.tags.figure = function(){
	lucid.html.tag.call(this);
	this.tag = 'figure';
};
lucid.html.builder.tags.figure.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figure.prototype.constructor = lucid.html.builder.tags.figure;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/figure.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/figureCaption.js */
lucid.html.builder.tags.figureCaption = function(){
	lucid.html.tag.call(this);
	this.tag = 'figcaption';
};
lucid.html.builder.tags.figureCaption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figureCaption.prototype.constructor = lucid.html.builder.tags.figureCaption;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/figureCaption.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/footer.js */
lucid.html.builder.tags.footer = function(){
	lucid.html.tag.call(this);
	this.tag = 'footer';
};
lucid.html.builder.tags.footer.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.footer.prototype.constructor = lucid.html.builder.tags.footer;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/footer.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/form.js */
lucid.html.builder.tags.form = function(){
	lucid.html.tag.call(this);
	this.tag = 'form';
	this.parameters = ['name', 'action'];
};
lucid.html.builder.tags.form.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.form.prototype.constructor = lucid.html.builder.tags.form;

lucid.html.builder.tags.form.prototype.init=function(){
	this.allowedAttributes.push('onsubmit');
	this.allowedAttributes.push('enctype');
	this.allowedAttributes.push('method');
	this.allowedAttributes.push('target');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.builder.tags.form.prototype.checkValidChild=function(child){
	if (['form'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag form does not allow these tags as children: form';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/form.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h1.js */
lucid.html.builder.tags.h1 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h1';
};
lucid.html.builder.tags.h1.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h1.prototype.constructor = lucid.html.builder.tags.h1;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h1.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h2.js */
lucid.html.builder.tags.h2 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h2';
};
lucid.html.builder.tags.h2.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h2.prototype.constructor = lucid.html.builder.tags.h2;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h2.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h3.js */
lucid.html.builder.tags.h3 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h3';
};
lucid.html.builder.tags.h3.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h3.prototype.constructor = lucid.html.builder.tags.h3;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h3.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h4.js */
lucid.html.builder.tags.h4 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h4';
};
lucid.html.builder.tags.h4.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h4.prototype.constructor = lucid.html.builder.tags.h4;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h4.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h5.js */
lucid.html.builder.tags.h5 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h5';
};
lucid.html.builder.tags.h5.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h5.prototype.constructor = lucid.html.builder.tags.h5;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h5.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h6.js */
lucid.html.builder.tags.h6 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h6';
};
lucid.html.builder.tags.h6.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h6.prototype.constructor = lucid.html.builder.tags.h6;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h6.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/header.js */
lucid.html.builder.tags.header = function(){
	lucid.html.tag.call(this);
	this.tag = 'header';
};
lucid.html.builder.tags.header.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.header.prototype.constructor = lucid.html.builder.tags.header;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/header.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/hr.js */
lucid.html.builder.tags.hr = function(){
	lucid.html.tag.call(this);
	this.tag = 'hr';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.hr.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.hr.prototype.constructor = lucid.html.builder.tags.hr;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/hr.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/image.js */
lucid.html.builder.tags.image = function(){
	lucid.html.tag.call(this);
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.image.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.image.prototype.constructor = lucid.html.builder.tags.image;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/image.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/insert.js */
lucid.html.builder.tags.insert = function(){
	lucid.html.tag.call(this);
	this.tag = 'ins';
};
lucid.html.builder.tags.insert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.insert.prototype.constructor = lucid.html.builder.tags.insert;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/insert.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/italic.js */
lucid.html.builder.tags.italic = function(){
	lucid.html.tag.call(this);
	this.tag = 'i';
};
lucid.html.builder.tags.italic.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.italic.prototype.constructor = lucid.html.builder.tags.italic;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/italic.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/label.js */
lucid.html.builder.tags.label = function(){
	lucid.html.tag.call(this);
	this.tag = 'label';
	this.parameters = ['for'];
};
lucid.html.builder.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.label.prototype.constructor = lucid.html.builder.tags.label;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/label.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/legend.js */
lucid.html.builder.tags.legend = function(){
	lucid.html.tag.call(this);
	this.tag = 'legend';
};
lucid.html.builder.tags.legend.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.legend.prototype.constructor = lucid.html.builder.tags.legend;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/legend.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/listItem.js */
lucid.html.builder.tags.listItem = function(){
	lucid.html.tag.call(this);
	this.tag = 'li';
};
lucid.html.builder.tags.listItem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.listItem.prototype.constructor = lucid.html.builder.tags.listItem;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/listItem.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/main.js */
lucid.html.builder.tags.main = function(){
	lucid.html.tag.call(this);
	this.tag = 'main';
};
lucid.html.builder.tags.main.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.main.prototype.constructor = lucid.html.builder.tags.main;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/main.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/mark.js */
lucid.html.builder.tags.mark = function(){
	lucid.html.tag.call(this);
	this.tag = 'mark';
};
lucid.html.builder.tags.mark.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.mark.prototype.constructor = lucid.html.builder.tags.mark;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/mark.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/menu.js */
lucid.html.builder.tags.menu = function(){
	lucid.html.tag.call(this);
	this.tag = 'menu';
};
lucid.html.builder.tags.menu.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.menu.prototype.constructor = lucid.html.builder.tags.menu;

lucid.html.builder.tags.menu.prototype.init=function(){
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
	lucid.html.tag.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/menu.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/menuitem.js */
lucid.html.builder.tags.menuitem = function(){
	lucid.html.tag.call(this);
	this.tag = 'menuitem';
};
lucid.html.builder.tags.menuitem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.menuitem.prototype.constructor = lucid.html.builder.tags.menuitem;

lucid.html.builder.tags.menuitem.prototype.init=function(){
	this.allowedAttributes.push('checked');
	this.allowedAttributes.push('default');
	this.allowedAttributes.push('disabled');
	this.allowedAttributes.push('icon');
	this.allowedAttributes.push('label');
	this.allowedAttributes.push('radiogroup');
	this.allowedAttributes.push('type');
	lucid.html.tag.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/menuitem.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/nav.js */
lucid.html.builder.tags.nav = function(){
	lucid.html.tag.call(this);
	this.tag = 'nav';
};
lucid.html.builder.tags.nav.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.nav.prototype.constructor = lucid.html.builder.tags.nav;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/nav.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/orderedList.js */
lucid.html.builder.tags.orderedList = function(){
	lucid.html.tag.call(this);
	this.tag = 'ol';
};
lucid.html.builder.tags.orderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.orderedList.prototype.constructor = lucid.html.builder.tags.orderedList;

lucid.html.builder.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/orderedList.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/paragraph.js */
lucid.html.builder.tags.paragraph = function(){
	lucid.html.tag.call(this);
	this.tag = 'p';
};
lucid.html.builder.tags.paragraph.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.paragraph.prototype.constructor = lucid.html.builder.tags.paragraph;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/paragraph.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/preformatted.js */
lucid.html.builder.tags.preformatted = function(){
	lucid.html.tag.call(this);
	this.tag = 'pre';
};
lucid.html.builder.tags.preformatted.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.preformatted.prototype.constructor = lucid.html.builder.tags.preformatted;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/preformatted.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/quote.js */
lucid.html.builder.tags.quote = function(){
	lucid.html.tag.call(this);
	this.tag = 'q';
};
lucid.html.builder.tags.quote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.quote.prototype.constructor = lucid.html.builder.tags.quote;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/quote.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/sample.js */
lucid.html.builder.tags.sample = function(){
	lucid.html.tag.call(this);
	this.tag = 'samp';
};
lucid.html.builder.tags.sample.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.sample.prototype.constructor = lucid.html.builder.tags.sample;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/sample.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/section.js */
lucid.html.builder.tags.section = function(){
	lucid.html.tag.call(this);
	this.tag = 'section';
};
lucid.html.builder.tags.section.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.section.prototype.constructor = lucid.html.builder.tags.section;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/section.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/small.js */
lucid.html.builder.tags.small = function(){
	lucid.html.tag.call(this);
	this.tag = 'small';
};
lucid.html.builder.tags.small.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.small.prototype.constructor = lucid.html.builder.tags.small;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/small.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/span.js */
lucid.html.builder.tags.span = function(){
	lucid.html.tag.call(this);
	this.tag = 'span';
};
lucid.html.builder.tags.span.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.span.prototype.constructor = lucid.html.builder.tags.span;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/span.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/strikethrough.js */
lucid.html.builder.tags.strikethrough = function(){
	lucid.html.tag.call(this);
	this.tag = 's';
};
lucid.html.builder.tags.strikethrough.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strikethrough.prototype.constructor = lucid.html.builder.tags.strikethrough;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/strikethrough.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/strong.js */
lucid.html.builder.tags.strong = function(){
	lucid.html.tag.call(this);
	this.tag = 'strong';
};
lucid.html.builder.tags.strong.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strong.prototype.constructor = lucid.html.builder.tags.strong;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/strong.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/subscript.js */
lucid.html.builder.tags.subscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sub';
};
lucid.html.builder.tags.subscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.subscript.prototype.constructor = lucid.html.builder.tags.subscript;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/subscript.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/summary.js */
lucid.html.builder.tags.summary = function(){
	lucid.html.tag.call(this);
	this.tag = 'summary';
};
lucid.html.builder.tags.summary.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.summary.prototype.constructor = lucid.html.builder.tags.summary;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/summary.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/superscript.js */
lucid.html.builder.tags.superscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sup';
};
lucid.html.builder.tags.superscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.superscript.prototype.constructor = lucid.html.builder.tags.superscript;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/superscript.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableBody.js */
lucid.html.builder.tags.tableBody = function(){
	lucid.html.tag.call(this);
	this.tag = 'tbody';
};
lucid.html.builder.tags.tableBody.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableBody.prototype.constructor = lucid.html.builder.tags.tableBody;

lucid.html.builder.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableBody.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableData.js */
lucid.html.builder.tags.tableData = function(){
	lucid.html.tag.call(this);
	this.tag = 'td';
};
lucid.html.builder.tags.tableData.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableData.prototype.constructor = lucid.html.builder.tags.tableData;

lucid.html.builder.tags.tableData.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.builder.tags.tableData.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag td does not allow these tags as children: th, td, tr';
	}
};

lucid.html.builder.tags.tableData.prototype.render_colspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableData.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableFoot.js */
lucid.html.builder.tags.tableFoot = function(){
	lucid.html.tag.call(this);
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableFoot.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableFoot.prototype.constructor = lucid.html.builder.tags.tableFoot;

lucid.html.builder.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableFoot.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableHead.js */
lucid.html.builder.tags.tableHead = function(){
	lucid.html.tag.call(this);
	this.tag = 'thead';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableHead.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableHead.prototype.constructor = lucid.html.builder.tags.tableHead;

lucid.html.builder.tags.tableHead.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag thead only allows these tags as children: th, td';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableHead.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableHeader.js */
lucid.html.builder.tags.tableHeader = function(){
	lucid.html.tag.call(this);
	this.tag = 'th';
};
lucid.html.builder.tags.tableHeader.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableHeader.prototype.constructor = lucid.html.builder.tags.tableHeader;

lucid.html.builder.tags.tableHeader.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.builder.tags.tableHeader.prototype.checkValidChild=function(child){
	if (['th', 'td', 'tr'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag th does not allow these tags as children: th, td, tr';
	}
};

lucid.html.builder.tags.tableHeader.prototype.render_colspan=function(child){
    var value = parseInt(this.attributes.colspan);
	if (value == 1) {
        return null;
    }
	return value;
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableHeader.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableRow.js */
lucid.html.builder.tags.tableRow = function(){
	lucid.html.tag.call(this);
	this.tag = 'tr';
};
lucid.html.builder.tags.tableRow.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableRow.prototype.constructor = lucid.html.builder.tags.tableRow;

lucid.html.builder.tags.tableRow.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tr only allows these tags as children: th, td';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableRow.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/time.js */
lucid.html.builder.tags.time = function(){
	lucid.html.tag.call(this);
	this.tag = 'time';
};
lucid.html.builder.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.time.prototype.constructor = lucid.html.builder.tags.time;

lucid.html.builder.tags.time.prototype.init=function(){
	this.allowedAttributes.push('datetime');
	lucid.html.tag.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/time.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/underline.js */
lucid.html.builder.tags.underline = function(){
	lucid.html.tag.call(this);
	this.tag = 'u';
};
lucid.html.builder.tags.underline.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.underline.prototype.constructor = lucid.html.builder.tags.underline;

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/underline.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/unorderedList.js */
lucid.html.builder.tags.unorderedList = function(){
	lucid.html.tag.call(this);
	this.tag = 'ul';
};
lucid.html.builder.tags.unorderedList.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.unorderedList.prototype.constructor = lucid.html.builder.tags.unorderedList;

lucid.html.builder.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/unorderedList.js */

lucid.html.tags.alert = function(){
}

lucid.html.tags.alert.prototype.init=function() {

    this.bootstrapModifierPrefix = 'alert';
    this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning'];
    this.parameters = ['modifier','title', 'msg'];
    this.autoclose = false;
    this.title = '';

    this.addTrait('bootstrap/traits/pullable', 'bootstrap/traits/modifiable');
    this.tag = 'div';
    this.addClass('alert');
    this.prototype.init();
};


lucid.html.tags.alert.prototype.preRender=function() {
    if (this.title !== '') {
        this.preChildrenHtml = lucid.html.build('strong', this.title);
    }
    return this.prototype.preRender();
};
