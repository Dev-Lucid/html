<?php

abstract class BaseTest extends PHPUnit_Framework_TestCase
{
    public static $jsLibrary = 'buildBaseTagsOnly';
    public static $jsConstruct = 'var factory = new lucid.html.factory();';
    public static $phpConstruct = '$factory = new \Lucid\Html\Factory();';
    public function translateMetaCode(string $metaCode, string $language) : string
    {
        $translators = [
            '$' => [ 'php'=>null, 'js'=>'', ],
            '->' => [ 'php'=>null, 'js'=>'.', ],
            '=>' => [ 'php'=>null, 'js'=>':', ],
            '@[' => [ 'php'=>'[', 'js'=>'{', ],
            ']@' => [ 'php'=>']', 'js'=>'}', ],
            '#[' => [ 'php'=>'[', 'js'=>'[', ],
            ']#' => [ 'php'=>']', 'js'=>']', ],
            '+.' => [ 'php'=>'.', 'js'=>'+', ],
            '@build'=> ['php'=>'$factory->build', 'js'=>'factory.build'],
            '@buildFromArray'=> ['php'=>'$factory->buildFromArray', 'js'=>'factory.buildFromArray'],
        ];
        
        foreach ($translators as $meta=>$final ){
            $final = $final[$language];
            
            if (is_null($final) === false) {
                $metaCode = str_replace($meta, $final, $metaCode);
            }
        }
        return $metaCode;
    }
    
    public function runAsJs(string $metaCode, array $searchReplace = [])
    {
        $metaCode = $this->translateMetaCode($metaCode, 'js');
        foreach ($searchReplace as $key=>$value) {
            $metaCode = str_replace($key, $value, $metaCode);
        }
        $finalSrc = '( cat '.__DIR__.'/../dist/lucid.html.'.(static::$jsLibrary).'.js ;  echo " '.static::$jsConstruct.' console.log(';
        $finalSrc .= $metaCode;
        $finalSrc .= ');") | node';


        return trim(shell_exec($finalSrc));
    }

    public function runAsPHP(string $metaCode, array $searchReplace = [])
    {
        $php = $this->translateMetaCode($metaCode, 'php');
        foreach ($searchReplace as $key=>$value) {
            $php = str_replace($key, $value, $php);
        }
        
        return trim(eval(static::$phpConstruct.'return '.$php.';'));
    }

    public function runTestWithoutParameters(string $className, string $tagName=null)
    {
        if (is_null($tagName) === true) {
            $tagName = $className;
        }

        $output = '<'.$tagName.'>hiya</'.$tagName.'>';

        $code = "@build('".$className."', 'hiya')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function runTestWithParameters(string $className, string $tagName=null, array $parameters=[])
    {
        $attrs = '';
        $code  = '';
        foreach ($parameters as $key=>$value) {
            $code  .= "'".$value."', ";
            $attrs .= ' '.$key.'="'.$value.'"';
        }

        if (is_null($tagName) === true) {
            $tagName = $className;
        }

        $output = '<'.$tagName.$attrs.'>'.$className.'</'.$tagName.'>';

        $metaCode = "@build('$className', $code '$className')->render()";
        $this->assertEquals($output, $this->runAsJs($metaCode));
        $this->assertEquals($output, $this->runAsPHP($metaCode));
    }

    public function runTestWithSetCalls(string $className, string $tagName=null, array $setters=[])
    {
        $attrs = '';
        $code  = '';
        foreach ($setters as $key=>$value) {
            $code  .= "->set('$key', '".$value."')";
            $attrs .= ' '.$key.'="'.$value.'"';
        }

        if (is_null($tagName) === true) {
            $tagName = $className;
        }

        $output = '<'.$tagName.$attrs.'>'.$className.'</'.$tagName.'>';

        $code = "@build('$className')".$code."->add('$className')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}
