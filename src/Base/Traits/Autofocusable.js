lucid.html.base.traits.Autofocusable = {

    traitInit:function() {
        this.allowedAttributes.push('autofocus');
    },

    setAutofocus:function(val) {
        if (val !== true && val !== false) {
            throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'autofocus', val, ['true', 'false']);
        }
        this.attributes.autofocus = val;
        return this;
    },

    renderAutofocus:function(){
        var val = (this.attributes.autofocus === true)?'autofocus':null;
        return val;
    }
};
