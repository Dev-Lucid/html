<?php 
include('vendor/autoload.php');

$factory = new Lucid\Html\Factory();

echo($factory->build('image')->render());