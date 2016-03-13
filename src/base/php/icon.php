<?php

namespace DevLucid;

class base_icon extends base_tag
{
    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['icon',];
    public $allow_children = false;

    public function init()
    {
        $this->tag = 'i';
        $this->add_class(html::$icon_prefix);
    }

    public function set_icon($val)
    {
        $this->add_class(html::$icon_prefix.'-'.$val);
    }
}
