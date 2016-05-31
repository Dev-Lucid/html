<?php
use Lucid\Html\Html as html;

class BootstrapTableTest extends BaseTest
{
    public function setup()
    {
        static::$phpConstruct = '$factory = new \Lucid\Html\Factory(\'Bootstrap\');';
        static::$jsLibrary = 'buildBootstrap';
    }
    
    public function test_tableFlags()
    {
        $output = '<div class="table-responsive"><table class="table"></table></div>';
        $code = "@build('table')->set('responsive', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<table class="table table-striped"></table>';
        $code = "@build('table')->set('striped', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<table class="table table-inverse"></table>';
        $code = "@build('table')->set('inverse', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<table class="table table-info"></table>';
        $code = "@build('table')->set('modifier', 'info')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<table class="table table-sm"></table>';
        $code = "@build('table')->set('size', 'sm')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<table class="table table-bordered"></table>';
        $code = "@build('table')->set('bordered', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
    
    public function test_rowFlags()
    {
        $output = '<table class="table"><tr class="table-success"></tr></table>';
        $code = "@build('table')->add(@build('tableRow')->set('modifier', 'success'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
}