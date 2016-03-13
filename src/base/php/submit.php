<?php

namespace DevLucid;

class base_submit extends base_tag
{
    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['text',];

    use trait_base_disablable;

    public function init()
    {
        parent::init();
        $this->allowed_attributes[] = 'type';
        $this->type = 'submit';
        $this->tag = 'button';
    }

    public function set_text($value)
    {
        $this->add($value);
        return $this;
    }

    public function get_text()
    {
        return $this->render_children();
    }
}
