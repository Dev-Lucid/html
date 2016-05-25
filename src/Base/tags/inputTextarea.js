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