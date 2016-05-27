<?php
use Lucid\Html\Html as html;

class BootstrapExceptionsTest extends BaseTest
{    
    public function setup()
    {
        static::$phpConstruct = '$factory = new \Lucid\Html\Factory(\'Bootstrap\');';
        static::$jsLibrary = 'buildBootstrap';
    }
    
    public function testInvalidAttributeValueCardInverseable()
    {
        $output = '<div class="card card-primary card-inverse"></div>';
        $code = "@build('card')->set('modifier', 'primary')->set('inverse', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $this->setExpectedException(\Lucid\Html\Exception\InvalidAttributeValue::class);
        $this->runAsPHP("@build('card')->set('inverse', 'NOYOU')->render()");
    }
    
    public function testInvalidAttributeValueInputTestSizeable()
    {
        $output = '<input type="text" class="form-control form-control-lg" />';
        $code = "@build('inputText')->set('size', 'lg')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $this->setExpectedException(\Lucid\Html\Exception\InvalidAttributeValue::class);
        $this->runAsPHP("@build('inputText')->set('size', 'badvalue')->render()");
    }
}