<?php
namespace Lucid\Html;

class Html implements BuildInterface
{
    public static $config = [];

    public static function init($flavor = null, ArrayAccess $config = null)
    {
        if (is_null($config) === true) {
            static::$config = [];
        }

        static::$config['loadedClassCache'] = [];
        $hooks = [];

        try{
            $hooks['javascript'] = function($js) {
                return '<script language="Javascript">'.$js.'</script>';
            };
            static::$config['hooks'] = $hooks;
        }
        catch(\Exception $e) {
            exit($e->getMessage());
        }

        static::$config['iconPrefix'] = 'fa';     # default to font-awesome's prefix
        static::$config['formats'] = [
            'datetime'=>'yyyy-mm-dd hh:ii::ss',
        ];

        static::$config['autoloadMap'] = [];
        static::$config['autoloadMap']['Lucid\\Html\\Base'] = __DIR__.'/src/Base/';

        if (is_null($flavor) === false) {
            static::$config['autoloadMap']['Lucid\\Html\\'.$flavor] = __DIR__.'/src/'.$flavor.'/';
        }

        if (class_exists("Lucid\Html\Tag") === false) {
            include(__DIR__.'/tag.php');
        }
    }

    public static function addFlavor(string $namespacePrefix, string $path)
    {
        static::$config['autoloadMap'][$namespacePrefix] = $path;
    }

    private static function findClass(string $name) : string
    {
        if (isset(static::$config['loadedClassCache'][$name]) === true) {
            return static::$config['loadedClassCache'][$name];
        }

        foreach (static::$config['autoloadMap'] as $prefix=>$path) {
            
            $filePath = $path.'tags/'.$name.'.php';
            $class = $prefix.'\\Tags\\'.$name;
        
            if (class_exists($class, true) === true) {
                static::$config['loadedClassCache'][$name] = $class;
            } 
        }
        
        if (isset(static::$config['loadedClassCache'][$name]) === true) {
            return static::$config['loadedClassCache'][$name];
        }
        return '';
    }
    
    public static function build(string $name, ...$params) : TagInterface
    {
        $finalClass = static::findClass($name);
        if ($finalClass == ''){
            $obj = new Tag();
        } else {
            $obj = new $finalClass();
        }

        if (is_null($obj->tag) === true) {
            $obj->tag = $name;
        }
        $obj->instantiatorName = $name;
        $obj->setProperties($params);

        if (isset(static::$config['hooks'][$name.'__create']) === true && is_callable(static::$config['hooks'][$name.'__create']) === true) {
            $func = static::$config['hooks'][$name.'__create'];
            $func($obj);
        }

        return $obj;
    }
}

