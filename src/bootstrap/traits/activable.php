<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Activable
{
    public function setActive($val)
    {
        return $this->toggleClass('active', $val);
    }

    public function getActive()
    {
        return $this->hasClass('active');
    }
}
