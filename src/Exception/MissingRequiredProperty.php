<?php 
namespace Lucid\Html\Exception;

class MissingRequiredProperty extends \Exception
{
    public function __construct(string $className, string $traitName, string $propertyName, string $description = '')
    {
        $this->message = 'Class '.$className.' cannot use trait '.$traitName.' until it has a property named '.$propertyName;
        if ($description != '') {
            $this->message .= $description;
        }
    }
}