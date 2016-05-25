<?php
namespace Lucid\Html;
use Lucid\Html\html;

class Tag
{
    public $tag  = null;
    public $instantiatorName = null;

    public $attributes = [];

    # From here: http://www.w3schools.com/tags/ref_standardattributes.asp
    public $allowedAttributes = ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate'];
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
            $trait = explode('\\', $trait);
            $traitInitFunc = (array_pop($trait)).'Init';
            if (method_exists($this, $traitInitFunc) === true) {
                $this->$traitInitFunc();
            }
        }
        $this->init();
    }

    public function build(...$parameters)
    {
        return \Lucid\Html\Html::build(...$parameters);
    }

    public function setProperties($params)
    {
        for ($i=0; $i<count($params); $i++) {
            $property = ($i < count($this->parameters))?$this->parameters[$i]:'child';

            if ($property == 'child') {
                $this->add($params[$i]);
            } else {
                $this->set($property, $params[$i]);
            }
        }
        return $this;
    }

    public function init()
    {
        # empty, implement in inherited classes
    }

    public function checkValidChild($child) : bool
    {
        return true;
    }

    public function render() : string
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

    public function renderChildren($list = 'children') : string
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

    protected function setupChild($child, $action='add') : bool
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

    protected function renderTagStart() : string
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

    protected function renderTagEnd() : string
    {
        if ($this->allowQuickClose === true && count($this->children) === 0) {
            return '';
        }
        return '</'.$this->tag.'>';
    }

    public function set($name, $value)
    {
        #echo("calling set on $name = $value\n");
        $setter = 'set'.$name;
        if (method_exists($this, $setter) === true) {
            $this->$setter($value);
            return $this;
        }
        if (in_array($name, $this->allowedAttributes) === false && in_array($name, $this->parameters) === false) {
            throw new \Exception('Invalid attribute '.$name.'. Tag '.$this->tag.' only allows these attributes: ' . (implode(', ', $this->allowedAttributes) .', '. implode(', ', $this->parameters)));
        }
        if (property_exists($this, $name) === true) {
            $this->$name = $value;
        } else {
            $this->attributes[$name] = $value;
        }
        return $this;
    }

    public function get($name)
    {
        $getter = 'get'.$name;
        if (method_exists($this, $getter) === true) {
            return $this->$getter($name);
        }
        if (property_exists($this, $name) === true) {
            return $this->$name;
        } elseif (isset($this->attributes[$name]) === true) {
            return $this->attributes[$name];
        }
        return null;
    }

    public function paragraph($text)
    {
        if ($this->allowChildren === false) {
            throw new \Exception('Class '.get_class($this).' does not support ->paragraph because this class does not support having children.');
        }
        $this->add(html::p($text));
        return $this;
    }

    public function setClass($new_class)
    {
        if (isset($this->attributes['class']) === false || is_array($this->attributes['class']) === false) {
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
        if (isset($this->attributes['class']) === false || is_array($this->attributes['class']) === false) {
            return false;
        }
        return in_array($class, $this->attributes['class']);
    }

    public function addClass($class)
    {
        if($this->hasClass($class) === false) {
            if (isset($this->attributes['class']) === false ){
                $this->attributes['class'] = [];
            }
            $this->attributes['class'][] = $class;
        }
        return $this;
    }

    public function removeClass($class)
    {
        if (isset($this->attributes['class']) === true && is_array($this->attributes['class']) === true) {
            if(is_array($class) === false) {
                $class = [$class];
            }
            $this->attributes['class'] = array_diff($this->attributes['class'], $class);
        }
        return $this;
    }

    public function toggleClass($class, $new_state = null)
    {
        if (is_null($new_state) === false) {
            if($new_state === true) {
                $this->addClass($class);
            } else if ($new_state === false) {
                $this->removeClass($class);
            }
            return $this;
        }

        if ($this->hasClass($class) === false) {
            $this->attributes['class'][] = $class;
        } else {
            $this->removeClass($class);
        }
        return $this;
    }

    public function setStyle($new_style)
    {
        if (isset($this->attributes['style']) === false || is_array($this->attributes['style']) === false) {
            $this->attributes['style'] = [];
        }

        $new_style_list = explode(';', trim($new_style));
        foreach ($new_style_list as $new_style_pair) {
            if($new_style_pair != '') {
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
        foreach ($this->attributes['style'] as $key=>$value) {
            if (is_null($value) === false) {
                $css .= $key.':'.$value.';';
            }
        }
        return $css;
    }

    public function setHidden($val)
    {
        if ($val !== true && $val !== false){
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
