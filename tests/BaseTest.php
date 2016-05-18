<?php

abstract class BaseTest extends PHPUnit_Framework_TestCase
{

    public function runAsJs(string $php)
    {

        $finalSrc = '( cat '.__DIR__.'/../dist/lucid.html.buildBaseTagsOnly.js ;  echo "console.log(';
        $finalSrc .= $this->convertFromPHPToJavascript($php);
        $finalSrc .= ');") | node';


        return trim(shell_exec($finalSrc));
    }

    public function runAsPHP(string $php)
    {
        return trim(eval('return '.$php.';'));
    }

    public function convertFromPHPToJavascript(string $php) : string
    {
        $js = str_replace('$', '', $php);
        $js = str_replace('->', '.', $js);
        $js = str_replace('\\Lucid\\Html\\Html::build', 'lucid.html.build', $js);

        return $js;
    }
}
