<?php
namespace Lucid\Html;

class Tag__class_style_methods
{

    public function setClass($new_class)
    {
        if(!is_array($this->attributes['class']))
        {
            $this->attributes['class'] = [];
        }
        $this->attributes['class'][] = $new_class;
        return $this;
    }

    public function renderClass()
    {
        return implode(' ',$this->attributes['class']);
    }

    public function hasClass($class)
    {
        if (isset($this->attributes['class']) === false || is_array($this->attributes['class']) === false)
        {
            return false;
        }
        return in_array($class, $this->attributes['class']);
    }

    public function addClass($class)
    {
        if($this->hasClass($class) === false)
        {
            $this->attributes['class'][] = $class;
        }
        return $this;
    }

    public function removeClass($class)
    {
        if(isset($this->attributes['class']) === true && is_array($this->attributes['class']) === true)
        {
            if(!is_array($class))
            {
                $class = [$class];
            }
            $this->attributes['class'] = array_diff($this->attributes['class'], $class);
        }
        return $this;
    }

    public function toggleClass($class, $new_state = null)
    {
        if(is_null($new_state) === false)
        {
            if($new_state === true)
            {
                $this->addClass($class);
            }
            else if ($new_state === false)
            {
                $this->removeClass($class);
            }
            return $this;
        }
        if($this->hasClass($class) === false)
        {
            $this->attributes['class'][] = $class;
        }
        else
        {
            $this->removeClass($class);
        }
        return $this;
    }

    public function setStyle($new_style)
    {
        if(isset($this->attributes['style']) === false || is_array($this->attributes['style']) === false)
        {
            $this->attributes['style'] = [];
        }

        $new_style_list = explode(';', trim($new_style));
        foreach($new_style_list as $new_style_pair)
        {
            if($new_style_pair != '')
            {
                list($key, $value) = explode(':', $new_style_pair);
                $key = strtolower(trim($key));
                $value = trim($value);
                $this->attributes['style'][$key] = $value;
            }
        }
        return $this;
    }

    public function renderStyle()
    {
        $css = '';
        foreach($this->attributes['style'] as $key=>$value)
        {
            if(is_null($value) === false)
            {
                $css .= $key.':'.$value.';';
            }
        }
        return $css;
    }

    public function setHidden($val)
    {
        if ($val !== true && $val !== false)
        {
            throw new \Exception('Attribute hidden only accepts values true or false.');
        }
        $this->attributes['hidden'] = $val;
        return $this;
    }

    public function renderHidden()
    {
        $val = ($this->attributes['hidden'] === true)?'hidden':null;
        return $val;
    }
}
