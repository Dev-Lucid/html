<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Inverseable
{
    public function InverseableInit()
    {
        $this->requireProperties(__TRAIT__, ['bootstrapInversePrefix']);
    }
    
    public function setInverse($val)
    {
        if ($val === true) {
            $this->addClass($this->bootstrapInversePrefix.'-inverse');
        } elseif ($val === false) {
            $this->removeClass($this->bootstrapInversePrefix.'-inverse');
        } else {
            throw new \Exception('Class '.get_class($this).' inverse property may only be set to true or false');
        }
        return $this;
    }
}
