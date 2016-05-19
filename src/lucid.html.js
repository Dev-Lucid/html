if (typeof lucid == 'undefined') {
    var lucid = {};
}
lucid.html = {};

lucid.html.build=function(){
    return lucid.html.builder.build.apply(lucid.html.build, lucid.html.build.arguments);
};