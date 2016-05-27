lucid.html.bootstrap.tags.formGroup = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'fieldset';
	this.addClass('form-group');
};
lucid.html.bootstrap.tags.formGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.formGroup = lucid.html.bootstrap.tags.formGroup;

lucid.html.bootstrap.tags.formGroup.prototype.preRender=function(){
    var checkboxSelector = new lucid.html.Selector('input[type=checkbox]');
    var checkboxes = this.queryChildren(checkboxSelector, true);

    var radioSelector = new lucid.html.Selector('input[type=radio]');
    var radios = this.queryChildren(radioSelector, true);

    if (checkboxes.length > 0) {
        this.tag = 'div';
        this.removeClass('form-group');
        this.addClass('checkbox');
		this.preChildrenHtml  += '<label>';
		this.postChildrenHtml += '</label>';
    }
    if (radios.length > 0) {
        this.tag = 'div';
        this.removeClass('form-group');
        this.addClass('radio');
		this.preChildrenHtml  += '<label>';
		this.postChildrenHtml += '</label>';
    }
    return lucid.html.tag.prototype.preRender.call(this);
};