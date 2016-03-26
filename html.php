<?php
namespace Lucid\Html;

class html
{
    protected static $isInited = false;
    public static $logger = null;
    public static $flavors = [];
    public static $iconPrefix = 'fa';
    public static $hooks = [];

    public static $loadedClassCache = [];
    public static $autoloadMap = [];


    /*
    public static function log($text = null)
    {
        if (is_null(html::$logger) === false) {
            if (is_null($text)) {
                return html::$logger;
            }
            # we can split objects/arrays into multiple lines using print_r and some exploding
            if (is_object($text) === true or is_array($text) === true) {
                $text = print_r($text, true);
                $text = explode("\n",$text);
                foreach ($text as $line) {
                    html::log($line);
                }
            } else {
                $text = rtrim($text);
                if ($text != '') {
                    if (is_object(html::$logger) === true) {
                        html::$logger->debug($text);
                    }
                }
            }
        }
    }
    */

    public static function init($logger=null, $flavor = null, $additionals=null)
    {
        static::$isInited = true;
        if (is_null($logger)) {
            static::$logger = new \Lucid\Component\BasicLogger\BasicLogger();
        } else {
            if (is_object($logger) === false || in_array('Psr\\Log\\LoggerInterface', class_implements($logger)) === false) {
                throw new \Exception('Html contructor parameter $logger must either be null, or implement Psr\\Log\\LoggerInterface. If null is passed, then an instance of Lucid\\Component\\BasicLogger\\BasicLogger will be instantiated instead, and all messages will be passed along to error_log();');
            }
            static::$logger = $logger;
        }
        #static::$logger->debug('logging initted for html compontent');

        html::$autoloadMap['Lucid\\Html\\base'] = __DIR__.'/src/base/';

        if (is_null($flavor) === false) {
            html::$flavors[] = ['prefix'=>$flavor, 'path'=>__DIR__.'/src/'.$flavor.'/php/'];
            html::$autoloadMap['Lucid\\Html\\'.$flavor] = __DIR__.'/src/'.$flavor.'/';
        }

        foreach ($additionals as $prefix=>$path) {
            html::$flavors[] = $prefix;
            html::$autoloadMap['Lucid\\Html\\'.$prefix] = $path;
        }
        #static::$logger->debug(print_r(html::$autoloadMap,true));
        include(__DIR__.'/src/tag.php');

        spl_autoload_register('\\Lucid\\Html\\Html::autoLoader');
    }

    private static function autoLoader(string $name)
    {

        # this can be called one of two ways:
        #   1) via autoload, which means the path will be fully qualified. This is in the case where
        #      it is being used for inheritance purposes
        #   2) from DevLucid\html::__callStatic, in which case only the final class name is known, and all possible paths
        #      need to be checked.

        if (isset(html::$loadedClassCache[$name]) === true) {
            return html::$loadedClassCache[$name];
        }

        # Check if we're in condition 1 and build a map of possible file names and equivalent class names.
        if (strpos($name, '\\') === false) {
            foreach (html::$autoloadMap as $prefix=>$path) {
                $filePath = $path.'tags/'.$name.'.php';
                $class = $prefix.'\\Tags\\'.$name;
                static::$logger->debug('looking in '.$filePath.' for '.$class);
                if (file_exists($filePath) === true) {

                    html::$loadedClassCache[$name] = $class;
                    if (class_exists($class) === false) {
                        include($filePath);

                        if (class_exists($class) === false) {
                            throw new \Exception('File did not contain correctly namespaced class definition for html tag');
                        }
                    }
                }
            }
            return html::$loadedClassCache[$name] ?? null;
        } else {
            $nameParts = explode('\\', strtolower($name));
            if (strtolower($nameParts[0]) == 'lucid' && in_array('Lucid\\Html\\'.$nameParts[2], array_keys(static::$autoloadMap)) === true) {
                $tagOrTrait = $name[3];
                $finalName  = $name[4];
                $finalPath = html::$autoloadMap['Lucid\\Html\\'.$nameParts[2]].$nameParts[3].'/'.$nameParts[4].'.php';
                include($finalPath);
                return true;
            }
        }
    }

    public static function __callStatic($name, $params)
    {
        if (static::$isInited === false ){
            static::init();
        }
        $finalClass = html::autoLoader($name);
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

        if (isset(html::$hooks[$name.'__create']) === true && is_callable(html::$hooks[$name.'__create']) === true) {
            $func = html::$hooks[$name.'__create'];
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

html::$hooks['javascript'] = function($js) {
    return '<script language="Javascript">'.$js.'</script>';
};
