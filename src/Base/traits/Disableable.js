lucid.html.base.traits.Disableable = {

    traitInit:function() {
        this.allowedAttributes.push('disabled');
    },

    setDisabled:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute checked only accepts values true or false.';
        }
        this.attributes.disabled = val;
        return this;
    },

    renderDisabled:function(){
        var val = (this.attributes.disabled === true)?'disabled':null;
        return val;
    }
};
