<?php
use Lucid\Html\Html as html;

class BaseTagTest extends BaseTest
{
    public function test_abbreviation()
    {
        $output = '<abbr title="titleAttr">test</abbr>';

        $code = "\Lucid\Html\Html::build('abbreviation', 'test', 'titleAttr')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $code = "\Lucid\Html\Html::build('abbreviation')->set('title', 'titleAttr')->add('test')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }

    public function test_address()
    {
        $output = '<address>helloworld</address>';

        $code = "\Lucid\Html\Html::build('address', 'helloworld')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $code = "\Lucid\Html\Html::build('address')->add('hello')->add('world')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_article()
    {
        $output = '<article>hi</article>';

        $code = "\Lucid\Html\Html::build('article', 'hi')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $code = "\Lucid\Html\Html::build('article')->add('hi')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_blockquote()
    {
        $output = '<blockquote cite="google">hi</blockquote>';

        $code = "\Lucid\Html\Html::build('blockquote', 'google', 'hi')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $code   = "\Lucid\Html\Html::build('blockquote')->set('cite','google')->add('hi')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_bold()
    {
        $output = '<b>hi</b>';
        $code = "\Lucid\Html\Html::build('bold')->add('hi')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_br()
    {
        $output = '<br />';
        $code = "\Lucid\Html\Html::build('br')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_caption()
    {
        $output = '<caption align="center">mycaption</caption>';
        $code = "\Lucid\Html\Html::build('caption')->set('align', 'center')->add('mycaption')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_cite()
    {
        $output = '<cite>mycite</cite>';

        $code = "\Lucid\Html\Html::build('cite', 'mycite')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $code = "\Lucid\Html\Html::build('cite')->add('mycite')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_columnGroup()
    {
        $output = '<colgroup></colgroup>';

        $code = "\Lucid\Html\Html::build('columnGroup')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_listItem()
    {
        $output = '<li></li>';
        $code   = "\Lucid\Html\Html::build('listItem')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}