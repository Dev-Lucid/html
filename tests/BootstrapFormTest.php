<?php
use Lucid\Html\Html as html;

class BootstrapFormTest extends BaseTest
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
    
    public function test_formGroup()
    {
        $output = '<fieldset class="form-group"><input type="text" class="form-control" name="test" /></fieldset>';
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

        $output = '<fieldset class="form-group"><label for="email">Email</label><input type="email" class="form-control" name="email" /><small class="text-muted">help</small></fieldset>';
        $code = "@build('formGroup', @build('label', 'email', 'Email'), @build('inputEmail', 'email'), @build('inputHelp', 'help'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
}