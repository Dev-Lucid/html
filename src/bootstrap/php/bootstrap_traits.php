<?php

namespace DevLucid;

trait trait_bootstrap_pullable
{
    public function get_pull()
    {
        $pull = null;
        if($this->has_class('pull-left') === true)
        {
            $pull = 'left';
        }
        if($this->has_class('pull-right') === true)
        {
            $pull = 'right';
        }
        return $pull;
    }

    public function set_pull($new_pull)
    {
        if ($new_pull !== 'left' && $new_pull !== 'right' && is_null($new_pull) === false)
        {
            throw new \Exception('->pull may only be set to left, right, or null');
        }

        if(is_null($new_pull) === true)
        {
            $this->remove_class('pull-left')->remove_class('pull-right');
        }
        else
        {
            $this->add_class('pull-'.$new_pull);
        }
        return $this;
    }
}

trait trait_bootstrap_modifiable
{
    # to use this trait, you must define two properties on your class. Below are examples:
    #public $_bootstrap_modifier_prefix  = 'alert';
    #public $_bootstrap_modifier_allowed = ['primary','secondary','success','info','danger','warning'];
    public function set_modifier($val)
    {
        if(in_array($val, $this->_bootstrap_modifier_allowed) === false && is_null($val) == false)
        {
            throw new \Exception('Class '.get_class($this).' does not support modifier '.$val.'. The only supported modifieres are: '.implode(', ', $this->_bootstrap_modifier_allowed));
        }

        $classes_to_remove = [];
        foreach($this->_bootstrap_modifier_allowed as $modifier)
        {
            $classes_to_remove[] = $this->_bootstrap_modifier_prefix.'-'.$modifier;
        }
        $this->remove_class($classes_to_remove);

        if(is_null($val) === true)
        {
            return $this;
        }
        else
        {
            $this->add_class($this->_bootstrap_modifier_prefix.'-'.$val);
            return $this;
        }
    }
}

trait trait_bootstrap_sizeable
{
    # to use this trait, you must define two properties on your class. Below are examples:
    #public $_bootstrap_size_prefix  = 'btn';
    #public $_bootstrap_size_allowed = ['xs', 'sm', 'md', 'lg', 'xl',];
    public function set_size($val)
    {
        if(in_array($val, $this->_bootstrap_size_allowed) === false && is_null($val) == false)
        {
            throw new \Exception('Class '.get_class($this).' does not support size '.$val.'. The only supported sizes are: '.implode(', ', $this->_bootstrap_size_allowed));
        }

        $classes_to_remove = [];
        foreach($this->_bootstrap_size_allowed as $size)
        {
            $classes_to_remove[] = $this->_bootstrap_size_prefix.'-'.$size;
        }
        $this->remove_class($classes_to_remove);

        if(is_null($val) === true)
        {
            return $this;
        }
        else
        {
            $this->add_class($this->_bootstrap_size_prefix.'-'.$val);
            return $this;
        }
    }
}

trait trait_bootstrap_activable
{
    public function set_active($val)
    {
        return $this->toggle_class('active', $val);
    }

    public function get_active()
    {
        return $this->has_class('active');
    }
}

trait trait_bootstrap_gridable
{
    public $_bootstrap_grid_size_names = ['xs','sm','md','lg','xl'];
    public function grid($columns)
    {
        $cols = [];
        for($i=0; $i<count($columns); $i++)
        {
            $cols[$i] = html::column();
            $cols[$i]->grid_size($columns[$i]);
            $this->add($cols[$i]);
        }
        return $cols;
    }
    public function grid_size($sizes)
    {
        $this->grid_apply_sizes($sizes,'');
        return $this;
    }

    public function grid_offset($sizes)
    {
        $this->grid_apply_sizes($sizes,'offset-');
        return $this;
    }

    public function grid_push($sizes)
    {
        $this->grid_apply_sizes($sizes,'push-');
        return $this;
    }

    public function grid_pull($sizes)
    {
        $this->grid_apply_sizes($sizes,'pull-');
        return $this;
    }

    private function grid_apply_sizes($sizes, $modifier = '')
    {
        for($i=0; $i<count($this->_bootstrap_grid_size_names);$i++)
        {
            if (isset($sizes[$i]) === true and is_null($sizes[$i]) === false)
            {
                $this->add_class('col-'.$this->_bootstrap_grid_size_names[$i].'-'.$modifier.$sizes[$i]);
            }
        }
        return $this;
    }
}
