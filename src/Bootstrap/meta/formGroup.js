
lucid.html.bootstrap.tags.formGroup.prototype.preRender=function(){
    if (this.useCheckableLayout === true) {
        this.addClass('form-group');
        this.preChildrenHtml += '<div class="' + this.checkableLayoutClass + '">';
        this.postChildrenHtml = '</div>' + this.postChildrenHtml;
        if (this.useRowLayout === true) {
            this.addClass('row');
            this.groupLabel.addClass('col-' + this.gridSizeMinimum + '-' + String(this.gridSizeLabel));
            this.groupLabel.addClass('col-form-label');
            this.preChildrenHtml += '<div class="col-' + String(this.gridSizeMinimum) + '-' + String(this.gridSizeField) + '">';
            this.postChildrenHtml = '</div>' + this.postChildrenHtml;
            for (var i=0; i<this.children.length; i++) {
                this.children[i].preHtml = '<div class="form-check"><label class="form-check-label">' + this.children[i].preHtml;
                this.children[i].postHtml += '</label></div>';
            }
        } else {
            for (var i=0; i<this.children.length; i++) {
                this.children[i].preHtml += '<label>';
                this.children[i].postHtml = '</label>' + this.children[i].postHtml;
            }
        }
    } else {
        this.addClass('form-group');
        if (this.useRowLayout === true) {
            this.addClass('row');
            this.groupLabel.addClass('col-' + String(this.gridSizeMinimum) + '-' + String(this.gridSizeLabel));
            this.groupLabel.addClass('col-form-label');
            
            var first = true;
            for (var i=0; i<this.children.length; i++) {
                if (first === true) {
                    this.children[i].preHtml += '<div class="col-' + String(this.gridSizeMinimum) + '-' + String(this.gridSizeField) + '">';
                    first = false;
                } else {
                    this.children[i].preHtml += '<div class="col-' + String(this.gridSizeMinimum) + '-' + String(this.gridSizeField) + ' col-offset-' + String(this.gridSizeMinimum) + '-' + String(this.gridSizeLabel) + '">';
                }
                this.children[i].postHtml = '</div>' + this.children[i].postHtml;
            }
        } else {
            // nothing to do in this case!
        }
    }
    
    if (this.groupLabel !== null) {
        this.preChildrenHtml = this.groupLabel.render() + this.preChildrenHtml;
    }
    
    return lucid.html.tag.prototype.preRender.call(this);
};

lucid.html.bootstrap.tags.formGroup.prototype.setUseRowLayout=function(val){
    if (val === true || val === false) {
        this.useRowLayout = val;
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'useRowLayout', val, ['true', 'false']);
    }
    return this;
};

lucid.html.bootstrap.tags.formGroup.prototype.setProperties=function(params) {
    var inputType = (params.length > 0)?params[0]:null;
    var groupLabel, field, checked, value, label, help;
    if (inputType == 'inputCheckbox') { 
		groupLabel= (params.length > 1)?params[1]:null;
		field     = (params.length > 2)?params[2]:null;
		checked   = (params.length > 3)?params[3]:null;
		label     = (params.length > 4)?params[4]:null;
		help      = (params.length > 5)?params[5]:null;
    } else if (inputType == 'inputRadio') {
		groupLabel= (params.length > 1)?params[1]:null;
		field     = (params.length > 2)?params[2]:null;
		value     = (params.length > 3)?params[3]:null;
		checked   = (params.length > 4)?params[4]:null;
		label     = (params.length > 5)?params[5]:null;
		help      = (params.length > 6)?params[6]:null;
    } else {
		groupLabel= (params.length > 1)?params[1]:null;
	    field     = (params.length > 2)?params[2]:null;
		value     = (params.length > 3)?params[3]:null;
		help      = (params.length > 4)?params[4]:null;
    }
    
    if (groupLabel !== null) {
        if (groupLabel == '') {
            groupLabel = '&nbsp;';
        }
        this.groupLabel = this.build('label', field, groupLabel);
    }
    if (field !== null) {
        if (inputType == 'inputCheckbox') {
		    this.add(this.build(inputType, field, checked, label));
        } else if (inputType == 'inputRadio') {
		    this.add(this.build(inputType, field, value, checked, label));
        } else {
		    this.add(this.build(inputType, field, value));
        }
        
        if (help !== null) {
            this.children[0].postHtml += '<br />' + String(this.build('inputHelp', help).render());
    	}
	}
	
    
    return this;
};

lucid.html.bootstrap.tags.formGroup.prototype.getField=function() {
    return this.field;
};

lucid.html.bootstrap.tags.formGroup.prototype.getLabel=function() {
    return this.label;
};

lucid.html.bootstrap.tags.formGroup.prototype.getHelp=function() {
    return this.help;
};

lucid.html.bootstrap.tags.formGroup.prototype.setGridSizeMinimum=function(val) {
    this.gridSizeMinimum = val;
    return this;
};

lucid.html.bootstrap.tags.formGroup.prototype.setGridSizeLabel=function(val) {
    this.gridSizeLabel = val;
    return this;
};

lucid.html.bootstrap.tags.formGroup.prototype.setGridSizeField=function(val) {
    this.gridSizeField = val;
    return this;
};

lucid.html.bootstrap.tags.formGroup.prototype.add=function(child){
    if (typeof(child) == 'string') {
        lucid.html.tag.prototype.add.call(this, child);
    } else {
        if (child.tag == 'input' && child.get('type') == 'checkbox') {
            this.useCheckableLayout = true;
            this.checkableLayoutClass = 'checkbox';
            lucid.html.tag.prototype.add.call(this, child);
        } else if (child.tag == 'input' && child.get('type') == 'radio') {
            this.useCheckableLayout = true;
            this.checkableLayoutClass = 'radio';
            lucid.html.tag.prototype.add.call(this, child);
        } else {
            lucid.html.tag.prototype.add.call(this, child);
        }
    }
    return this;
};
