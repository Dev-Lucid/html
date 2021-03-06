<?php
use Lucid\Html\Html as html;

class BootstrapTagTest extends BaseTest
{
    public function setup()
    {
        static::$phpConstruct = '$factory = new \Lucid\Html\Factory(\'Bootstrap\');';
        static::$jsLibrary = 'buildBootstrap';
    }
    
    public function test_inputGroup()
    {
        $output = '<div class="input-group"><span class="input-group-addon">@</span><input type="text" name="test" class="form-control" /></div>';
        $code = "@build('inputGroup')->add('@')->add(@build('inputText', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_badge()
    {
        $output = '<span class="tag tag-primary">test</span>';
        $code = "@build('badge', 'primary', 'test')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<span class="tag tag-primary tag-pill">test</span>';
        $code = "@build('badge', 'primary', 'test')->set('pill', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    } 
    
    public function test_breadcrumb()
    {
        $output = '<ol class="breadcrumb"></ol>';
        $code = "@build('breadcrumb')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }   
}