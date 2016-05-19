lucid.html.base.tags.anchor = function(){
	lucid.html.tag.call(this);
	this.tag = 'a';
	this.parameters = ['href'];
};
lucid.html.base.tags.anchor.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.anchor.prototype.constructor = lucid.html.base.tags.anchor;
lucid.html.builder.tags.anchor = lucid.html.base.tags.anchor;

lucid.html.base.tags.anchor.prototype.init=function(){
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	lucid.html.tag.prototype.init.apply(this);
};

lucid.html.base.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};
