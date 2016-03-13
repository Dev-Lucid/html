<?php

namespace DevLucid;

trait trait_base_checkable
{
    public function _trait_base_checkbable_init()
    {
        $this->allowed_attributes[] = 'checked';
    }

    public function set_checked($val)
    {
        $type = (isset($this->attributes['type']))?$this->attributes['type']:'unknown';
        if(in_array($type, ['radio','checkbox',]) === false)
        {
            throw new Exception('Attribute checked cannot be used on input type '.$type.'; only for types radio and checkbox.');
        }
        if ($val !== true && $val !== false)
        {
            throw new Exception('Attribute checked only accepts values true or false.');
        }
        $this->attributes['checked'] = $val;
        return $this;
    }

    public function render_checked()
    {
        $val = ($this->attributes['checked'] === true)?'checked':null;
        return $val;
    }
}

trait trait_base_disablable
{
    public function _trait_base_disablable_init()
    {
        $this->allowed_attributes[] = 'disabled';
    }

    public function set_disabled($val)
    {
        if ($val !== true && $val !== false)
        {
            throw new \Exception('Attribute checked only accepts values true or false.');
        }
        $this->attributes['disabled'] = $val;
        return $this;
    }

    public function render_disabled()
    {
        $val = ($this->attributes['disabled'] === true)?'disabled':null;
        return $val;
    }
}
