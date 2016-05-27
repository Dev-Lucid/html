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
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'active', $val, ['true', 'false']);
        }
        return $this;
    }
}
