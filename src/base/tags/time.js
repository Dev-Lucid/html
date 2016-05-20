lucid.html.base.tags.time = function(){
	lucid.html.tag.call(this);
	this.tag = 'time';
	this.allowedAttributes.push('datetime');
};
lucid.html.base.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.time = lucid.html.base.tags.time;
