<?php

namespace DevLucid;

class base_textarea extends base_tag
{
    public $parameters = ['name', 'value', 'placeholder',];
    use trait_base_disablable;

    public function init()
    {
        $this->allowed_attributes[] = 'rows';
        $this->allowed_attributes[] = 'cols';
    }

    public function set_value($val)
    {
        $this->add($val.'');
    }
}
