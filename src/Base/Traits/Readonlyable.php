<?php
namespace Lucid\Html\Base\Traits;

trait Readonlyable
{
    public function ReadonlyableInit()
    {
        $this->allowedAttributes[] = 'disabled';
    }

    public function setReadonly($val)
    {
        if ($val !== true && $val !== false) {
            throw new Exception\InvalidAttributeValue($this->instantiatorName, 'readonly', $val, ['true', 'false']);
        }
        $this->attributes['readonly'] = $val;
        return $this;
    }

    public function renderReadonly()
    {
        $val = ($this->attributes['readonly'] === true)?'readonly':null;
        return $val;
    }
}
