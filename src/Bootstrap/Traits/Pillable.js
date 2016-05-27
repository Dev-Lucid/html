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
            throw 'Class '+String(this.instantiatorName)+' pill property may only be set to true or false';
        }
        return this;
    }
};
