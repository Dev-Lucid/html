
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
    this.allowedAttributes = ['id', 'class', 'style', 'hidden', ];
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

lucid.html.tag.prototype.addTrait=function(){
};

lucid.html.tag.prototype.setProperties=function(params) {
    if (params.length > this.parameters.length) {
        throw 'Too many parameters for construction. Tag '+this.tag+' has the following parameters: '+this.parameters.join(', ');
    }

    for (var i=0;  i<params.length; i++) {
        var property = this.parameters[i];
        if (property == 'child') {
            this.add(params[i]);
        } else {
            this.set(property, params[i]);
        }
    }
};

lucid.html.tag.prototype.set=function(name, value) {
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    if (typeof(this['set'+key]) == 'function') {
        this['set_'+key](value);
    } else {
        this.attributes[name] = value;
    }
    return this;
};

lucid.html.tag.prototype.get=function(name){
    var key = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    if (typeof(this['get'+key]) == 'function') {
        return this['get'+key]();
    } else {
        return this.attributes[name];
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
                newClasses.push(classToRemove);
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
    this.attributes['hidden'] = val;
    return this;
};

lucid.html.tag.prototype.renderHidden=function() {
    var val = (this.attributes['hidden'] === true)?'hidden':null;
    return val;
};
/* File end: /Users/mike/projects/components/html/bin/../src/tag.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/abbreviation.js */
lucid.html.builder.tags.abbreviation = function(){
	this.tag = 'abbr';
	this.parameters = ['child', 'title'];
};
lucid.html.builder.tags.abbreviation.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/abbreviation.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/address.js */
lucid.html.builder.tags.address = function(){
	this.tag = 'address';
};
lucid.html.builder.tags.address.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/address.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/anchor.js */
lucid.html.builder.tags.anchor = function(){
	this.tag = 'a';
	this.parameters = ['href', 'child'];
};
lucid.html.builder.tags.anchor.prototype = new lucid.html.tag();

lucid.html.builder.tags.anchor.prototype.init=function(){
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	this.prototype.init.apply(this);
};

lucid.html.builder.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/anchor.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/article.js */
lucid.html.builder.tags.article = function(){
	this.tag = 'article';
};
lucid.html.builder.tags.article.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/article.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/blockquote.js */
lucid.html.builder.tags.blockquote = function(){
	this.tag = 'blockquote';
};
lucid.html.builder.tags.blockquote.prototype = new lucid.html.tag();

lucid.html.builder.tags.blockquote.prototype.init=function(){
	this.allowedAttributes.push('cite');
	this.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/blockquote.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/bold.js */
lucid.html.builder.tags.bold = function(){
	this.tag = 'b';
};
lucid.html.builder.tags.bold.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/bold.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/br.js */
lucid.html.builder.tags.br = function(){
	this.tag = 'br';
	this.allowQuickClose = false;
	this.allowChildren = false;
};
lucid.html.builder.tags.br.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/br.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/caption.js */
lucid.html.builder.tags.caption = function(){
	this.tag = 'caption';
};
lucid.html.builder.tags.caption.prototype = new lucid.html.tag();

lucid.html.builder.tags.caption.prototype.init=function(){
	this.allowedAttributes.push('align');
	this.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/caption.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/cite.js */
lucid.html.builder.tags.cite = function(){
	this.tag = 'cite';
};
lucid.html.builder.tags.cite.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/cite.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/code.js */
lucid.html.builder.tags.code = function(){
	this.tag = 'code';
};
lucid.html.builder.tags.code.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/code.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/columnGroup.js */
lucid.html.builder.tags.columnGroup = function(){
	this.tag = 'colgroup';
};
lucid.html.builder.tags.columnGroup.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/columnGroup.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definitionDescription.js */
lucid.html.builder.tags.definitionDescription = function(){
	this.tag = 'dd';
};
lucid.html.builder.tags.definitionDescription.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definitionDescription.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definitionList.js */
lucid.html.builder.tags.definitionList = function(){
	this.tag = 'dl';
};
lucid.html.builder.tags.definitionList.prototype = new lucid.html.tag();

lucid.html.builder.tags.definitionList.prototype.checkValidChild=function(child){
	if (['dd', 'dl'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag dl only allows these tags as children: dd, dl';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definitionList.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/definitionTerm.js */
lucid.html.builder.tags.definitionTerm = function(){
	this.tag = 'dt';
};
lucid.html.builder.tags.definitionTerm.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/definitionTerm.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/details.js */
lucid.html.builder.tags.details = function(){
	this.tag = 'details';
};
lucid.html.builder.tags.details.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/details.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/div.js */
lucid.html.builder.tags.div = function(){
	this.tag = 'div';
};
lucid.html.builder.tags.div.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/div.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/emphasis.js */
lucid.html.builder.tags.emphasis = function(){
	this.tag = 'em';
};
lucid.html.builder.tags.emphasis.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/emphasis.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/figure.js */
lucid.html.builder.tags.figure = function(){
	this.tag = 'figure';
};
lucid.html.builder.tags.figure.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/figure.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/figureCaption.js */
lucid.html.builder.tags.figureCaption = function(){
	this.tag = 'figcaption';
};
lucid.html.builder.tags.figureCaption.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/figureCaption.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/footer.js */
lucid.html.builder.tags.footer = function(){
	this.tag = 'footer';
};
lucid.html.builder.tags.footer.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/footer.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/form.js */
lucid.html.builder.tags.form = function(){
	this.tag = 'form';
	this.parameters = ['name', 'action'];
};
lucid.html.builder.tags.form.prototype = new lucid.html.tag();

lucid.html.builder.tags.form.prototype.init=function(){
	this.allowedAttributes.push('onsubmit');
	this.allowedAttributes.push('enctype');
	this.allowedAttributes.push('method');
	this.allowedAttributes.push('target');
	this.prototype.init.apply(this);
};

lucid.html.builder.tags.form.prototype.checkValidChild=function(child){
	if (['form'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag form does not allow these tags as children: form';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/form.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h1.js */
lucid.html.builder.tags.h1 = function(){
	this.tag = 'h1';
};
lucid.html.builder.tags.h1.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h1.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h2.js */
lucid.html.builder.tags.h2 = function(){
	this.tag = 'h2';
};
lucid.html.builder.tags.h2.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h2.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h3.js */
lucid.html.builder.tags.h3 = function(){
	this.tag = 'h3';
};
lucid.html.builder.tags.h3.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h3.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h4.js */
lucid.html.builder.tags.h4 = function(){
	this.tag = 'h4';
};
lucid.html.builder.tags.h4.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h4.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h5.js */
lucid.html.builder.tags.h5 = function(){
	this.tag = 'h5';
};
lucid.html.builder.tags.h5.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h5.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/h6.js */
lucid.html.builder.tags.h6 = function(){
	this.tag = 'h6';
};
lucid.html.builder.tags.h6.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/h6.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/header.js */
lucid.html.builder.tags.header = function(){
	this.tag = 'header';
};
lucid.html.builder.tags.header.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/header.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/hr.js */
lucid.html.builder.tags.hr = function(){
	this.tag = 'hr';
	this.allowQuickClose = false;
	this.allowChildren = false;
};
lucid.html.builder.tags.hr.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/hr.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/image.js */
lucid.html.builder.tags.image = function(){
	this.tag = 'img';
	this.parameters = ['src', 'width', 'height', 'alt'];
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.image.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/image.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/insert.js */
lucid.html.builder.tags.insert = function(){
	this.tag = 'ins';
};
lucid.html.builder.tags.insert.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/insert.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/italic.js */
lucid.html.builder.tags.italic = function(){
	this.tag = 'i';
};
lucid.html.builder.tags.italic.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/italic.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/label.js */
lucid.html.builder.tags.label = function(){
	this.tag = 'label';
	this.parameters = ['for', 'child'];
};
lucid.html.builder.tags.label.prototype = new lucid.html.tag();

lucid.html.builder.tags.label.prototype.init=function(){
	this.allowedAttributes.push('for');
	this.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/label.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/legend.js */
lucid.html.builder.tags.legend = function(){
	this.tag = 'legend';
};
lucid.html.builder.tags.legend.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/legend.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/listItem.js */
lucid.html.builder.tags.listItem = function(){
	this.tag = 'li';
};
lucid.html.builder.tags.listItem.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/listItem.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/main.js */
lucid.html.builder.tags.main = function(){
	this.tag = 'main';
};
lucid.html.builder.tags.main.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/main.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/mark.js */
lucid.html.builder.tags.mark = function(){
	this.tag = 'mark';
};
lucid.html.builder.tags.mark.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/mark.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/menu.js */
lucid.html.builder.tags.menu = function(){
	this.tag = 'menu';
};
lucid.html.builder.tags.menu.prototype = new lucid.html.tag();

lucid.html.builder.tags.menu.prototype.init=function(){
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
	this.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/menu.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/menuitem.js */
lucid.html.builder.tags.menuitem = function(){
	this.tag = 'menuitem';
};
lucid.html.builder.tags.menuitem.prototype = new lucid.html.tag();

lucid.html.builder.tags.menuitem.prototype.init=function(){
	this.allowedAttributes.push('checked');
	this.allowedAttributes.push('default');
	this.allowedAttributes.push('disabled');
	this.allowedAttributes.push('icon');
	this.allowedAttributes.push('label');
	this.allowedAttributes.push('radiogroup');
	this.allowedAttributes.push('type');
	this.prototype.init.apply(this);
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/menuitem.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/nav.js */
lucid.html.builder.tags.nav = function(){
	this.tag = 'nav';
};
lucid.html.builder.tags.nav.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/nav.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/orderedList.js */
lucid.html.builder.tags.orderedList = function(){
	this.tag = 'ol';
};
lucid.html.builder.tags.orderedList.prototype = new lucid.html.tag();

lucid.html.builder.tags.orderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ol only allows these tags as children: li';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/orderedList.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/paragraph.js */
lucid.html.builder.tags.paragraph = function(){
	this.tag = 'p';
};
lucid.html.builder.tags.paragraph.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/paragraph.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/preformatted.js */
lucid.html.builder.tags.preformatted = function(){
	this.tag = 'pre';
};
lucid.html.builder.tags.preformatted.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/preformatted.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/quote.js */
lucid.html.builder.tags.quote = function(){
	this.tag = 'q';
};
lucid.html.builder.tags.quote.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/quote.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/sample.js */
lucid.html.builder.tags.sample = function(){
	this.tag = 'samp';
};
lucid.html.builder.tags.sample.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/sample.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/section.js */
lucid.html.builder.tags.section = function(){
	this.tag = 'section';
};
lucid.html.builder.tags.section.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/section.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/small.js */
lucid.html.builder.tags.small = function(){
	this.tag = 'small';
};
lucid.html.builder.tags.small.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/small.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/span.js */
lucid.html.builder.tags.span = function(){
	this.tag = 'span';
};
lucid.html.builder.tags.span.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/span.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/strikethrough.js */
lucid.html.builder.tags.strikethrough = function(){
	this.tag = 's';
};
lucid.html.builder.tags.strikethrough.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/strikethrough.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/strong.js */
lucid.html.builder.tags.strong = function(){
	this.tag = 'strong';
};
lucid.html.builder.tags.strong.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/strong.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/subscript.js */
lucid.html.builder.tags.subscript = function(){
	this.tag = 'sub';
};
lucid.html.builder.tags.subscript.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/subscript.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/summary.js */
lucid.html.builder.tags.summary = function(){
	this.tag = 'summary';
};
lucid.html.builder.tags.summary.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/summary.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/superscript.js */
lucid.html.builder.tags.superscript = function(){
	this.tag = 'sup';
};
lucid.html.builder.tags.superscript.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/superscript.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableBody.js */
lucid.html.builder.tags.tableBody = function(){
	this.tag = 'tbody';
};
lucid.html.builder.tags.tableBody.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableBody.prototype.checkValidChild=function(child){
	if (['tr'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tbody only allows these tags as children: tr';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableBody.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableData.js */
lucid.html.builder.tags.tableData = function(){
	this.tag = 'td';
};
lucid.html.builder.tags.tableData.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableData.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	this.prototype.init.apply(this);
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
	this.tag = 'tfoot';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableFoot.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableFoot.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tfoot only allows these tags as children: th, td';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableFoot.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableHead.js */
lucid.html.builder.tags.tableHead = function(){
	this.tag = 'thead';
	this.preChildrenHtml = '<tr>';
	this.postChildrenHtml = '</tr>';
};
lucid.html.builder.tags.tableHead.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableHead.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag thead only allows these tags as children: th, td';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableHead.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/tableHeader.js */
lucid.html.builder.tags.tableHeader = function(){
	this.tag = 'th';
};
lucid.html.builder.tags.tableHeader.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableHeader.prototype.init=function(){
	this.allowedAttributes.push('rowspan');
	this.allowedAttributes.push('colspan');
	this.prototype.init.apply(this);
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
	this.tag = 'tr';
};
lucid.html.builder.tags.tableRow.prototype = new lucid.html.tag();

lucid.html.builder.tags.tableRow.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tr only allows these tags as children: th, td';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/tableRow.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/time.js */
lucid.html.builder.tags.time = function(){
	this.tag = 'time';
	this.parameters = ['datetime'];
};
lucid.html.builder.tags.time.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/time.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/underline.js */
lucid.html.builder.tags.underline = function(){
	this.tag = 'u';
};
lucid.html.builder.tags.underline.prototype = new lucid.html.tag();

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/underline.js */

/* File start: /Users/mike/projects/components/html/bin/../src/base/tags/unorderedList.js */
lucid.html.builder.tags.unorderedList = function(){
	this.tag = 'ul';
};
lucid.html.builder.tags.unorderedList.prototype = new lucid.html.tag();

lucid.html.builder.tags.unorderedList.prototype.checkValidChild=function(child){
	if (['li'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag ul only allows these tags as children: li';
	}
};

/* File end: /Users/mike/projects/components/html/bin/../src/base/tags/unorderedList.js */
