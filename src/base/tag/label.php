<?php
namespace Devlucid\Base\Tags;

class Label extends \Lucid\Html\Tag
{
    public function init()
    {
        $this->allowedAttributes[] = 'for';
    }
}
