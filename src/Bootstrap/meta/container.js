
lucid.html.bootstrap.tags.container.prototype.setFluid=function(val){
    if (val === true) {
        this.addClass('container-fluid');
    } else if (val === false) {
        this.removeClass('container-fluid');
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'fluid', val, ['true', 'false']);
    }
    return this;
};
