<?php
use Lucid\Html\Html as html;

class BootstrapCardTest extends BaseTest
{
    public function setup()
    {
        Lucid\Html\Html::init('Bootstrap');
        static::$jsLibrary = 'buildBootstrap';
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
    
    public function test_cardHeaderFooterFunctionality()
    {
        $output = '<div class="card"><div class="card-header">header</div><div class="card-block"></div><div class="card-footer text-muted">footer</div></div>';
        $code = "@build('card')->add(@build('cardBlock'))->set('header', 'header')->set('footer', 'footer')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_cardTitleSubtitleFunctionality()
    {
        $output = '<div class="card"><div class="card-block"><h4 class="card-title">title</h4><h6 class="card-subtitle text-muted">subtitle</h6></div></div>';
        $code = "@build('card')->set('title', 'title')->set('subtitle', 'subtitle')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
        
    public function test_cardBlockTitleSubtitleFunctionality()
    {
        $output = '<div class="card-block"><h4 class="card-title">title</h4><h6 class="card-subtitle text-muted">subtitle</h6></div>';
        $code = "@build('cardBlock')->set('title', 'title')->set('subtitle', 'subtitle')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_card_parameters()
    {
        $output = '<div class="card"><div class="card-header">header</div><div class="card-block"><p class="card-text">test</p></div><div class="card-footer text-muted">footer</div></div>';
        $code = "@build('card','header','test','footer')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_card_ul()
    {
        $output = '<div class="card"><ul class="list-group list-group-flush"><li class="list-group-item">test</li></ul></div>';
        $code = "@build('card')->add(@build('unorderedList')->add(@build('listItem', 'test')))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
}