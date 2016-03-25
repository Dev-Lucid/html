<?php
namespace Lucid\Html;
use Lucid\Html\html;

include(__DIR__.'/tag__class_style_methods.php');

class Tag extends Tag__class_style_methods
{
    public $tag  = null;
    public $instantiatorName = null;

    public $attributes = [];
    public $allowedAttributes = ['id', 'class', 'style', 'hidden', ];
    public $parameters = ['child'];

    public $allowChildren    = true;
    public $allowQuickClose = false;

    public $children = [];
    public $parent   = null;

    public $preHtml  = '';
    public $postHtml = '';
    public $preChildrenHtml  = '';
    public $postChildrenHtml = '';

    function __construct()
    {
        $allTraits  = [];
        $allClasses = class_parents($this);

        array_push($allClasses, get_class($this));
        foreach ($allClasses as $class) {
            $allTraits = array_merge($allTraits, class_uses($class));
        }

        foreach($allTraits as $trait)
        {
            $traitInitFunc = $trait.'Init';
            if (method_exists($this, $traitInitFunc) === true) {
                $this->$traitInitFunc();
            }
        }
        $this->init();
    }

    public function setProperties($params)
    {
        if (count($params) > count($this->parameters)) {
            throw new \Exception('Too many parameters for construction. Type '.$this->instantiatorName.' has the following parameters: '.print_r($this->parameters,true));
        }

        for ($i=0; $i<count($params); $i++) {
            $property = $this->parameters[$i];
            if ($property == 'child') {
                $this->add($params[$i]);
            } else {
                $this->$property = $params[$i];
            }
        }
    }

    public function init()
    {
        # empty, implement in inherited classes
    }

    public function checkValidChild($child)
    {
    }

    public function render()
    {
        $html = '';
        $html .= $this->preRender();
        $html .= $this->preHtml;
        $html .= $this->renderTagStart();
        $html .= $this->preChildren();
        $html .= $this->preChildrenHtml;
        $html .= $this->renderChildren();
        $html .= $this->postChildrenHtml;
        $html .= $this->postChildren();
        $html .= $this->renderTagEnd();
        $html .= $this->postHtml;
        $html .= $this->postRender();
        return $html;
    }

    public function __toString()
    {
        return $this->render();
    }

    public function preRender()
    {
        return '';
    }

    public function postRender()
    {
        return '';
    }

    public function preChildren()
    {
        return '';
    }

    public function postChildren()
    {
        return '';
    }

    public function renderChildren($list = 'children')
    {
        $html = '';
        foreach ($this->$list as $child) {
            if (is_object($child) === true) {
                $html .= $child->render();
            } else {
                $html .= $child;
            }
        }
        return $html;
    }

    public function add($child)
    {
        if ($this->setupChild($child, 'add') === true) {
            $this->children[] = $child;
        }
        return $this;
    }

    public function prepend($child)
    {
        if ($this->setupChild($child, 'prepend') === true) {
            array_unshift($this->children, $child);
        }
        return $this;
    }

    protected function setupChild($child, $action='add')
    {
        if ($this->allowChildren === false){
            throw new \Exception('Class '.get_class($this).' does not allow children to be added.');
        }

        if (is_array($child) === true) {
            foreach ($child as $real_child) {
                $this->$action($real_child);
            }
            return false;
        } elseif (is_object($child) === true) {
            $this->checkValidChild($child);
            $child->parent = $this;
        }
        return true;
    }

    public function firstChild()
    {
        return (count($this->children) == 0)?null:$this->children[0];
    }

    public function lastChild()
    {
        return $this->children[count($this->children) - 1];
    }

    protected function renderTagStart()
    {
        $html = '<'.$this->tag;
        foreach ($this->attributes as $key=>$value) {
            $render_method = 'render'.$key;
            if (method_exists($this, $render_method) === true) {
                $value = $this->$render_method();
                if (is_null($value) === false) {
                    $html .= ' '.str_replace('_','-',$key).'="'.$value.'"';
                }
            } else {
                if (is_null($value) === false) {
                    $html .= ' '.str_replace('_','-',$key).'="'.$value.'"';
                }
            }
        }

        if ($this->allowQuickClose === true && count($this->children) === 0) {
            return $html .= ' />';
        }

        return $html.'>';
    }

    protected function renderTagEnd()
    {
        if ($this->allowQuickClose === true && count($this->children) === 0) {
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
        $getter = 'get'.$name;
        $setter = 'set'.$name;

        if (count($params) == 0) {
            # being called as a getter
            if (method_exists($this, $getter) === true) {
                return $this->$getter();
            }
            return (isset($this->attributes[$name]))?$this->attributes[$name]:null;
        } elseif(count($params) == 1) {
            # being called as a setter

            if (property_exists($this, $name) === true) {
                $this->$name = $params[0];
                return $this;
            }

            if (method_exists($this, $setter) === true) {
                return $this->$setter($params[0]);
            }
            if(in_array($name, $this->allowedAttributes) === false && in_array($name, $this->parameters) === false) {
                throw new \Exception('Class '.$this->instantiatorName.' cannot have attribute '.$name.'; only '.implode(', ', array_merge($this->allowedAttributes, $this->parameters)));
            }
            $this->attributes[$name] = $params[0];
            return $this;
        }
    }

    public function paragraph($text)
    {
        if ($this->allowChildren === false) {
            throw new \Exception('Class '.get_class($this).' does not support ->paragraph because this class does not support having children.');
        }
        $this->add(html::p($text));
        return $this;
    }
}
