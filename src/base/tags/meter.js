lucid.html.base.tags.meter = function(){
	lucid.html.tag.call(this);
	this.tag = 'meter';
	this.allowedAttributes.push('form');
	this.allowedAttributes.push('high');
	this.allowedAttributes.push('low');
	this.allowedAttributes.push('max');
	this.allowedAttributes.push('min');
	this.allowedAttributes.push('optimum');
	this.allowedAttributes.push('value');
};
lucid.html.base.tags.meter.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.meter = lucid.html.base.tags.meter;
