<?php
namespace Lucid\Html;

class Factory implements FactoryInterface
{
    protected $config           = [];
    protected $loadedClassCache = [];
    protected $autoloadMap      = [];
    protected $hooks            = [];
    protected $defaults         = [];
    const SUPPORTED_FLAVORS = ['Bootstrap'];

    public function __construct(string $flavor = '')
    {
        $this->hooks['javascript'] = function($js) {
            return '<script language="Javascript">'.$js.'</script>';
        };

        $this->config['iconPrefix'] = 'fa';     # default to font-awesome's prefix
        $this->config['formats'] = [
            'datetime'=>'yyyy-mm-dd hh:ii::ss',
        ];

        $this->autoloadMap['Lucid\\Html\\Base'] = __DIR__.'/src/Base/';

        if ($flavor != '') {
            if (in_array($flavor, self::SUPPORTED_FLAVORS) === true) {
                $this->addFlavor('Lucid\\Html\\'.$flavor, __DIR__.'/'.$flavor.'/');
            } else {
                throw new Exception\InvalidInbuiltFlavor($flavor);
            }
        }

        if (class_exists("Lucid\Html\Tag") === false) {
            include(__DIR__.'/Tag.php');
        }
    }
    
    public function addDefaults(string $instantiatorName, array $settings) : FactoryInterface
    {
        if (isset($this->defaults[$instantiatorName]) === false) {
            $this->defaults[$instantiatorName] = [];
        }
        foreach ($settings as $key=>$value) {
            $this->defaults[$instantiatorName][$key] = $value;
        }
        return $this;
    }
    
    public function addHook(array $tags, string $action, Callable $callable)
    {
        foreach ($tags as $tag) {
            if (isset($this->hooks[$tag.'__'.$action]) === false) {
                $this->hooks[$tag.'__'.$action] = [];
            }
            $this->hooks[$tag.'__'.$action][] = $callable;
        }
    }
    
    public function callHooks(TagInterface $tag, string $action)
    {
        if (isset($this->hooks[$tag->instantiatorName.'__'.$action]) === true) {
            foreach ($this->hooks[$tag->instantiatorName.'__'.$action] as $callable) {
                $callable($tag);
            }
        }
    }
    
    public function setJavascriptHook(Callable $callable)
    {
        $this->hooks['javascript'] = $callable;
    }
    
    public function javascript($jsToRun)
    {
        return $this->hooks['javascript']($jsToRun);
    }

    public function addFlavor(string $namespacePrefix, string $path) : FactoryInterface
    {
        if (file_exists($path) === false) {
            throw new Exception\InvalidFlavorPath($path);
        }
        $this->autoloadMap[$namespacePrefix] = $path;
        
        return $this;
    }

    private function findClass(string $name) : string
    {
        if (isset($this->loadedClassCache[$name]) === true) {
            return $this->loadedClassCache[$name];
        }

        foreach ($this->autoloadMap as $prefix=>$path) {
            $class = $prefix.'\\Tags\\'.$name;
            if (class_exists($class, true) === true) {
                $this->loadedClassCache[$name] = $class;
            } 
        }
        
        if (isset($this->loadedClassCache[$name]) === true) {
            return $this->loadedClassCache[$name];
        }
        return '';
    }
    
    public function buildFromArray(array $structure, array $defaults = [])
    {
        if (isset($structure['defaults']) === true) {
            $defaults = array_merge($defaults, $structure['defaults']);
            unset($structure['defaults']);    
        }
        
        $finalAttributes = array_merge($defaults, $structure);

        $type = $finalAttributes['type'] ?? null;
        unset($finalAttributes['type']);
        
        $children = (isset($finalAttributes['children']) === true)?$finalAttributes['children']:[];
        unset($finalAttributes['children']);

        if (is_null($type) === true) {
            throw new \Exception('Cannot build type: null');
        }

        $newObj = $this->build($type);
        foreach($finalAttributes as $key=>$value) {
            $newObj->set($key, $value);
        }
        
        foreach ($children as $child) {
            if (is_string($child) === true) {
                $newObj->add($child);
            } elseif (is_array($child) === true) {
                $newObj->add($this->buildFromArray($child, $defaults));
            }
        }
        
        return $newObj;
    }
    
    public function build(string $name, ...$params) : TagInterface
    {
        $finalClass = $this->findClass($name);
        if ($finalClass == ''){
            $obj = new Tag($this, $name);
        } else {
            $obj = new $finalClass($this, $name);
        }

        if (is_null($obj->tag) === true) {
            $obj->tag = $name;
        }
        $obj->instantiatorName = $name;
        
        if (isset($this->defaults[$name]) === true) {
            foreach ($this->defaults[$name] as $key=>$value) {
                $obj->set($key, $value);
            }
        }
        
        $obj->setProperties($params);

        

        $this->callHooks($obj, 'create');

        return $obj;
    }
}

