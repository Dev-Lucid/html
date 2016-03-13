<?php

namespace DevLucid;

class base_button extends base_tag
{
    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['text','onclick','type',];

    use trait_base_disablable;

    public function init()
    {
        $this->type = 'button';
        parent::init();
    }

    public function set_type($val)
    {
        html::error_values($this, 'type', $val,['button','submit']);
        $this->attributes['type'] = $val;
        return $this;
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
