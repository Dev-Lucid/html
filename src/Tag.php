<?php
namespace Lucid\Html;
use Lucid\Html\html;

class Tag implements TagInterface
{
    public $tag  = null;
    public $instantiatorName = null;

    public $attributes = [];
    protected $factory = null;

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

    function __construct(FactoryInterface $factory, string $instantiatorName)
    {
        $this->factory = $factory;
        $this->instantiatorName = $instantiatorName;
        
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

    public function build(string $name, ...$parameters) : TagInterface
    {
        return $this->factory->build($name, ...$parameters);
    }

    public function setProperties(array $params = []) : TagInterface
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
    
    public function requireProperties(string $trait, array $names)
    {
        foreach ($names as $name=>$description) {
            if (is_numeric($name) === true) {
                $name = $description;
                $description = '';
            }
            if (property_exists($this, $name) === false) {
                throw new Exception\MissingRequiredProperty(get_class($this), $trait, $name, $description);
            }
        }
    }
    
    public function queryChildren(SelectorInterface $selector, bool $recurse = true, TagInterface $tag = null, array $results = []) : array
    {
        if (is_null($tag) === true) {
            $tag = $this;
        }
        foreach ($tag->children as $child) {
            if (is_object($child) === true) {
                if($selector->test($child) === true) {
                    $results[] = $child;
                }
                if ($recurse === true) {
                    $results = $this->queryChildren($selector, $recurse, $child, $results);
                }
            }
        }
        return $results;
    }
    
    public function queryParents(SelectorInterface $selector, bool $recurse = true, TagInterface $tag = null, array $results = []) : array
    {
        if (is_null($tag) === true) {
            $tag = $this;
        }
        $parent = $tag->getParent();
        if ($parent != null) {
            
            if($selector->test($parent) === true) {
                $results[] = $parent;
            }
            if ($recurse === true) {
                $results = $this->queryParents($selector, $recurse, $parent, $results);
            }
        }
        return $results;
    }

    protected function init()
    {
        # empty, implement in inherited classes
    }

    protected function checkValidChild($child) : bool
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

    public function __toString() : string
    {
        return $this->render();
    }

    protected function preRender() : string
    {
        return '';
    }

    protected function postRender() : string
    {
        return '';
    }

    protected function preChildren() : string
    {
        return '';
    }

    protected function postChildren() : string
    {
        return '';
    }

    protected function renderChildren($list = 'children') : string
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

    public function add($child) : TagInterface
    {
        if (is_object($child) === true && in_array('Lucid\\Html\\TagInterface', class_implements($child)) === false) {
            throw new \Exception('Any child added to this object must implement Lucid\\Html\\TagInterface');
        }
        if ($this->setupChild($child, 'add') === true) {
            $this->children[] = $child;
        }
        return $this;
    }

    public function prepend($child) : TagInterface
    {
        if (is_object($child) === true && in_array('Lucid\\Html\\TagInterface', class_implements($child)) === false) {
            throw new \Exception('Any child prepended to this object must implement Lucid\\Html\\TagInterface');
        }
        if ($this->setupChild($child, 'prepend') === true) {
            array_unshift($this->children, $child);
        }
        return $this;
    }

    protected function setupChild($child, $action='add') : bool
    {
        if ($this->allowChildren === false){
            throw new Exception\ChildrenNotAllowed(get_class($this));
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

    public function parent()
    {
        return $this->parent;
    }
    
    public function firstChild()
    {
        return (count($this->children) == 0)?null:$this->children[0];
    }

    public function lastChild()
    {
        return $this->children[count($this->children) - 1];
    }
    
    public function findChild($selector)
    {
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
    
    public function getParent()
    {
        return $this->parent;
    }
    
    public function getTag() : string
    {
        return $this->tag;
    }

    public function set(string $name, $value) : TagInterface
    {
        #echo("calling set on $name = $value\n");
        $setter = 'set'.$name;
        if (method_exists($this, $setter) === true) {
            $this->$setter($value);
            return $this;
        }
        if (in_array($name, $this->allowedAttributes) === false && in_array($name, $this->parameters) === false) {
            throw new Exception\InvalidAttribute($this->instantiatorName, $name, $this->allowedAttributes);
        }
        if (property_exists($this, $name) === true) {
            $this->$name = $value;
        } else {
            $this->attributes[$name] = $value;
        }
        return $this;
    }

    public function get(string $name)
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

    public function paragraph($text) : TagInterface
    {
        if ($this->allowChildren === false) {
            throw new \Exception('Class '.get_class($this).' does not support ->paragraph because this class does not support having children.');
        }
        $this->add(html::p($text));
        return $this;
    }

    public function setClass(string $newClass) : TagInterface
    {
        $this->addClass($newClass);
        return $this;
    }

    protected function renderClass() : string
    {
        return implode(' ',$this->attributes['class']);
    }

    public function hasClass(string $testClass) : bool
    {
        if (isset($this->attributes['class']) === false || is_array($this->attributes['class']) === false) {
            return false;
        }
        return in_array($testClass, $this->attributes['class']);
    }

    public function addClass(string $class) : TagInterface
    {
        if($this->hasClass($class) === false) {
            if (isset($this->attributes['class']) === false ){
                $this->attributes['class'] = [];
            }
            $this->attributes['class'][] = $class;
        }
        return $this;
    }

    public function removeClass($class) : TagInterface
    {
        if (isset($this->attributes['class']) === true && is_array($this->attributes['class']) === true) {
            if(is_array($class) === false) {
                $class = [$class];
            }
            $this->attributes['class'] = array_diff($this->attributes['class'], $class);
        }
        return $this;
    }

    public function toggleClass(string $class, $newState = null) : TagInterface
    {
        if (is_null($newState) === false) {
            if($newState === true) {
                $this->addClass($class);
            } else if ($newState === false) {
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

    public function setStyle(string $newStyle) : TagInterface
    {
        if (isset($this->attributes['style']) === false || is_array($this->attributes['style']) === false) {
            $this->attributes['style'] = [];
        }

        $newStyleList = explode(';', trim($newStyle));
        foreach ($newStyleList as $newStylePair) {
            if($newStylePair != '') {
                list($key, $value) = explode(':', $newStylePair);
                $key = strtolower(trim($key));
                $value = trim($value);
                $this->attributes['style'][$key] = $value;
            }
        }
        return $this;
    }

    protected function renderStyle() : string
    {
        $css = '';
        foreach ($this->attributes['style'] as $key=>$value) {
            if (is_null($value) === false) {
                $css .= $key.':'.$value.';';
            }
        }
        return $css;
    }

    public function setHidden($val) : TagInterface
    {
        if ($val !== true && $val !== false){
            throw new \Exception('Attribute hidden only accepts values true or false.');
        }
        $this->attributes['hidden'] = $val;
        return $this;
    }

    public function renderHidden() : string
    {
        $val = ($this->attributes['hidden'] === true)?'hidden':null;
        return $val;
    }
}
