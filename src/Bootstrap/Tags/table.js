lucid.html.bootstrap.tags.table = function(factory){
	this.factory = factory;
	lucid.html.base.tags.table.apply(this, arguments);
	this.tag = 'table';
	this.responsive = false;
	this.bootstrapInversePrefix = 'table';
	this.bootstrapSizePrefix = 'table';
	this.bootstrapSizesAllowed = ['sm', null];
	this.bootstrapModifierPrefix = 'table';
	this.bootstrapModifiersAllowed = ['success', 'warning', 'danger', 'info', 'active'];
	this.addClass('table');
	this.addTrait(lucid.html.bootstrap.traits.Gridable);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Inverseable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

};
lucid.html.bootstrap.tags.table.prototype = Object.create(lucid.html.base.tags.table.prototype);
lucid.html.factory.tags.table = lucid.html.bootstrap.tags.table;

lucid.html.bootstrap.tags.table.prototype.setBordered=function(val){
    if (val === true) {
        this.addClass('table-bordered');
    } else if (val === false) {
        this.removeClass('table-bordered');
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'bordered', val, ['true', 'false']);
    }
    return this;
};

lucid.html.bootstrap.tags.table.prototype.setHover=function(val){
    if (val === true) {
        this.addClass('table-hover');
    } else if (val === false) {
        this.removeClass('table-hover');
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'hover', val, ['true', 'false']);
    }
    return this;
};

lucid.html.bootstrap.tags.table.prototype.setStriped=function(val){
    if (val === true) {
        this.addClass('table-striped');
    } else if (val === false) {
        this.removeClass('table-striped');
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'striped', val, ['true', 'false']);
    }
    return this;
};


lucid.html.bootstrap.tags.table.prototype.setReflow=function(val){
    if (val === true) {
        this.addClass('table-reflow');
    } else if (val === false) {
        this.removeClass('table-reflow');
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'reflow', val, ['true', 'false']);
    }
    return this;
};

lucid.html.bootstrap.tags.table.prototype.setResponsive=function(val){
    if (val === true || val === false) {
        this.responsive = val;
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'responsive', val, ['true', 'false']);
    }
    return this;
};

lucid.html.bootstrap.tags.table.prototype.preRender=function(){
    if (this.responsive === true) {
        this.preHtml += '<div class="table-responsive">';
        this.postHtml += this.postHtml + '</div>';
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};
