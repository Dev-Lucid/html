<?php

namespace Lucid\Html\Base\Tag;

class Textarea extends \Lucid\Html\Tag
{
    use \Lucid\Html\Base\Trait\Disableable;

    public $parameters = ['name', 'value', 'placeholder',];

    public function init()
    {
        $this->allowedAttributes[] = 'rows';
        $this->allowedAttributes[] = 'cols';
    }

    public function set_value($val)
    {
        $this->add($val.'');
    }
}
