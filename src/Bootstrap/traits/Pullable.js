lucid.html.bootstrap.traits.Pullable = {
    setPull:function(val) {
        if (typeof(this.attributes.class) == 'undefined') {
            this.attributes.class = [];
        }
        
        var newClasses = [];
        for (var i=0; i<this.attributes.class.length; i++) {
            var testClass = String(this.attributes.class[i]);
            if (testClass.indexOf('pull-') !== 0) {
                newClasses.push(testClass);
            }
        }
        
        var sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

        if (typeof(val) == 'object') {
            for (var j=0; j < val.length; j++) {
                if (val[j] !== null) {
                    newClasses.push('pull-'+sizes[j]+'-'+val[j]);
                }
            }

        } else {
            for (var k=0; k < sizes.length; k++) {
                newClasses.push('pull-'+sizes[k]+'-'+val);
            }
        }
        this.attributes.class = newClasses;
        return this;
    }
};
