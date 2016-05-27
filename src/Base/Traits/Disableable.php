<?php
namespace Lucid\Html\Base\Traits;

trait Disableable
{
    public function DisableableInit()
    {
        $this->allowedAttributes[] = 'disabled';
    }

    public function setDisabled($val)
    {
        if ($val !== true && $val !== false) {
            throw new Exception\InvalidAttributeValue($this->instantiatorName, 'disabled', $val, ['true', 'false']);
        }
        $this->attributes['disabled'] = $val;
        return $this;
    }

    public function renderDisabled()
    {
        $val = ($this->attributes['disabled'] === true)?'disabled':null;
        return $val;
    }
}
