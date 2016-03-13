<?php
namespace DevLucid;

include(__DIR__.'/base_tags__class_style_methods.php');

class base_tag extends base_tags__class_style_methods
{
    public $tag  = null;

    public $attributes = [];
    public $allowed_attributes = ['id', 'class', 'style', 'hidden', ];
    public $parameters = ['child'];

    public $allow_children    = true;
    public $allow_quick_close = false;

    public $children = [];
    public $parent   = null;

    public $pre_html  = '';
    public $post_html = '';
    public $pre_children_html  = '';
    public $post_children_html = '';

    function __construct()
    {
        $all_traits  = [];
        $all_classes = class_parents($this);

        array_push($all_classes, get_class($this));
        foreach ($all_classes as $class) {
            $all_traits = array_merge($all_traits, class_uses($class));
        }

        foreach($all_traits as $trait)
        {
            $trait_init_func = '_'.$trait.'_init';
            if(method_exists($this, $trait_init_func))
            {
                $this->$trait_init_func();
            }
        }
        $this->init();
    }

    public function set_properties($params)
    {
        if(count($params) > $this->parameters)
        {
            throw new \Exception('Too many parameters for construction. Type '.get_class($this).' has the following parameters: '.print_r($this->parameters,true));
        }
        for($i=0; $i<count($params); $i++)
        {
            $property = $this->parameters[$i];
            if($property == 'child')
            {
                $this->add($params[$i]);
            }
            else
            {
                $this->$property = $params[$i];
            }
        }
    }

    public function init()
    {
        # empty, implement in inherited classes
    }

    public function check_valid_child($child)
    {
    }

    public function render()
    {
        #factory::log(get_class($this).'->render() called');
        $html = '';
        $html .= $this->pre_render();
        $html .= $this->pre_html;
        $html .= $this->render_tag_start();
        $html .= $this->pre_children();
        $html .= $this->pre_children_html;
        $html .= $this->render_children();
        $html .= $this->post_children_html;
        $html .= $this->post_children();
        $html .= $this->render_tag_end();
        $html .= $this->post_html;
        $html .= $this->post_render();
        return $html;
    }

    public function __toString()
    {
        return $this->render();
    }

    public function pre_render()
    {
        return '';
    }

    public function post_render()
    {
        return '';
    }

    public function pre_children()
    {
        return '';
    }

    public function post_children()
    {
        return '';
    }

    public function render_children($list = 'children')
    {
        $html = '';
        foreach($this->$list as $child)
        {
            if(is_object($child))
            {
                $html .= $child->render();
            }
            else
            {
                $html .= $child;
            }
        }
        return $html;
    }

    public function add($child)
    {
        if($this->setup_child($child, 'add') == true)
        {
            $this->children[] = $child;
        }
        return $this;
    }

    public function prepend($child)
    {
        if($this->setup_child($child, 'prepend') == true)
        {
            array_unshift($this->children, $child);
        }
        return $this;
    }

    protected function setup_child($child, $action='add')
    {
        if($this->allow_children === false)
        {
            throw new \Exception('Class '.get_class($this).' does not allow children to be added.');
        }

        if (is_array($child))
        {
            foreach($child as $real_child)
            {
                $this->$action($real_child);
            }
            return false;
        }
        else if(is_object($child))
        {
            $this->check_valid_child($child);
            $child->parent = $this;
        }
        return true;
    }

    public function first_child()
    {
        return (count($this->children) == 0)?null:$this->children[0];
    }

    public function last_child()
    {
        return $this->children[count($this->children) - 1];
    }

    protected function render_tag_start()
    {
        $html = '<'.$this->tag;
        foreach($this->attributes as $key=>$value)
        {
            $render_method = 'render_'.$key;
            if(method_exists($this, $render_method) === true)
            {
                $value = $this->$render_method();
                if(is_null($value) === false)
                {
                    $html .= ' '.str_replace('_','-',$key).'="'.$value.'"';
                }
            }
            else
            {
                if(is_null($value) === false)
                {
                    $html .= ' '.str_replace('_','-',$key).'="'.$value.'"';
                }
            }
        }

        if($this->allow_quick_close === true && count($this->children) === 0)
        {
            return $html .= ' />';
        }

        return $html.'>';
    }

    protected function render_tag_end()
    {
        if($this->allow_quick_close === true && count($this->children) === 0)
        {
            return '';
        }
        return '</'.$this->tag.'>';
    }

    public function __set($name, $value)
    {
        return $this->$name($value);
    }

    public function __get($name)
    {
        return $this->$name();
    }

    public function __call($name, $params)
    {
        $getter = 'get_'.$name;
        $setter = 'set_'.$name;

        if(count($params) == 0)
        {
            # being called as a getter
            if(method_exists($this, $getter))
            {
                return $this->$getter();
            }
            return (isset($this->attributes[$name]))?$this->attributes[$name]:null;
        }
        else if(count($params) == 1)
        {
            # being called as a setter

            if(property_exists($this, $name))
            {
                $this->$name = $params[0];
                return $this;
            }

            if(method_exists($this, $setter))
            {
                return $this->$setter($params[0]);
            }
            if(in_array($name, $this->allowed_attributes) === false && in_array($name, $this->parameters) === false)
            {
                throw new \Exception('Class '.get_class($this).' cannot have attribute '.$name.'; only '.implode(', ', array_merge($this->allowed_attributes, $this->parameters)));
            }
            $this->attributes[$name] = $params[0];
            return $this;
        }
    }

    public function paragraph($text)
    {
        if($this->allow_children === false)
        {
            throw new \Exception('Class '.get_class($this).' does not support ->paragraph because this class does not support having children.');
        }
        $this->add(factory::p($text));
        return $this;
    }
}

class base_anchor extends base_tag
{
    public $tag = 'a';
    public $parameters = ['href','child'];

    public function init()
    {
        $this->allowed_attributes[] = 'name';
        $this->allowed_attributes[] = 'target';
    }

    public function check_valid_child($child)
    {
        if($child->tag == 'a')
        {
            throw new \Exception(factory::error_child_tag('a',null,['a']));
        }
    }
    #use trait_base_linkable;
}

class base_image extends base_tag
{
    public $tag = 'img';
    public $parameters = ['src','width','height','alt'];
}

class base_thead extends base_tag
{
    public $tag = 'thead';
    public $pre_children_html = '<tr>';
    public $post_children_html = '</tr>';
    public $parameters = ['child'];
}

class base_tfoot extends base_tag
{
    public $tag = 'tfoot';
    public $pre_children_html = '<tr>';
    public $post_children_html = '</tr>';
    public $parameters = ['child'];
}

class base_th extends base_tag
{
    public function init()
    {
        $this->allowed_attributes[] = 'colspan';
        $this->allowed_attributes[] = 'rowspan';
    }

    public function check_valid_child($child)
    {
        if(in_array($child->tag, ['tr', 'td', 'th',]) === true)
        {
            throw new \Exception(factory::error_child_tag($child->tag, null, ['tr', 'td', 'th',]));
        }
    }

    public function render_colspan()
    {
        $val = intval($this->attributes['colspan']);
        if ($val == 1)
        {
            return null;
        }
        return $val;
    }
}

class base_td extends base_th
{
}

class base_tr extends base_tag
{
    function check_valid_child($child)
    {
        if(in_array($child->tag, ['td', 'th',]) === false)
        {
            throw new Exception(factory::error_child_tag($child->tag, ['td', 'th',], null));
        }
    }
}

class base_hr extends base_tag
{
    public $allow_quick_close = true;
}

class base_br extends base_hr{ }

class base_bold      extends base_tag{   public $tag = 'b';  }
class base_italic    extends base_tag{   public $tag = 'i';  }
class base_underline extends base_tag{   public $tag = 'u';  }

class base_form extends base_tag
{
    public $parameters = ['name','action',];

    public function init()
    {
        $this->allowed_attributes[] = 'onsubmit';
        $this->allowed_attributes[] = 'enctype';
        $this->allowed_attributes[] = 'method';
        $this->allowed_attributes[] = 'target';
    }

    function check_valid_child($child)
    {
        if($child->tag == 'form')
        {
            throw new Exception(factory::error_child_tag($child->tag, null, ['form',]));
        }
    }
}

class base_label extends base_tag
{
    public function init()
    {
        $this->allowed_attributes[] = 'for';
    }
}

class base_option extends base_tag
{
    public $parameters = ['value','child','selected',];
    public function init()
    {
        $this->allowed_attributes[] = 'selected';
        $this->allowed_attributes[] = 'value';
    }

    public function set_selected($val)
    {
        $this->attributes['selected'] = ($val === true)?'selected':null;
        return $this;
    }

    public function get_selected()
    {
        return (isset($this->attributes['selected']) === true && $this->attributes['selected'] == 'selected');
    }
}
