<?php 
namespace Lucid\Html\Exception;

class InvalidAttribute extends \Exception
{
    public function __construct(string $className, string $badAttributeName, array $allowedAttributes)
    {
        $this->message = 'Class '.$className.' cannot have attribute '.$badAttributeName.'. Supported attributes are: '.implode(', ', $allowedAttributes);
    }
}