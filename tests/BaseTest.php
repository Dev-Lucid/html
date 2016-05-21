<?php

abstract class BaseTest extends PHPUnit_Framework_TestCase
{

    public function runAsJs(string $php, array $searchReplace = [])
    {
        foreach ($searchReplace as $key=>$value) {
            $php = str_replace($key, $value, $php);
        }
        $finalSrc = '( cat '.__DIR__.'/../dist/lucid.html.buildBaseTagsOnly.js ;  echo "console.log(';
        $finalSrc .= $this->convertFromPHPToJavascript($php);
        $finalSrc .= ');") | node';


        return trim(shell_exec($finalSrc));
    }

    public function runAsPHP(string $php, array $searchReplace = [])
    {
        foreach ($searchReplace as $key=>$value) {
            $php = str_replace($key, $value, $php);
        }
        return trim(eval('return '.$php.';'));
    }

    public function convertFromPHPToJavascript(string $php) : string
    {
        $js = str_replace('$', '', $php);
        $js = str_replace('->', '.', $js);
        $js = str_replace('=>', ':', $js);
        $js = str_replace('\\Lucid\\Html\\Html::build', 'lucid.html.build', $js);

        return $js;
    }

    public function runTestWithoutParameters(string $className, string $tagName=null)
    {
        if (is_null($tagName) === true) {
            $tagName = $className;
        }

        $output = '<'.$tagName.'>hiya</'.$tagName.'>';

        $code = "\Lucid\Html\Html::build('".$className."', 'hiya')->render()";
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

        $code = "\Lucid\Html\Html::build('$className', $code '$className')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
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

        $code = "\Lucid\Html\Html::build('$className')".$code."->add('$className')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}
