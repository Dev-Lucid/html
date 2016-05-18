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
