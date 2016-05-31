lucid.html.bootstrap.tags.inputTextarea = function(factory){
	this.factory = factory;
	lucid.html.base.tags.inputTextarea.apply(this, arguments);
	this.tag = 'textarea';
	this.bootstrapModifierPrefix = 'form-control';
	this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	this.bootstrapSizePrefix = 'form-control';
	this.bootstrapSizesAllowed = ['sm', 'lg'];
	this.addClass('form-control');
	this.addTrait(lucid.html.bootstrap.traits.Gridable);
	this.addTrait(lucid.html.bootstrap.traits.Modifiable);
	this.addTrait(lucid.html.bootstrap.traits.Sizeable);
	this.addTrait(lucid.html.bootstrap.traits.Pullable);

};
lucid.html.bootstrap.tags.inputTextarea.prototype = Object.create(lucid.html.base.tags.inputTextarea.prototype);
lucid.html.factory.tags.inputTextarea = lucid.html.bootstrap.tags.inputTextarea;

lucid.html.bootstrap.tags.inputTextarea.prototype.preRender=function(){
    var classes = [];
    
    var grid = this.get('grid');
    if (grid.length > 0) {
        this.set('grid', []);
        for(var i=0; i<this.gridColumnNames.length; i++) {
            if (i < grid.length && typeof(grid[i]) == 'number') {
                classes.push('col-'+this.gridColumnNames[i]+'-'+String(grid[i]));
            }
        }
    }
    
    var offset = this.get('offset');
    if (offset.length > 0) {
        this.set('offset', []);
        for(var i=0; i<this.gridColumnNames.length; i++) {
            if (i < offset.length && typeof(offset[i]) == 'number') {
                classes.push('offset-'+this.gridColumnNames[i]+'-'+String(offset[i]));
            }
        }
    }
    
    var push = this.get('gridPush');
    if (push.length > 0) {
        this.set('gridPush', []);
        for(var i=0; i<this.gridColumnNames.length; i++) {
            if (i < push.length && typeof(push[i]) == 'number') {
                classes.push('push-'+this.gridColumnNames[i]+'-'+String(push[i]));
            }
        }
    }
    
    var pull = this.get('gridPull');
    if (pull.length > 0) {
        this.set('gridPull', []);
        for(var i=0; i<this.gridColumnNames.length; i++) {
            if (i < pull.length && typeof(pull[i]) == 'number') {
                classes.push('pull-'+this.gridColumnNames[i]+'-'+String(pull[i]));
            }
        }
    }
    
    if (classes.length > 0) {
        this.preHtml += '<div class="'+classes.join(' ')+'">';
        this.postHtml = '</div>' + this.postHtml;
    }
    
    return lucid.html.base.tags.inputText.prototype.preRender.call(this);
};