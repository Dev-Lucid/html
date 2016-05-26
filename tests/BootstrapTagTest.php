<?php
use Lucid\Html\Html as html;

class BootstrapTagTest extends BaseTest
{
    public function setup()
    {
        Lucid\Html\Html::init('Bootstrap');
        static::$jsLibrary = 'buildBootstrap';
    }
    
    public function test_inputGroup()
    {
        $output = '<div class="input-group"><span class="input-group-addon">@</span><input type="text" class="form-control" name="test" /></div>';
        $code = "@build('inputGroup')->add('@')->add(@build('inputText', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}