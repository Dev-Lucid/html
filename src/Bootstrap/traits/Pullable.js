lucid.html.bootstrap.traits.Pullable = {
    setPull:function(val) {
        val = String(val);
        this.removeClass(['pull-left', 'pull-right']);
        if (val == 'left') {
            this.addClass('pull-left');
        }
        if (val == 'right') {
            this.addClass('pull-right');
        } 
        return this;
    }
};
