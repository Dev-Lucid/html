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
            throw new \Exception('Attribute readonly only accepts values true or false.');
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
