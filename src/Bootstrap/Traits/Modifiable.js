lucid.html.bootstrap.traits.Modifiable = {

    traitInit:function() {
        // check for
    },

    setModifier:function(val) {
        if (this.bootstrapModifiersAllowed.indexOf(val) < 0) {
            throw 'Tag '+this.instantiatorName+' does not support modifier '+String(val)+'. The only supported modifiers are: '+(this.bootstrapModifiersAllowed.join(', '));
        }

        var classesToRemove = [];
        for (var i=0; i<this.bootstrapModifiersAllowed.length; i++) {
            classesToRemove.push(this.bootstrapModifierPrefix + '-' + this.bootstrapModifiersAllowed[i]);
        }
        this.removeClass(classesToRemove);
        
        if (val === null) {
            return this;
        } else {
            this.addClass(this.bootstrapModifierPrefix+'-'+val);
            return this;
        }
    }
};
