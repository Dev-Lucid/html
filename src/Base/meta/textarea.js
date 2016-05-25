
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