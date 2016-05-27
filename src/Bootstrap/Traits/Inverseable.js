lucid.html.bootstrap.traits.Inverseable = {
    traitInit:function(){
        this.requireProperties('Inverseable', ['bootstrapInversePrefix']);
    },
    setInverse:function(val) {
        if (val === true) {
            this.addClass(this.bootstrapInversePrefix + '-inverse');
        } else if (val === false) {
            this.removeClass(this.bootstrapInversePrefix + '-inverse');
        } else {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'inverse', val, ['true', 'false']);
        }
        return this;
    }
};
