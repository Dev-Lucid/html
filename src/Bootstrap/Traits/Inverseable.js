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
            throw 'Tag '+String(this.tag)+' inverse property may only be set to true or false';
        }
        return this;
    }
};
