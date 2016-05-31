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
    },
    
    setOffset:function(val) {
        this.attributes.offset = val;
    }, 
    
    getOffset:function(){
        if (typeof(this.attributes.offset) != 'object') {
            return [];
        }
        return this.attributes.offset;
    },
    
    renderOffset:function(){
        if (typeof(this.attributes.offset) == 'object') {
            for(var i=0; i<this.gridColumnNames.length; i++) {
                if (i < this.attributes.offset.length && typeof(this.attributes.offset[i]) == 'number') {
                    this.addClass('offset-'+this.gridColumnNames[i]+'-'+String(this.attributes.offset[i]));
                }
            }
        }
        return null;
    },
    
    setGridPush:function(val) {
        this.attributes.gridPush = val;
    }, 
    
    getGridPush:function(){
        if (typeof(this.attributes.gridPush) != 'object') {
            return [];
        }
        return this.attributes.gridPush;
    },
    
    renderGridPush:function(){
        if (typeof(this.attributes.gridPush) == 'object') {
            for(var i=0; i<this.gridColumnNames.length; i++) {
                if (i < this.attributes.gridPush.length && typeof(this.attributes.gridPush[i]) == 'number') {
                    this.addClass('push-'+this.gridColumnNames[i]+'-'+String(this.attributes.gridPush[i]));
                }
            }
        }
        return null;
    },
    
    setGridPull:function(val) {
        this.attributes.gridPull = val;
    }, 
    
    getGridPull:function(){
        if (typeof(this.attributes.gridPull) != 'object') {
            return [];
        }
        return this.attributes.gridPull;
    },
    
    renderGridPull:function(){
        if (typeof(this.attributes.gridPull) == 'object') {
            for(var i=0; i<this.gridColumnNames.length; i++) {
                if (i < this.attributes.gridPull.length && typeof(this.attributes.gridPull[i]) == 'number') {
                    this.addClass('pull-'+this.gridColumnNames[i]+'-'+String(this.attributes.gridPull[i]));
                }
            }
        }
        return null;
    }
};
