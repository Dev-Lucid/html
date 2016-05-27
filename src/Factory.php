<?php
namespace Lucid\Html;

class Factory implements FactoryInterface
{
    protected $config           = [];
    protected $loadedClassCache = [];
    protected $autoloadMap      = [];
    public    $hooks            = [];
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
            
            $filePath = $path.'tags/'.$name.'.php';
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
    
    public function build(string $name, ...$params) : TagInterface
    {
        $finalClass = $this->findClass($name);
        if ($finalClass == ''){
            $obj = new Tag($this);
        } else {
            $obj = new $finalClass($this);
        }

        if (is_null($obj->tag) === true) {
            $obj->tag = $name;
        }
        $obj->instantiatorName = $name;
        $obj->setProperties($params);

        if (isset($this->hooks[$name.'__create']) === true && is_callable($this->hooks[$name.'__create']) === true) {
            $func = $this->hooks[$name.'__create'];
            $func($obj);
        }

        return $obj;
    }
}

