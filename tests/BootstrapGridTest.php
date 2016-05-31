<?php
use Lucid\Html\Html as html;

class BootstrapGridTest extends BaseTest
{
    public function setup()
    {
        static::$phpConstruct = '$factory = new \Lucid\Html\Factory(\'Bootstrap\');';
        static::$jsLibrary = 'buildBootstrap';
    }
    
    public function test_container()
    {
        $output = '<div class="container"></div>';
        $code = "@build('container')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<div class="container container-fluid"></div>';
        $code = "@build('container')->set('fluid', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_row()
    {
        $output = '<div class="container"><div class="row"></div></div>';
        $code = "@build('container')->add(@build('row'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_gridsize()
    {
        $output = '<div class="col-xs-12 col-sm-11 col-md-10 col-lg-9 col-xl-8"></div>';
        $code = "@build('div')->set('grid', [12, 11, 10, 9, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-12 col-md-10 col-xl-8"></div>';
        $code = "@build('div')->set('grid', [12, null, 10, null, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
}