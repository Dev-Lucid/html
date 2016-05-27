<?php
namespace Lucid\Html;

Interface TagInterface extends FactoryInterface
{
    function __construct(FactoryInterface $factory);
    
    public function __toString() : string;
    public function render() : string;
    
    public function add($child) : TagInterface;
    public function prepend($child) : TagInterface;
    
    public function parent();
    public function firstChild();
    public function lastChild();
    
    public function getTag() : string;
    public function get(string $name);
    public function set(string $name, $value) : TagInterface;
    public function setProperties(array $params = []) : TagInterface;
    
    public function queryChildren(SelectorInterface $selector, bool $recurse = true) : array;
    public function queryParents(SelectorInterface $selector, bool $recurse = true) : array;
    
    public function setClass(string $newClass) : TagInterface;
    public function hasClass(string $testClass) : bool;
    public function addClass(string $class) : TagInterface;
    public function removeClass($class) : TagInterface;
    public function toggleClass(string $class, $newState = null) : TagInterface;
    
    public function setStyle(string $newStyle) : TagInterface;
}

