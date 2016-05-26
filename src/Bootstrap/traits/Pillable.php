<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Pillable
{
    public function setPill($val)
    {
        if ($val === true) {
            $this->addClass('label-pill');
        } elseif ($val === false) {
            $this->removeClass('label-pill');
        } else {
            throw new \Exception('Class '.get_class($this).' pill property may only be set to true or false');
        }
        return $this;
    }
}
