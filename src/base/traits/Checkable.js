lucid.html.base.traits.Checkable = {

    traitInit:function() {
        this.allowedAttributes.push('checked');
    },

    setChecked:function(val){
        if (String(val) === '1') {
            val = true;
        } else if (String(val) === '0') {
            val = false;
        } else if (String(val) === '') {
            val = false;
        } else if (String(val) === 'true') {
            val = true;
        } else if (String(val) === 'false') {
            val = false;
        }


        var type = (typeof(this.attributes.type) == 'undefined')?'unknown':this.attributes.type;
        if (['radio', 'checkbox'].indexOf(type) < 0) {
            throw 'Attribute checked cannot be used on input type '+type+'; only for types radio and checkbox.';
        }

        if (typeof(val) != 'boolean') {
            throw 'Attribute checked only accepts values true or false.';
        }

        this.attributes.checked = (val === true || val === 'true' || val === 1 || val === String('1'));
        return this;
    },

    renderChecked:function(){
        var val = (this.attributes.checked === true)?'checked':null;
        return val;
    }
};