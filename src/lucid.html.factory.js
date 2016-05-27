
lucid.html.factory=function(){
};

lucid.html.factory.prototype.build=function(tag){
    var obj;
    if (typeof(lucid.html.factory.tags[tag]) == 'function'){
        obj = new lucid.html.factory.tags[tag](this);
        
        var newArgs = [];
        for (var i=1; i<arguments.length; i++) {
            newArgs.push(arguments[i]);
        }
        obj.setProperties(newArgs);
    } else {
        obj = new lucid.html.tag(this);
        obj.tag = tag;
    }
    obj.instantiatorName = tag;
    return obj;
};

lucid.html.factory.tags = {};