lucid.html.base.tags.form = function(){
	lucid.html.tag.call(this);
	this.tag = 'form';
	this.allowedAttributes.push('onsubmit');
	this.allowedAttributes.push('enctype');
	this.allowedAttributes.push('method');
	this.allowedAttributes.push('target');
	this.parameters = ['name', 'action'];
};
lucid.html.base.tags.form.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.form = lucid.html.base.tags.form;

lucid.html.base.tags.form.prototype.checkValidChild=function(child){
	if (['form'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag form does not allow these tags as children: form';
	}
};
