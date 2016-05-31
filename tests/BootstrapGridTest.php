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
    
    public function test_gridoffset()
    {
        $output = '<div class="offset-xs-12 offset-sm-11 offset-md-10 offset-lg-9 offset-xl-8"></div>';
        $code = "@build('div')->set('offset', [12, 11, 10, 9, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="offset-xs-12 offset-md-10 offset-xl-8"></div>';
        $code = "@build('div')->set('offset', [12, null, 10, null, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
    
    public function test_gridpull()
    {
        $output = '<div class="pull-xs-12 pull-sm-11 pull-md-10 pull-lg-9 pull-xl-8"></div>';
        $code = "@build('div')->set('gridPull', [12, 11, 10, 9, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="pull-xs-12 pull-md-10 pull-xl-8"></div>';
        $code = "@build('div')->set('gridPull', [12, null, 10, null, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
    
    public function test_gridpush()
    {
        $output = '<div class="push-xs-12 push-sm-11 push-md-10 push-lg-9 push-xl-8"></div>';
        $code = "@build('div')->set('gridPush', [12, 11, 10, 9, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="push-xs-12 push-md-10 push-xl-8"></div>';
        $code = "@build('div')->set('gridPush', [12, null, 10, null, 8])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
    
    public function test_gridinput()
    {
        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="text" name="test" class="form-control" /></div>';
        $code = "@build('inputText', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="email" name="test" class="form-control" /></div>';
        $code = "@build('inputEmail', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="password" name="test" class="form-control" /></div>';
        $code = "@build('inputPassword', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="number" name="test" class="form-control" /></div>';
        $code = "@build('inputNumber', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="tel" name="test" class="form-control" /></div>';
        $code = "@build('inputTelephone', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="url" name="test" class="form-control" /></div>';
        $code = "@build('inputUrl', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="file" name="test" class="form-control-file" /></div>';
        $code = "@build('inputFile', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="checkbox" name="test" /></div>';
        $code = "@build('inputCheckbox', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><input type="radio" name="test" /></div>';
        $code = "@build('inputRadio', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><textarea name="test" class="form-control"></textarea></div>';
        $code = "@build('inputTextarea', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="col-xs-8 offset-sm-5 push-md-3 pull-lg-2"><select name="test" class="form-control"></select></div>';
        $code = "@build('inputSelect', 'test')->set('grid', [8])->set('offset', [null, 5])->set('gridPush', [null, null, 3])->set('gridPull', [null, null, null, 2])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}