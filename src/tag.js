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
    if (typeof(this['set_'+name]) == 'function') {
        this['set_'+name](value);
    } else {
        this.attributes[name] = value;
    }
    return this;
};

lucid.html.tag.prototype.get=function(name){
    if (typeof(this['get_'+name]) == 'function') {
        return this['get_'+name]();
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
        renderMethod = 'render'+key;
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