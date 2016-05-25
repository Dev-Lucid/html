lucid.html.bootstrap.tags.formGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'fieldset';
	this.addClass('form-group');
};
lucid.html.bootstrap.tags.formGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.formGroup = lucid.html.bootstrap.tags.formGroup;
