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