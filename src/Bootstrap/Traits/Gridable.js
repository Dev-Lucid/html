lucid.html.bootstrap.traits.Gridable = {
    gridColumnNames: ['xs', 'sm', 'md', 'lg', 'xl'], 
    setGrid:function(val) {
        this.attributes.grid = val;
    }, 
    
    getGrid:function(){
        if (typeof(this.attributes.grid) != 'object') {
            return [];
        }
        return this.attributes.grid;
    },
    
    renderGrid:function(){
        if (typeof(this.attributes.grid) == 'object') {
            for(var i=0; i<this.gridColumnNames.length; i++) {
                if (i < this.attributes.grid.length && typeof(this.attributes.grid[i]) == 'number') {
                    this.addClass('col-'+this.gridColumnNames[i]+'-'+String(this.attributes.grid[i]));
                }
            }
        }
        return null;
    }
};
