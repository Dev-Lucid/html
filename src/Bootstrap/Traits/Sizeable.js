lucid.html.bootstrap.traits.Sizeable = {

    traitInit:function() {
        this.requireProperties('Pullable', ['bootstrapSizesAllowed', 'bootstrapSizePrefix']);
    },

    setSize:function(val) {
        if (this.bootstrapSizesAllowed.indexOf(val) < 0) {
            throw 'Class '+this.instantiatorName+' does not support size '+String(val)+'. The only supported modifiers are: '+(this.bootstrapSizesAllowed.join(', '));
        }

        var classesToRemove = [];
        for (var i=0; i<this.bootstrapSizesAllowed.length; i++) {
            classesToRemove.push(this.bootstrapSizePrefix + '-' + this.bootstrapSizesAllowed[i]);
        }
        this.removeClass(classesToRemove);
        
        if (val === null) {
            return this;
        } else {
            this.addClass(this.bootstrapSizePrefix+'-'+val);
            return this;
        }
    }
};
