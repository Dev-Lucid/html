lucid.html.bootstrap.traits.Activable = {

    setActive:function(val) {
        if (val === true) {
            this.addClass('active');
        } else if (val === false) {
            this.removeClass('active');
        } else {
            throw 'Tag '+String(this.tag)+' active property may only be set to true or false';
        }
        return this;
    }
};
