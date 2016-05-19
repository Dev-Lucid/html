#!/usr/bin/env php
<?php
include(__DIR__.'/../vendor/autoload.php');

$files = [
    'base'=>[
        '/base/js/lucid.html.js',
        '/base/js/lucid.html.builder.js',
        '/tag.js',
        '/base/tags/*.js',
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

echo("Building Distribution JS files...\n");
foreach($files['base'] as $filePattern) {
    $fileList = glob(__DIR__.'/../src'.$filePattern);
    foreach ($fileList as $file) {
        echo("\tIncluding ".str_pad(basename($file), 25, ".", STR_PAD_RIGHT));
        $basejs .= "\n/* File start: $file */\n";
        $basejs .= file_get_contents($file);
        $basejs .= "\n/* File end: $file */\n";
        echo("★\n");
    }
}

$bootstrapjs .= $basejs;
foreach($files['bootstrap'] as $file) {
    $bootstrapjs .= file_get_contents(__DIR__.'/../src'.$file);
}


echo("Writing files...\n");
file_put_contents(__DIR__.'/../dist/lucid.html.buildBaseTagsOnly.js', $basejs);
file_put_contents(__DIR__.'/../dist/lucid.html.buildBaseTagsOnly.min.js', \JShrink\Minifier::minify($basejs));
file_put_contents(__DIR__.'/../dist/lucid.html.buildBootstrap.js', $bootstrapjs);
file_put_contents(__DIR__.'/../dist/lucid.html.buildBootstrap.min.js', \JShrink\Minifier::minify($bootstrapjs));

echo("JS Distribution files built.\n");
exit(0);