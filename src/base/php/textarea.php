<?php

namespace DevLucid\Tag;

class BaseTextarea extends BaseTag
{
    use BaseDisableableTrait;

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
