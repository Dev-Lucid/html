lucid.html.base.tags.meter = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
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
lucid.html.factory.tags.meter = lucid.html.base.tags.meter;
