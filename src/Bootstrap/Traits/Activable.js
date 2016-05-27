lucid.html.bootstrap.traits.Activable = {

    setActive:function(val) {
        if (val === true) {
            this.addClass('active');
        } else if (val === false) {
            this.removeClass('active');
        } else {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'active', val, ['true', 'false']);
        }
        return this;
    }
};
