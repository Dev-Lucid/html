<?php

namespace DevLucid;

class base_select extends base_tag
{
    # $parameters doesn't matter because it will be overridden once 'type' has been set.
    public $parameters = ['name', 'value', 'data', 'onchange',];

    public $value = null;
    public $data  = null;

    public function pre_render()
    {
        if(is_null($this->data) === false)
        {
            foreach($this->data as $option)
            {
                $value = '';
                $label = '';

                if(isset($option['label']))
                {
                    $value = $option['value'];
                    $label = $option['label'];
                }
                else if (isset($option[1]) === true)
                {
                    $value = $option[0];
                    $label = $option[1];
                }
                settype($this->value,'string');
                settype($value,'string');
                $this->add(html::option($value, $label, ($this->value == $value)));
            }
        }
        return parent::pre_render();
    }
}
