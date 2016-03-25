<?php
namespace Lucid\Html\Bootstrap\Trait;

trait Sizeable
{
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