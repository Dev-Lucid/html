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
        $output = '<button type="button" class="btn btn-warning btn-lg pull-xs-right pull-sm-right pull-md-right pull-lg-right pull-xl-right" onclick="console.log(this);">testbutton</button>';
        $code = "@build('button', 'warning', 'console.log(this);', 'testbutton')->set('size', 'lg')->set('pull', 'right')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_paragraph()
    {
        $output = '<p class="text-warning pull-xs-right pull-sm-left pull-md-right pull-lg-left pull-xl-right">testp</p>';
        $code = "@build('paragraph')->set('modifier', 'warning')->set('pull', ['right', 'left', 'right', 'left', 'right'])->add('testp')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_anchor()
    {
        $output = '<a href="google.com" class="text-success pull-xs-right pull-sm-left pull-md-right pull-lg-left pull-xl-right">mylink</a>';
        $code = "@build('anchor', 'google.com', 'mylink')->set('modifier', 'success')->set('pull', ['right', 'left', 'right', 'left', 'right'])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_span()
    {
        $output = '<span class="text-info pull-xs-right pull-sm-left pull-md-right pull-lg-left pull-xl-right">mytag</span>';
        $code = "@build('span', 'mytag')->set('modifier', 'info')->set('pull', ['right', 'left', 'right', 'left', 'right'])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_div()
    {
        $output = '<div class="text-info pull-xs-right pull-sm-left pull-md-right pull-lg-left pull-xl-right">mytag</div>';
        $code = "@build('div', 'mytag')->set('modifier', 'info')->set('pull', ['right', 'left', 'right', 'left', 'right'])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_anchorButton()
    {
        $output = '<a role="button" class="btn btn-primary pull-xs-right pull-sm-left pull-md-right pull-lg-left pull-xl-right" onclick="console.log(this);">mybutton</a>';
        $code = "@build('anchorButton', 'primary', 'console.log(this);', 'mybutton')->set('modifier', 'primary')->set('pull', ['right', 'left', 'right', 'left', 'right'])->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_cardParts()
    {
        $output = '<h4 class="card-title">title</h4>';
        $code = "@build('cardTitle', 'title')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<h6 class="card-subtitle text-muted">subtitle</h6>';
        $code = "@build('cardSubtitle', 'subtitle')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="card-header">header</div>';
        $code = "@build('cardHeader', 'header')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<div class="card-footer text-muted">footer</div>';
        $code = "@build('cardFooter', 'footer')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<div class="card"></div>';
        $code = "@build('card')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<div class="card-block"></div>';
        $code = "@build('cardBlock')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        

        $output = '<div class="card"><div class="card-header">header</div><div class="card-block"><h4 class="card-title">title</h4><h6 class="card-subtitle text-muted">subtitle</h6></div><div class="card-footer text-muted">footer</div></div>';
        $code = "@build('card')->add(@build('cardHeader', 'header'))->add(@build('cardBlock')->add(@build('cardTitle', 'title'))->add(@build('cardSubtitle', 'subtitle')))->add(@build('cardFooter', 'footer'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
}