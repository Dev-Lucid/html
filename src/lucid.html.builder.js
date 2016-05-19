lucid.html.builder=function(){
    return 'called';
};

lucid.html.builder.tags = {};

lucid.html.builder.build=function(tag){
    var obj;
    if (typeof(lucid.html.builder.tags[tag]) == 'function'){
        obj = new lucid.html.builder.tags[tag]();
        
        var newArgs = [];
        for (var i=1; i<arguments.length; i++) {
            newArgs.push(arguments[i]);
        }
        obj.setProperties(newArgs);
    } else {
        obj = new lucid.html.tag();
        obj.tag = tag;
    }
    return obj;
};

