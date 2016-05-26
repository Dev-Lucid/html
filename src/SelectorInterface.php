<?php
namespace Lucid\Html;

Interface SelectorInterface
{
    public function matchTag(string $tag) : SelectorInterface;
    public function matchClass(string $class) : SelectorInterface;
    public function matchAttribute(string $name, string $value) : SelectorInterface;
    public function test(TagInterface $tag) : bool;
}

