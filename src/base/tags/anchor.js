lucid.html.builder.tags.anchor = function(){
	this.tag = 'a';
	this.parameters = ['href', 'child'];
};
lucid.html.builder.tags.anchor.prototype = new lucid.html.tag();

lucid.html.builder.tags.anchor.prototype.init=function(){
	this.allowedAttributes.push('name');
	this.allowedAttributes.push('target');
	this.prototype.init.apply(this);
};

lucid.html.builder.tags.anchor.prototype.checkValidChild=function(child){
	if (['a'].indexOf(child.tag) >= 0) {
		throw 'Invalid child. Tag a does not allow these tags as children: a';
	}
};
