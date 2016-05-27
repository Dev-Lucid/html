<?php
namespace Lucid\Html\Base\Traits;

trait Requireable
{
    public function RequireableInit()
    {
        $this->allowedAttributes[] = 'required';
    }

    public function setRequired($val)
    {
        if ($val !== true && $val !== false) {
            throw new Exception\InvalidAttributeValue($this->instantiatorName, 'autofocus', $val, ['true', 'false']);
        }
        $this->attributes['required'] = $val;
        return $this;
    }

    public function renderRequired()
    {
        $val = ($this->attributes['required'] === true)?'required':null;
        return $val;
    }
}
