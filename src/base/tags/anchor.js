lucid.html.builder.tags.anchor = function(){
	lucid.html.tag.call(this);
	this.tag = 'a';
	this.parameters = ['href', 'child'];
};
lucid.html.builder.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.anchor.prototype.constructor = lucid.html.builder.tags.anchor;

lucid.html.builder.tags.anchor.prototype.init=function(){
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.builder.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};
