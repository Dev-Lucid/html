<?php

namespace DevLucid\Tag;

trait BootstrapPullableTrait
{
    public function getPull()
    {
        $pull = null;
        if($this->hasClass('pull-left') === true)
        {
            $pull = 'left';
        }
        if($this->hasClass('pull-right') === true)
        {
            $pull = 'right';
        }
        return $pull;
    }

    public function setPull($newPull)
    {
        if ($newPull !== 'left' && $newPull !== 'right' && is_null($newPull) === false) {
            throw new \Exception('->pull may only be set to left, right, or null');
        }

        if (is_null($newPull) === true) {
            $this->removeClass('pull-left')->removeClass('pull-right');
        } else {
            $this->addClass('pull-'.$newPull);
        }
        return $this;
    }
}

trait BootstrapModifiableTrait
{
    # to use this trait, you must define two properties on your class. Below are examples:
    # public $bootstrapModifierPrefix   = 'alert';
    # public $bootstrapModifiersAllowed = ['primary','secondary','success','info','danger','warning'];
    public function setModifier($val)
    {
        if (in_array($val, $this->bootstrapModifiersAllowed) === false && is_null($val) === false) {
            throw new \Exception('Class '.get_class($this).' does not support modifier '.$val.'. The only supported modifieres are: '.implode(', ', $this->bootstrapModifiersAllowed));
        }

        $classesToRemove = [];
        foreach ($this->bootstrapModifiersAllowed as $modifier) {
            $classesToRemove[] = $this->bootstrapModifierPrefix.'-'.$modifier;
        }
        $this->removeClass($classesToRemove);

        if(is_null($val) === true) {
            return $this;
        } else {
            $this->addClass($this->bootstrapModifierPrefix.'-'.$val);
            return $this;
        }
    }
}

trait BootstrapSizeableTrait
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

trait BootstrapActivableTrait
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

trait BootstrapGridableTrait
{
    public $bootstrapGridSizeNames = ['xs','sm','md','lg','xl'];
    public function grid($columns)
    {
        $cols = [];
        for ($i=0; $i<count($columns); $i++){
            $cols[$i] = \DevLucid\html::column();
            $cols[$i]->gridSize($columns[$i]);
            $this->add($cols[$i]);
        }
        return $cols;
    }
    public function gridSize($sizes)
    {
        $this->gridApplySizes($sizes, '');
        return $this;
    }

    public function gridOffset($sizes)
    {
        $this->gridApplySizes($sizes, 'offset-');
        return $this;
    }

    public function gridPush($sizes)
    {
        $this->gridApplySizes($sizes, 'push-');
        return $this;
    }

    public function gridPull($sizes)
    {
        $this->gridApplySizes($sizes, 'pull-');
        return $this;
    }

    private function gridApplySizes($sizes, $modifier = '')
    {
        for ($i=0; $i<count($this->bootstrapGridSizeNames); $i++) {
            if (isset($sizes[$i]) === true and is_null($sizes[$i]) === false) {
                $this->addClass('col-'.$this->bootstrapGridSizeNames[$i].'-'.$modifier.$sizes[$i]);
            }
        }
        return $this;
    }
}
