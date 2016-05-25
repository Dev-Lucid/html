<?php
namespace Lucid\Html;

Interface BuildInterface
{
    public static function build(string $name, ...$params) : TagInterface;
}

