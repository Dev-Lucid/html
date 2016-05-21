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
