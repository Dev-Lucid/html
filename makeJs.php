<?php
include('vendor/autoload.php');

$files = [
    'base'=>[
        '/base/js/lucid.html.js',
        '/base/js/lucid.html.builder.js',
        '/tag.js',
        '/tag__class_style_methods.js',
        '/base/tags/anchor.js',
        '/base/tags/h1.js',
        '/base/tags/bold.js',
    ],
    'bootstrap'=>[
        '/bootstrap/tags/alert.js',
    ],
    'foundation'=>[
    ],
];

$basejs       ='';
$bootstrapjs  ='';
$foundationjs ='';
foreach($files['base'] as $file) {
    $basejs .= file_get_contents(__DIR__.'/src'.$file);
}

$bootstrapjs .= $basejs;
foreach($files['bootstrap'] as $file) {
    $bootstrapjs .= file_get_contents(__DIR__.'/src'.$file);
}


file_put_contents(__DIR__.'/dist/lucid.html.buildBaseTagsOnly.js', $basejs);
file_put_contents(__DIR__.'/dist/lucid.html.buildBaseTagsOnly.min.js', \JShrink\Minifier::minify($basejs));
file_put_contents(__DIR__.'/dist/lucid.html.buildBootstrap.js', $bootstrapjs);
file_put_contents(__DIR__.'/dist/lucid.html.buildBootstrap.min.js', \JShrink\Minifier::minify($bootstrapjs));
