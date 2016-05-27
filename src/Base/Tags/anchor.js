lucid.html.base.tags.anchor = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'a';
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	this.parameters = ['href'];
};
lucid.html.base.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.anchor = lucid.html.base.tags.anchor;

lucid.html.base.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};
