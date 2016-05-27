<?php
namespace Lucid\Html;

Interface FactoryInterface
{
    public function build(string $name, ...$params) : TagInterface;
}

