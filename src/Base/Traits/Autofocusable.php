<?php
namespace Lucid\Html\Base\Traits;

trait Autofocusable
{
    public function AutofocusInit()
    {
        $this->allowedAttributes[] = 'autofocus';
    }

    public function setAutofocus($val)
    {
        if ($val !== true && $val !== false) {
            throw new Exception\InvalidAttributeValue($this->instantiatorName, 'autofocus', $val, ['true', 'false']);
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
