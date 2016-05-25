lucid.html.base.tags.anchor = function(){
	lucid.html.tag.call(this);
	this.tag = 'a';
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	this.parameters = ['href'];
};
lucid.html.base.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.anchor = lucid.html.base.tags.anchor;

lucid.html.base.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};
