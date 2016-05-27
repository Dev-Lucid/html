lucid.html.bootstrap.traits.Modifiable = {

    traitInit:function() {
        this.requireProperties('Modifiable', ['bootstrapModifiersAllowed', 'bootstrapModifierPrefix']);
    },

    setModifier:function(val) {
        if (this.bootstrapModifiersAllowed.indexOf(val) < 0) {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'modifier', val, this.bootstrapModifiersAllowed);
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
