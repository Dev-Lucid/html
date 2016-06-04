
lucid.html.bootstrap.tags.formGroup.prototype.preRender=function(){
    var checkboxSelector = new lucid.html.Selector('input[type=checkbox]');
    var checkboxes = this.queryChildren(checkboxSelector, true);

    var radioSelector = new lucid.html.Selector('input[type=radio]');
    var radios = this.queryChildren(radioSelector, true);

    if (checkboxes.length > 0) {
        this.tag = 'div';
        this.removeClass('form-group');
        this.addClass('checkbox');
		this.preChildrenHtml  += '<label>';
		this.postChildrenHtml += '</label>';
    }
    if (radios.length > 0) {
        this.tag = 'div';
        this.removeClass('form-group');
        this.addClass('radio');
		this.preChildrenHtml  += '<label>';
		this.postChildrenHtml += '</label>';
    }
    
    if (typeof(this.attributes.rowLayout) != 'undefined') {
        if (this.attributes.rowLayout === true) {
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
        this.attributes.rowLayout = null;
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
        this.label = this.add(this.build('label', field, label)).lastChild();
        this.field = this.add(this.build(inputType, field, value)).lastChild();
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
