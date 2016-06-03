lucid.html.bootstrap.tags.container = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
	this.addClass('container');
};
lucid.html.bootstrap.tags.container.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.container = lucid.html.bootstrap.tags.container;

lucid.html.bootstrap.tags.container.prototype.setFluid=function(val){
    if (val === true) {
        this.addClass('container-fluid');
        this.removeClass('container');
    } else if (val === false) {
        this.addClass('container');
        this.removeClass('container-fluid');
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'fluid', val, ['true', 'false']);
    }
    return this;
};
