<?php
namespace Lucid\Html\Base\Trait;

trait Disableable
{
    public function DisableableInit()
    {
        $this->allowedAttributes[] = 'disabled';
    }

    public function setDisabled($val)
    {
        if ($val !== true && $val !== false)
        {
            throw new \Exception('Attribute checked only accepts values true or false.');
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
