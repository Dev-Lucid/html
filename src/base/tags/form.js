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
