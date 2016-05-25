lucid.html.base.traits.Autofocusable = {

    traitInit:function() {
        this.allowedAttributes.push('autofocus');
    },

    setAutofocus:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute autofocus only accepts values true or false.';
        }
        this.attributes.autofocus = val;
        return this;
    },

    renderAutofocus:function(){
        var val = (this.attributes.autofocus === true)?'autofocus':null;
        return val;
    }
};
