lucid.html.base.tags.dialog = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dialog';
	this.allowedAttributes.push('open');
};
lucid.html.base.tags.dialog.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.dialog = lucid.html.base.tags.dialog;

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