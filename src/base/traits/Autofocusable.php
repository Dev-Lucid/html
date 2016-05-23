<?php
namespace Lucid\Html\Base\Traits;

trait Autofocusable
{
    public function AutofocusInit()
    {
        $this->allowedAttributes[] = 'required';
    }

    public function setAutofocus($val)
    {
        if ($val !== true && $val !== false) {
            throw new \Exception('Attribute autofocus only accepts values true or false.');
        }
        $this->attributes['autofocus'] = $val;
        return $this;
    }

    public function renderAutofocus()
    {
        $val = ($this->attributes['autofocus'] === true)?'autofocus':null;
        return $val;
    }
}
