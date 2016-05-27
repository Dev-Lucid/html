lucid.html.bootstrap.traits.Pillable = {
    traitInit:function(){
        this.requireProperties('Pillable', ['bootstrapPillPrefix']);
    },
    setPill:function(val) {
        if (val === true) {
            this.addClass(this.bootstrapPillPrefix+'-pill');
        } else if (val === false) {
            this.removeClass(this.bootstrapPillPrefix+'-pill');
        } else {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'pill', val, ['true', 'false']);
        }
        return this;
    }
};
