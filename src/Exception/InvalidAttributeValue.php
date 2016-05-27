<?php 
namespace Lucid\Html\Exception;

class InvalidAttributeValue extends \Exception
{
    public function __construct(string $className, string $attributeName, string $badAttributeValue, array $allowedValues=[])
    {
        $this->message = 'Class '.$className.'->'.$attributeName.' cannot have value '.$badAttributeValue.'.';
        if (count($allowedValues) > 0) {
             $this->message .= ' Supported values are: '.implode(', ', $allowedValues);
        }
    }
}