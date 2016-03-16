<?php

namespace DevLucid;

class html
{
    static $logger = null;
    static $flavors = [];
    static $icon_prefix = 'fa';
    static $hooks = [];

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
                    if (is_object(factory::$logger) === true) {
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

    public static function __callStatic($name,$params)
    {
        $final_class = null;
        foreach (html::$flavors as $flavor) {
            $file_name  = $flavor['path'].'/'.$name.'.php';
            $class_name = 'DevLucid\\'.$flavor['prefix'].'_'.$name;

            if (class_exists($class_name) === false && file_exists($file_name) === true){
                include($file_name);
            }
            if (class_exists($class_name) === true) {
                $final_class = $class_name;
            }
        }

        if (is_null($final_class) === true){
            //throw new Exception('Unable to create html for class '.$name.', could not find a definition in any of the configured paths.');
            $obj = new base_tag();
        } else {
            $obj = new $final_class();
        }

        #$obj->type = $name;
        if (is_null($obj->tag) === true) {
            $obj->tag = $name;
        }
        $obj->set_properties($params);

        if (isset(html::$hooks[$name.'__create']) === true && is_callable(html::$hooks[$name.'__create']) === true) {
            $func = html::$hooks[$name.'__create'];
            $func($obj);
        }

        return $obj;
    }

    public static function error_boolean($obj, $property, $bad_value)
    {
        if ($bad_value !== true && $bad_value !== false && is_null($value) === false) {
            throw new \Exception('Class '.get_class($obj).' property '.$property.' must be set to true, false, or null.');
        }
    }

    public static function error_values($obj, $property, $bad_value, $good_values)
    {
        if (in_array($bad_value, $good_values) === false) {
            throw new \Exception('Class '.get_class($obj).' property '.$property.' must be one of the following values: '.implode(', ',$good_values));
        }
    }

    public static function error_child_tag($obj, $bad_tag, $allowed_tags=null, $disallowed_tags=null)
    {
        if (is_null($allowed_tags) === false && in_array($bad_tag, $allowed_tags) === false) {
            throw new \Exception('Class '.get_class($obj).' can only have children with tag '.implode(', ',$allowed_tags));
        }

        if (is_null($disallowed_tags) === false && in_array($bad_tag, $disallowed_tags) === true) {
            throw new \Exception('Class '.get_class($obj).' can not have children with tag '.implode(', ',$disallowed_tags));
        }
    }
}

html::$hooks['javascript'] = function($js) {
    return '<script language="Javascript">'.$js.'</script>';
};
