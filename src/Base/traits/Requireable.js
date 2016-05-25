lucid.html.base.traits.Requireable = {

    traitInit:function() {
        this.allowedAttributes.push('required');
    },

    setRequired:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute required only accepts values true or false.';
        }
        this.attributes.required = val;
        return this;
    },

    renderRequired:function(){
        var val = (this.attributes.required === true)?'required':null;
        return val;
    }
};
