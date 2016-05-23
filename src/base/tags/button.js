lucid.html.base.tags.button = function(){
	lucid.html.tag.call(this);
	this.addTrait(lucid.html.base.traits.Disableable);
	this.addTrait(lucid.html.base.traits.Autofocusable);

	this.tag = 'button';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('name');
	this.parameters = ['child', 'onclick'];
	this.attributes['type'] = 'button';
};
lucid.html.base.tags.button.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.button = lucid.html.base.tags.button;
