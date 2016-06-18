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
        $output = '<div class="form-group"><input type="text" name="test" class="form-control" /></div>';
        $code = "@build('formGroup')->add(@build('inputText', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="form-group"><div class="checkbox"><label><input type="checkbox" name="test" class="form-check-input" /></label></div></div>';
        $code = "@build('formGroup')->add(@build('inputCheckbox', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="form-group"><div class="checkbox"><label><input type="checkbox" name="test" class="form-check-input" /></label></div></div>';
        $code = "@build('formGroup')->add(@build('inputCheckbox', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="form-group"><div class="radio"><label><input type="radio" name="test" class="form-check-input" /></label></div></div>';
        $code = "@build('formGroup')->add(@build('inputRadio', 'test'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="form-group"><label for="email">Email</label><input type="email" name="email" class="form-control" /><small class="text-muted">help</small></div>';
        $code = "@build('formGroup')->add(@build('label', 'email', 'Email'))->add(@build('inputEmail', 'email'))->add(@build('inputHelp', 'help'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<div class="form-group"><label for="email">Email</label><input type="email" name="email" value="" class="form-control" /><br /><small class="text-muted">help</small></div>';
        $code = "@build('formGroup', 'inputEmail', 'Email', 'email',  '', 'help')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<div class="form-group row"><label for="email" class="col-sm-3 col-form-label">Email</label><div class="col-sm-9"><input type="email" name="email" value="" class="form-control" /></div><br /><small class="text-muted">help</small></div>';
        $code = "@build('formGroup', 'inputEmail', 'Email', 'email', '', 'help')->set('useRowLayout', true)->set('gridSizeLabel', 3)->set('gridSizeField', 9)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="form-group row"><label for="remember_me" class="col-sm-3 col-form-label">&nbsp;</label><div class="checkbox"><div class="col-sm-9"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="remember_me" checked="checked" class="form-check-input" /> Remember me<br /><small class="text-muted">help</small></label></div></div></div></div>';
        $code = "@build('formGroup', 'inputCheckbox', '', 'remember_me',  true,  ' Remember me', 'help')->set('useRowLayout', true)->set('gridSizeLabel', 3)->set('gridSizeField', 9)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}