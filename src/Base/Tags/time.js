lucid.html.base.tags.time = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'time';
	this.allowedAttributes.push('datetime');
};
lucid.html.base.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.time = lucid.html.base.tags.time;
