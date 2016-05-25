    
lucid.html.base.tags.select.prototype.preRender=function(){
    if (this.children.length > 0) {
        for (var i=0; i<this.children.length; i++) {
            this.children[i].setSelected((this.children[i].get('value') == this.value));
        }
    }
    if (this.data !== null) {
        for (var i=0; i<this.data.length; i++) {
            var value = '';
            var label = '';
            if (typeof(this.data[i].label) != 'undefined') {
                value = this.data[i].value;
                label = this.data[i].label;
            } else if (typeof(this.data[i][1]) != 'undefined') {
                value = this.data[i][0];
                label = this.data[i][1];
            }
            
            this.add(lucid.html.build('option', value, label, (this.value == value)));
        }
        
    }
    return lucid.html.tag.prototype.preRender.call(this);
};

lucid.html.base.tags.select.prototype.setValue=function(newValue) {
    this.value = newValue;
    if (this.children.length > 0) {
        for(var i=0; i<this.children.length; i++) {
            this.children[i].setSelected((this.children[i].getValue() == this.value));
        }
    }
    return this;
};
