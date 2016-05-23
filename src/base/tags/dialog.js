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