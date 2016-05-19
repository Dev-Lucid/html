lucid.html.builder.tags.time = function(){
	lucid.html.tag.call(this);
	this.tag = 'time';
};
lucid.html.builder.tags.time.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.time.prototype.constructor = lucid.html.builder.tags.time;

lucid.html.builder.tags.time.prototype.init=function(){
	this.allowedAttributes.push('datetime');
	lucid.html.tag.prototype.init.apply(this);
};
