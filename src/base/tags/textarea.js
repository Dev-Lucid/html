lucid.html.base.tags.textarea = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.base.traits.Disableable);

	this.tag = 'textarea';
	this.parameters = ['name', 'rows', 'cols'];
};
lucid.html.base.tags.textarea.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.textarea = lucid.html.base.tags.textarea;

lucid.html.base.tags.textarea.prototype.setValue=function(newValue){
    if (this.children.length === 0){
        this.add(newValue);
    } else {
        this.children = [];
        this.add(newValue);
    }
    return this;
};

lucid.html.base.tags.textarea.prototype.getValue=function(){
    if (this.children.length === 0){
        return '';
    } else {
        return this.renderChildren();
    }
};