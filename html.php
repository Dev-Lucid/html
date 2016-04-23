<?php
namespace Lucid\Html;

class html
{
    public static $config = null;

    public static function init($config = null, $flavor = null)
    {

        if (is_null($config)) {
            static::$config = new \Lucid\Component\Container\Container();
        } else {
            if (is_object($config) === false || in_array('Lucid\\Component\\Container\\ContainerInterface', class_implements($config)) === false) {
                throw new \Exception('Html contructor parameter $config must either be null, or implement Lucid\\Component\\Container\\ContainerInterface (https://github.com/Dev-Lucid/container). If null is passed, then an instance of Lucid\\Component\\Container\\Container will be instantiated instead.');
            }

            # if a config object has been passed in, decorate it so that internally all indexes are prefixed with html:
            static::$config = $config;
        }

        static::$config->set('loadedClassCache', []);
        $hooks = [];

        try{
            $hooks['javascript'] = function($js) {
                return '<script language="Javascript">'.$js.'</script>';
            };
            static::$config->set('hooks', $hooks);
        }
        catch(\Exception $e) {
            exit($e->getMessage());
        }

        static::$config->set('iconPrefix', 'fa');     # default to font-awesome's prefix
        static::$config->set('formats', [
            'datetime'=>'yyyy-mm-dd hh:ii',
        ]);

        static::$config->set('autoloadMap', []);
        static::$config->get('autoloadMap')['Lucid\\Html\\base'] = __DIR__.'/src/base/';
        static::$config->get('autoloadMap')['Lucid\\Html\\base'] = __DIR__.'/src/base/';

        if (is_null($flavor) === false) {
            static::$config->get('autoloadMap')['Lucid\\Html\\'.$flavor] = __DIR__.'/src/'.$flavor.'/';
        }

        include(__DIR__.'/src/tag.php');

        spl_autoload_register('\\Lucid\\Html\\Html::autoLoader');
    }

    public static function addFlavor($namespacePrefix, $path)
    {

        static::$config->get('autoloadMap')[$namespacePrefix] = $path;
    }

    private static function autoLoader(string $name)
    {
        # this can be called one of two ways:
        #   1) via autoload, which means the path will be fully qualified. This is in the case where
        #      it is being used for inheritance purposes
        #   2) from DevLucid\html::__callStatic, in which case only the final class name is known, and all possible paths
        #      need to be checked.

        if (isset(static::$config->get('loadedClassCache')[$name]) === true) {
            return static::$config->get('loadedClassCache')[$name];
        }

        # Check if we're in condition 1 and build a map of possible file names and equivalent class names.
        if (strpos($name, '\\') === false) {
            foreach (static::$config->get('autoloadMap') as $prefix=>$path) {
                $filePath = $path.'tags/'.$name.'.php';
                $class = $prefix.'\\Tags\\'.$name;
                #static::$logger->debug('looking in '.$filePath.' for '.$class);
                if (file_exists($filePath) === true) {

                    static::$config->get('loadedClassCache')[$name] = $class;
                    if (class_exists($class) === false) {
                        include($filePath);

                        if (class_exists($class) === false) {
                            throw new \Exception('File did not contain correctly namespaced class definition for html tag');
                        }
                    }
                }
            }
            return static::$config->get('loadedClassCache')[$name] ?? null;
        } else {
            $nameParts = explode('\\', strtolower($name));
            if (strtolower($nameParts[0]) == 'lucid' && in_array('Lucid\\Html\\'.$nameParts[2], array_keys(static::$config->get('autoloadMap'))) === true) {
                $tagOrTrait = $name[3];
                $finalName  = $name[4];
                $finalPath = static::$config->get('autoloadMap')['Lucid\\Html\\'.$nameParts[2]].$nameParts[3].'/'.$nameParts[4].'.php';
                include($finalPath);
                return true;
            }
        }
    }

    public static function __callStatic($name, $params)
    {
        $finalClass = static::autoLoader($name);
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

        if (isset(static::$config->get('hooks')[$name.'__create']) === true && is_callable(static::$config->get('hooks')[$name.'__create']) === true) {
            $func = static::$config->get('hooks')[$name.'__create'];
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

