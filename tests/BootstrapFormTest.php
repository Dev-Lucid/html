<?php
use Lucid\Html\Html as html;

class BootstrapFormTest extends BaseTest
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
    
    public function test_formGroup()
    {
        $output = '<fieldset class="form-group"><input type="text" name="test" class="form-control" /></fieldset>';
        $code = "@build('formGroup')->add(@build('inputText', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="checkbox"><label><input type="checkbox" name="test" /></label></div>';
        $code = "@build('formGroup')->add(@build('inputCheckbox', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="checkbox"><label><div><input type="checkbox" name="test" /></div></label></div>';
        $code = "@build('formGroup')->add(@build('div')->add(@build('inputCheckbox', 'test')))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="radio"><label><div><input type="radio" name="test" /></div></label></div>';
        $code = "@build('formGroup')->add(@build('div')->add(@build('inputRadio', 'test')))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<fieldset class="form-group"><label for="email">Email</label><input type="email" name="email" class="form-control" /><small class="text-muted">help</small></fieldset>';
        $code = "@build('formGroup')->add(@build('label', 'email', 'Email'))->add(@build('inputEmail', 'email'))->add(@build('inputHelp', 'help'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<fieldset class="form-group"><label for="email">Email</label><input type="email" name="email" value="" class="form-control" /><small class="text-muted">help</small></fieldset>';
        $code = "@build('formGroup', 'email', 'Email', 'inputEmail', '', 'help')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<fieldset class="form-group row"><label for="email" class="col-sm-3 col-form-label">Email</label><div class="col-sm-9"><input type="email" name="email" value="" class="form-control" /></div><small class="text-muted">help</small></fieldset>';
        $code = "@build('formGroup', 'email', 'Email', 'inputEmail', '', 'help')->set('rowLayout', true)->set('gridSizeLabel', 3)->set('gridSizeField', 9)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
}