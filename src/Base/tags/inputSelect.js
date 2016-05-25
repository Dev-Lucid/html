lucid.html.base.tags.inputSelect = function(){
	lucid.html.tag.call(this);
	this.tag = 'select';
	this.parameters = ['name', 'value', 'data', 'onchange'];
	this.data = null;
	this.value = null;
};
lucid.html.base.tags.inputSelect.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.inputSelect = lucid.html.base.tags.inputSelect;

lucid.html.base.tags.inputSelect.prototype.checkValidChild=function(child){
	if (['option', 'optgroup'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag select only allows these tags as children: option, optgroup';
	}
};
    
lucid.html.base.tags.inputSelect.prototype.preRender=function(){
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

lucid.html.base.tags.inputSelect.prototype.setValue=function(newValue) {
    this.value = newValue;
    if (this.children.length > 0) {
        for(var i=0; i<this.children.length; i++) {
            this.children[i].setSelected((this.children[i].getValue() == this.value));
        }
    }
    return this;
};
