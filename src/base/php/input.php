<?php

namespace DevLucid;

class base_input extends base_tag
{
    public $allow_quick_close = true;
    public $allow_children    = false;

    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['type', null, null, null, null, null, null,];
    public $parameters_by_type = [
        'text'        => ['type', 'name', 'value', 'placeholder', ],
        'email'       => ['type', 'name', 'value', 'placeholder',],
        'password'    => ['type', 'name', 'placeholder',],
        'checkbox'    => ['type', 'name', 'checked', 'post_html',],
        'radio'       => ['type', 'name', 'value', 'checked',],
        'button'      => ['type', 'value', 'onclick',],
        'submit'      => ['type', 'value',],
        'hidden'      => ['type', 'name', 'value',],
    ];
    public $allowed_attributes_by_type = [
        'text'        => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress', ],
        'email'       => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress',],
        'password'    => ['onblur', 'onfocus', 'onkeyup', 'onkeydown', 'onkeypress',],
        'checkbox'    => ['onclick',],
        'radio'       => ['onclick',],
        'button'      => ['onclick',],
        'submit'      => ['onclick',],
        'hidden'      => [],
    ];

    use trait_base_checkable, trait_base_disablable;

    public function init()
    {
        $this->allowed_attributes[] = 'type';
        $this->allowed_attributes[] = 'value';
        $this->allowed_attributes[] = 'disabled';
        $this->allowed_attributes[] = 'placeholder';
        $this->allowed_attributes[] = 'disabled';
    }

    public function set_type($val)
    {
        $allowed_types = array_keys($this->parameters_by_type);
        if(in_array($val, $allowed_types) === false)
        {
            throw new \Exception('Input class does not support type '.$val.'; only types '.implode(', ',$allowed_types));
        }
        $this->attributes['type'] = $val;
        $this->parameters = $this->parameters_by_type[$val];
        $this->allowed_attributes = array_merge($this->allowed_attributes, $this->allowed_attributes_by_type[$val]);
    }
}
