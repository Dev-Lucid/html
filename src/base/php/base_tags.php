<?php
namespace DevLucid\Tag;

include(__DIR__.'/BaseTags__class_style_methods.php');

class BaseTag extends BaseTags__class_style_methods
{
    public $tag  = null;

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
        if (count($params) > $this->parameters) {
            throw new \Exception('Too many parameters for construction. Type '.get_class($this).' has the following parameters: '.print_r($this->parameters,true));
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
        #factory::log(get_class($this).'->render() called');
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
                throw new \Exception('Class '.get_class($this).' cannot have attribute '.$name.'; only '.implode(', ', array_merge($this->allowedAttributes, $this->parameters)));
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
        $this->add(\DevLucid\html::p($text));
        return $this;
    }
}

class BaseAnchor extends BaseTag
{
    public $tag = 'a';
    public $parameters = ['href','child'];

    public function init()
    {
        $this->allowedAttributes[] = 'name';
        $this->allowedAttributes[] = 'target';
    }

    public function checkValidChild($child)
    {
        if ($child->tag == 'a') {
            throw new \Exception(factory::errorChildTag('a',null,['a']));
        }
    }
    #use trait_base_linkable;
}

class BaseImage extends BaseTag
{
    public $tag = 'img';
    public $parameters = ['src','width','height','alt'];
}

class BaseThead extends BaseTag
{
    public $tag = 'thead';
    public $preChildrenHtml = '<tr>';
    public $postChildrenHtml = '</tr>';
    public $parameters = ['child'];
}

class BaseTfoot extends BaseTag
{
    public $tag = 'tfoot';
    public $preChildrenHtml = '<tr>';
    public $postChildrenHtml = '</tr>';
    public $parameters = ['child'];
}

class BaseTh extends BaseTag
{
    public function init()
    {
        $this->allowedAttributes[] = 'colspan';
        $this->allowedAttributes[] = 'rowspan';
    }

    public function checkValidChild($child)
    {
        if(in_array($child->tag, ['tr', 'td', 'th',]) === true)
        {
            throw new \Exception(factory::errorChildTag($child->tag, null, ['tr', 'td', 'th',]));
        }
    }

    public function renderColspan()
    {
        $val = intval($this->attributes['colspan']);
        if ($val == 1)
        {
            return null;
        }
        return $val;
    }
}

class BaseTd extends BaseTH
{
}

class BaseTr extends BaseTag
{
    function checkValidChild($child)
    {
        if (in_array($child->tag, ['td', 'th',]) === false) {
            throw new \Exception(factory::errorChildTag($child->tag, ['td', 'th',], null));
        }
    }
}

class BaseHr extends BaseTag
{
    public $allowQuickClose = true;
}

class BaseBr extends BaseHr{ }

class BaseBold      extends BaseTag{   public $tag = 'b';  }
class BaseItalic    extends BaseTag{   public $tag = 'i';  }
class BaseUnderline extends BaseTag{   public $tag = 'u';  }

class BaseForm extends BaseTag
{
    public $parameters = ['name','action',];

    public function init()
    {
        $this->allowedAttributes[] = 'onsubmit';
        $this->allowedAttributes[] = 'enctype';
        $this->allowedAttributes[] = 'method';
        $this->allowedAttributes[] = 'target';
    }

    function checkValidChild($child)
    {
        if ($child->tag == 'form') {
            throw new \Exception(\DevLucid\html::errorChildTag($child->tag, null, ['form',]));
        }
    }
}

class BaseLabel extends BaseTag
{
    public function init()
    {
        $this->allowedAttributes[] = 'for';
    }
}

class BaseOption extends BaseTag
{
    public $parameters = ['value','child','selected',];
    public function init()
    {
        $this->allowedAttributes[] = 'selected';
        $this->allowedAttributes[] = 'value';
    }

    public function setSelected($val)
    {
        $this->attributes['selected'] = ($val === true)?'selected':null;
        return $this;
    }

    public function getSelected()
    {
        return (isset($this->attributes['selected']) === true && $this->attributes['selected'] == 'selected');
    }
}
