<?php
namespace Lucid\Html\Bootstrap\Traits;

trait Sizeable
{
    public function SizeableInit()
    {
        if (property_exists($this, 'bootstrapSizesAllowed') === false || property_exists($this, 'bootstrapSizePrefix') === false) {
            throw new \Exception('Class '.get_class($this).' cannot use trait Sizeable. In order to use this trait, it must have two properties: string ->bootstrapSizePrefix and array ->bootstrapSizesAllowed');
        }
    }
    
    # to use this trait, you must define two properties on your class. Below are examples:
    # public $bootstrapSizePrefix  = 'btn';
    # public $bootstrapSizesAllowed = ['xs', 'sm', 'md', 'lg', 'xl',];
    public function setSize($val)
    {
        if (in_array($val, $this->bootstrapSizesAllowed) === false && is_null($val) === false){
            throw new \Exception('Class '.get_class($this).' does not support size '.$val.'. The only supported sizes are: '.implode(', ', $this->bootstrapSizesAllowed));
        }

        $classesToRemove = [];
        foreach ($this->bootstrapSizesAllowed as $size) {
            $classesToRemove[] = $this->bootstrapSizePrefix.'-'.$size;
        }
        $this->removeClass($classesToRemove);

        if (is_null($val) === true) {
            return $this;
        } else {
            $this->addClass($this->bootstrapSizePrefix.'-'.$val);
            return $this;
        }
    }
}
