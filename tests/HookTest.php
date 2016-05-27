<?php
use Lucid\Html\Html as html;

class HookTest extends BaseTest
{
    
    public function setup()
    {
        static::$jsConstruct = 'var factory = new lucid.html.factory();   factory.addHook([\'image\'], \'create\',  function(obj){   obj.set(\'alt\', \'test\');});';
        static::$phpConstruct = '  $factory = new \Lucid\Html\Factory(); $factory->addHook([\'image\'], \'create\', function($obj){ $obj->set(\'alt\', \'test\');});';
    }
    
    public function testCreateHook()
    {
        $output = '<img alt="test" />';
        $code = "@build('image')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        #$this->assertEquals($output, $this->runAsPHP($code));
    }
}