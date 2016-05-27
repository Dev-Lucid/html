
lucid.html.factory=function(){
    this.hooks = {};
    this.hooks.javascript = function(jsToRun) {
        return eval(jsToRun);
    };
};

lucid.html.factory.prototype.addHook=function(tags, action, callable){
    for (var i=0; i<tags.length; i++) {
        if (typeof(this.hooks[tags[i]+'__'+action]) != 'object') {
            this.hooks[tags[i]+'__'+action] = [];
        }
        this.hooks[tags[i]+'__'+action].push(callable);
    }
};

lucid.html.factory.prototype.setJavascriptHook=function(callable){
    this.hooks.javascript = callable;
};

lucid.html.factory.prototype.javascript=function(jsToRun) {
    return this.hooks.javascript(jsToRun);
};

lucid.html.factory.prototype.callHooks=function(tag, action)
{
    if (typeof(this.hooks[tag.instantiatorName+'__'+action]) == 'object') {
        for (var i=0; i<this.hooks[tag.instantiatorName+'__'+action].length; i++) {
            this.hooks[tag.instantiatorName+'__'+action][i](tag);
        }
    }
};

lucid.html.factory.prototype.build=function(tag){
    var obj;
    if (typeof(lucid.html.factory.tags[tag]) == 'function'){
        obj = new lucid.html.factory.tags[tag](this, tag);
        
        var newArgs = [];
        for (var i=1; i<arguments.length; i++) {
            newArgs.push(arguments[i]);
        }
        obj.setProperties(newArgs);
    } else {
        obj = new lucid.html.tag(this, tag);
        obj.tag = tag;
    }
    
    this.callHooks(obj, 'create');
    return obj;
};

lucid.html.factory.tags = {};
