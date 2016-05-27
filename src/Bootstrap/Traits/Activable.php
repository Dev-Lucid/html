<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Activable
{
    public function setActive($val)
    {
        if ($val === true) {
            $this->addClass('active');
        } elseif ($val === false) {
            $this->removeClass('active');
        } else {
            throw new \Exception('Class '.get_class($this).' active property may only be set to true or false');
        }
        return $this;
    }
}
