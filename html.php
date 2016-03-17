<?php

namespace DevLucid;

class html
{
    public static $logger = null;
    public static $flavors = [];
    public static $iconPrefix = 'fa';
    public static $hooks = [];

    public static $loadedClassCache = [];

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

    public static function init($flavor = null, $additional=null)
    {
        html::$flavors[] = ['prefix'=>'base', 'path'=>__DIR__.'/src/base/php/'];
        if (is_null($flavor) === false) {
            html::$flavors[] = ['prefix'=>$flavor, 'path'=>__DIR__.'/src/'.$flavor.'/php/'];
        }
        if(is_null($additional) === false) {
            html::$flavors[] = $additional;
        }

        foreach (html::$flavors as $flavor) {
            $files = html::makeLoadPaths($flavor);
            foreach ($files as $file) {
                include($file);
            }
        }

        class_alias('DevLucid\\html','html');
    }

    private static function makeLoadPaths($flavor)
    {
        $files = [];
        $suffixes = ['traits','tags',];
        foreach ($suffixes as $suffix) {
            $file_name = $flavor['path'].$flavor['prefix'].'_'.$suffix.'.php';
            if (file_exists($file_name) === true) {
                $files[] = $file_name;
            }
        }
        return $files;
    }

    private static function checkForClass($possibleClassNames)
    {
        $finalClassName = null;
        # loop over this list and look for a match. If we find one, use that class name.
        foreach ($possibleClassNames as $possibleClassName) {
            if ( class_exists($possibleClassName) === true) {
                return $possibleClassName;
            }
        }
        return $finalClassName;
    }


    public static function __callStatic($name,$params)
    {
        $final_class = null;

        # build an array of possible class names for this type.
        $possibleClassNames = [];
        foreach (html::$flavors as $flavor) {
            $possibleClassNames[] = strtolower('DevLucid\\Tag\\'.$flavor['prefix'].$name);
        }
        $possibleClassNames = array_reverse($possibleClassNames);


        $finalClassName = \DevLucid\html::checkForClass($possibleClassNames);

        # if we didn't find one, then load class files
        if (is_null($finalClassName) === true) {
            foreach (html::$flavors as $flavor) {
                $fileName  = $flavor['path'].$name.'.php';
                if (file_exists($fileName) === true){
                    include($fileName);
                }
            }
            $finalClassName = \DevLucid\html::checkForClass($possibleClassNames);
        }

        if (is_null($finalClassName) === true){
            $obj = new Tag\BaseTag();
        } else {
            $obj = new $finalClassName();
        }

        #$obj->type = $name;
        if (is_null($obj->tag) === true) {
            $obj->tag = $name;
        }
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
