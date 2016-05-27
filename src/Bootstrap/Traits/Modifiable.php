<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Modifiable
{
    
    public function ModifiableInit()
    {
        $this->requireProperties(__TRAIT__, ['bootstrapModifiersAllowed', 'bootstrapModifierPrefix']);
    }
    
    # to use this trait, you must define two properties on your class. Below are examples:
    # public $bootstrapModifierPrefix  = 'btn';
    # public $bootstrapModifiersAllowed = ['xs', 'sm', 'md', 'lg', 'xl',];
    public function setModifier($val)
    {
        if (in_array($val, $this->bootstrapModifiersAllowed) === false && is_null($val) === false){
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'modifier', $val, $this->bootstrapModifiersAllowed);
        }

        $classesToRemove = [];
        foreach ($this->bootstrapModifiersAllowed as $modifier) {
            $classesToRemove[] = $this->bootstrapModifierPrefix.'-'.$modifier;
        }
        $this->removeClass($classesToRemove);

        if (is_null($val) === true) {
            return $this;
        } else {
            $this->addClass($this->bootstrapModifierPrefix.'-'.$val);
            return $this;
        }
    }
}
