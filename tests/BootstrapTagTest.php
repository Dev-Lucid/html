<?php
use Lucid\Html\Html as html;

class BootstrapTagTest extends BaseTest
{
    public function setup()
    {
        Lucid\Html\Html::init('Bootstrap');
        static::$jsLibrary = 'buildBootstrap';
    }

    public function test_alert()
    {
        $output = '<div role="alert" class="alert alert-danger"><strong>hiya</strong> hi</div>';
        $code = "@build('alert', 'danger', 'hiya', 'hi')->render()";
        $this->assertEquals($output, $this->runAsJs($code, [], 'buildBootstrap'));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_button()
    {
        $output = '<button type="button" class="btn btn-warning btn-lg pull-right" onclick="console.log(this);">testbutton</button>';
        $code = "@build('button', 'warning', 'console.log(this);', 'testbutton')->set('size', 'lg')->set('pull', 'right')->render()";
        #$this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}