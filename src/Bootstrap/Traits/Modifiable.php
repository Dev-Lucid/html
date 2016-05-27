<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Modifiable
{
    
    public function ModifiableInit()
    {
        if (property_exists($this, 'bootstrapModifiersAllowed') === false || property_exists($this, 'bootstrapModifierPrefix') === false) {
            throw new \Exception('Class '.get_class($this).' cannot use trait Modifiable. In order to use this trait, it must have two properties: string ->bootstrapModifierPrefix and array ->bootstrapModifiersAllowed');
        }
    }
    
    # to use this trait, you must define two properties on your class. Below are examples:
    # public $bootstrapModifierPrefix  = 'btn';
    # public $bootstrapModifiersAllowed = ['xs', 'sm', 'md', 'lg', 'xl',];
    public function setModifier($val)
    {
        if (in_array($val, $this->bootstrapModifiersAllowed) === false && is_null($val) === false){
            throw new \Exception('Class '.get_class($this).' does not support modifier '.$val.'. The only supported modifiers are: '.implode(', ', $this->bootstrapModifiersAllowed));
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
