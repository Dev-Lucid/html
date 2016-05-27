lucid.html.base.traits.Readonlyable = {

    traitInit:function() {
        this.allowedAttributes.push('readonly');
    },

    setReadonly:function(val) {
        if (val !== true && val !== false) {
            throw 'Attribute readonly only accepts values true or false.';
        }
        this.attributes.readonly = val;
        return this;
    },

    renderReadonly:function(){
        var val = (this.attributes.readonly === true)?'readonly':null;
        return val;
    }
};
