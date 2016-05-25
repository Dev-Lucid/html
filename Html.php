<?php
namespace Lucid\Html;

class Html
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
            include(__DIR__.'/src/tag.php');
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
        return null;
    }

    public static function build(string $name, ...$params)
    {
        $finalClass = static::findClass($name);
        if (is_null($finalClass) === true){
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

    public static function errorBoolean($obj, $property, $bad_value)
    {
        if ($bad_value !== true && $bad_value !== false && is_null($value) === false) {
            throw new \Exception('Class '.get_class($obj).' property '.$property.' must be set to true, false, or null.');
        }
    }

    public static function errorValues($obj, $property, $bad_value, $good_values)
    {
        if (in_array($bad_value, $good_values) === false) {
            throw new \Exception('Class '.get_class($obj).' property '.$property.' must be one of the following values: '.implode(', ',$good_values));
        }
    }

    public static function errorChildTag($obj, $badTag, $allowedTags=null, $disallowedTags=null)
    {
        if (is_null($allowedTags) === false && in_array($badTag, $allowedTags) === false) {
            throw new \Exception('Class '.get_class($obj).' can only have children with tag '.implode(', ',$allowedTags));
        }

        if (is_null($disallowedTags) === false && in_array($badTag, $disallowedTags) === true) {
            throw new \Exception('Class '.get_class($obj).' can not have children with tag '.implode(', ',$disallowedTags));
        }
    }
}

