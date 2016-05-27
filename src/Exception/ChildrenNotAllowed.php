<?php 
namespace Lucid\Html\Exception;

class ChildrenNotAllowed extends \Exception
{
    public function __construct(string $className)
    {
        $this->message = 'Class '.$className.' cannot have children.';
    }
}