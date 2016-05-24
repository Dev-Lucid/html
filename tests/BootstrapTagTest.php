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
}