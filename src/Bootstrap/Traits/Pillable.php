<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Pillable
{
    public function PillableInit()
    {
        $this->requireProperties('Pillable', ['bootstrapPillPrefix']);
    }
    
    public function setPill($val)
    {
        if ($val === true) {
            $this->addClass($this->bootstrapPillPrefix.'-pill');
        } elseif ($val === false) {
            $this->removeClass($this->bootstrapPillPrefix.'-pill');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'pill', $val, ['true', 'false']);
        }
        return $this;
    }
}
