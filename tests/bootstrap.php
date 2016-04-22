<?php
include(__DIR__.'/../vendor/autoload.php');
$config = new \Lucid\Component\Container\Container();
\Lucid\Html\html::init($config, 'bootstrap');

# need to unset this because phpunit really doesn't play well with closures.
\Lucid\Html\html::$config->set('hooks', []);
