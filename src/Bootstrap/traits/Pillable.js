lucid.html.bootstrap.traits.Pillable = {

    setPill:function(val) {
        if (val === true) {
            this.addClass('label-pill');
        } else if (val === false) {
            this.removeClass('label-pill');
        } else {
            throw 'Tag '+String(this.tag)+' pill property may only be set to true or false';
        }
        return this;
    }
};
