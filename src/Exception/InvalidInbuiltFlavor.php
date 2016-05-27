<?php
namespace Lucid\Html\Exception;

class InvalidInbuiltFlavor extends \Exception
{
    public function __construct(string $flavor)
    {
        $this->message = 'Lucid\\Html does not support the inbuilt flavor '.$flavor.'. The following inbuilt flavors are supported: '.implode(', ', \Lucid\Html\Factory\SUPPORTED_FLAVORS).'. You may still implement this flavor, but you must use the ->addFlavor(string $namespacePrefix, string $path) function instead, and you will have to configure your autoloader to find appropriately named classes/traits.';
    }
}