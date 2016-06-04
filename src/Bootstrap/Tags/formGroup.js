lucid.html.bootstrap.tags.formGroup = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'fieldset';
	this.parameters = ['field', 'label', 'inputType', 'value', 'help'];
	this.gridSizeMinimum = 'sm';
	this.gridSizeLabel = 2;
	this.gridSizeField = 10;
	this.addClass('form-group');
};
lucid.html.bootstrap.tags.formGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.formGroup = lucid.html.bootstrap.tags.formGroup;

lucid.html.bootstrap.tags.formGroup.prototype.preRender=function(){
    var checkboxSelector = new lucid.html.Selector('input[type=checkbox]');
    var checkboxes = this.queryChildren(checkboxSelector, true);

    var radioSelector = new lucid.html.Selector('input[type=radio]');
    var radios = this.queryChildren(radioSelector, true);
    
    var useRowLayout = (typeof(this.attributes.rowLayout) != 'undefined' && this.attributes.rowLayout === true);
    this.attributes.rowLayout = null;
    
    if (checkboxes.length > 0 || radios.length > 0) {
        this.tag = 'div';
        
        if (useRowLayout === true) {
            
            this.preChildrenHtml  += '<label class="form-check-label">';
            this.postChildrenHtml = '</label>'+this.postChildrenHtml;

            this.preChildrenHtml  = '<label class="col-'+this.gridSizeMinimum+'-'+String(this.gridSizeLabel)+'"></label><div class="col-'+this.gridSizeMinimum+'-'+String(this.gridSizeField)+'"><div class="form-check">'+this.preChildrenHtml;
            this.postChildrenHtml += '</div></div>';
            
            for (var i=0; i < checkboxes.length; i++) {
                checkboxes[i].addClass('form-check-input');
            }
            
            for (var j=0; j < radios.length; j++) {
                radios[j].addClass('form-check-input');
            }
        } else {
            this.removeClass('form-group');
            this.addClass(((checkboxes.length > 0)?'checkbox':'radio'));
    		this.preChildrenHtml  += '<label>';
    		this.postChildrenHtml += '</label>';
        }
    }

    
    if (useRowLayout === true) {
        this.addClass('row');
        
        var labels = this.queryChildren(new lucid.html.Selector('label'), true);
        for (var i=0; i<labels.length; i++) {
            labels[i].addClass('col-sm-'+String(this.gridSizeLabel));
            labels[i].addClass('col-form-label');
        }
        
        var fields = this.queryChildren(new lucid.html.Selector('.form-control'), true);
        for (var j=0; j<fields.length; j++) {
            fields[j].preHtml += '<div class="col-'+this.gridSizeMinimum+'-'+String(this.gridSizeField)+'">';
            fields[j].postHtml = '</div>' + fields[j].postHtml;
        }
    }
    return lucid.html.tag.prototype.preRender.call(this);
};

lucid.html.bootstrap.tags.formGroup.prototype.setRowLayout=function(val){
    if (val === true || val === false) {
        this.attributes.rowLayout = val;
    } else {
        throw new lucid.html.exception.InvalidAttributeValue(this.instantiatorName, 'rowLayout', val, ['true', 'false']);
    }
    return this;
};

lucid.html.bootstrap.tags.formGroup.prototype.setProperties=function(params) {
    var field     = (params.length > 0)?params[0]:null;
    var label     = (params.length > 1)?params[1]:null;
    var inputType = (params.length > 2)?params[2]:null;
    var value     = (params.length > 3)?params[3]:null;
    var help      = (params.length > 4)?params[4]:null;
    
    if (field !== null) {
        if (inputType == 'inputCheckbox') {
            this.field = this.add(this.build(inputType, field, value, label)).lastChild();            
        } else if (inputType == 'inputRadio') {
            this.field = this.add(this.build(inputType, field, value, label)).lastChild();
        } else {
            this.label = this.add(this.build('label', field, label)).lastChild();
            this.field = this.add(this.build(inputType, field, value)).lastChild();
        }
    }
    if (help !== null) {
        this.help = this.add(this.build('inputHelp', help)).lastChild();
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
