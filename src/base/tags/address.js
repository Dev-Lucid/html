lucid.html.base.tags.address = function(){
	lucid.html.tag.call(this);
	this.tag = 'address';
};
lucid.html.base.tags.address.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.address.prototype.constructor = lucid.html.base.tags.address;
lucid.html.builder.tags.address = lucid.html.base.tags.address;
