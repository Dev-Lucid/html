<?php
namespace Lucid\Html\Exception;

class InvalidFlavorPath extends \Exception
{
    public function __construct(string $flavorPath)
    {
        $this->message = 'Flavor path does not exist: '.$flavorPath;
    }
}