#!/usr/bin/env php
<?php
include(__DIR__.'/../vendor/autoload.php');

$files = [
    'base'=>[
        '/lucid.html.js',
        '/lucid.html.builder.js',
        '/lucid.html.tag.js',
        '/Base/js/*.js',
        '/Base/traits/*.js',
        '/Base/tags/*.js',
    ],
    'bootstrap'=>[
        '/Bootstrap/js/*.js',
        '/Bootstrap/traits/*.js',
        '/Bootstrap/tags/alert.js',
        '/Bootstrap/tags/anchor.js',
        '/Bootstrap/tags/anchorButton.js',
        '/Bootstrap/tags/button.js',
        '/Bootstrap/tags/div.js',
        '/Bootstrap/tags/paragraph.js',
        '/Bootstrap/tags/span.js',
    ],
    'foundation'=>[
    ],
];

$basejs       ='';
$bootstrapjs  ='';
$foundationjs ='';

echo("Building base javascript...\n");
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

echo("Building bootstrap javascript...\n");

$bootstrapjs .= $basejs;
foreach($files['bootstrap'] as $filePattern) {
    $fileList = glob(__DIR__.'/../src'.$filePattern);
    foreach ($fileList as $file) {
        echo("\tIncluding ".str_pad(basename($file), 25, ".", STR_PAD_RIGHT));
        $bootstrapjs .= "\n/* File start: $file */\n";
        $bootstrapjs .= file_get_contents($file);
        $bootstrapjs .= "\n/* File end: $file */\n";
        echo("★\n");
    }
}


echo("Writing files...\n");
file_put_contents(__DIR__.'/../dist/lucid.html.buildBaseTagsOnly.js', $basejs);
file_put_contents(__DIR__.'/../dist/lucid.html.buildBaseTagsOnly.min.js', \JShrink\Minifier::minify($basejs));
file_put_contents(__DIR__.'/../dist/lucid.html.buildBootstrap.js', $bootstrapjs);
file_put_contents(__DIR__.'/../dist/lucid.html.buildBootstrap.min.js', \JShrink\Minifier::minify($bootstrapjs));

echo("JS Distribution files built.\n");
exit(0);