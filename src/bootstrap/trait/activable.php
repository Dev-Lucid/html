<?php
namespace Lucid\Html\Bootstrap\Trait;

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