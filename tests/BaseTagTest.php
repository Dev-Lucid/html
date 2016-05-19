<?php
use Lucid\Html\Html as html;

class BaseTagTest extends BaseTest
{

    public function test_tags()
    {
        $this->runTestWithParameters('abbreviation', 'abbr', ['title'=>'titleAbbr']);
        $this->runTestWithoutParameters('address');
        $this->runTestWithoutParameters('article');
        $this->runTestWithParameters('blockquote', 'blockquote', ['cite'=>'testcite']);
        $this->runTestWithoutParameters('bold', 'b');
        $this->runTestWithSetCalls('caption', 'caption', ['align'=>'center']);
        $this->runTestWithoutParameters('cite');
        $this->runTestWithSetCalls('column', 'col', ['span'=>'3', 'class'=>'width-40']);
        $this->runTestWithoutParameters('columnGroup', 'colgroup');
        $this->runTestWithoutParameters('definition', 'dfn');
        $this->runTestWithoutParameters('listItem', 'li');
        $this->runTestWithoutParameters('details');
        $this->runTestWithoutParameters('div');
        $this->runTestWithoutParameters('emphasis', 'em');
        $this->runTestWithoutParameters('definitionTerm', 'dt');
        $this->runTestWithoutParameters('definitionDescription', 'dd');
        $this->runTestWithoutParameters('figure');
        $this->runTestWithoutParameters('figureCaption', 'figcaption');
        $this->runTestWithoutParameters('footer');
        $this->runTestWithParameters('form', 'form', ['name'=>'testForm', 'action'=>'action.php']);
        $this->runTestWithSetCalls('form', 'form', ['name'=>'testForm', 'action'=>'action.php', 'method'=>'post']);
        $this->runTestWithoutParameters('h1');
        $this->runTestWithoutParameters('h2');
        $this->runTestWithoutParameters('h3');
        $this->runTestWithoutParameters('h4');
        $this->runTestWithoutParameters('h5');
        $this->runTestWithoutParameters('h6');
        $this->runTestWithoutParameters('header');
        $this->runTestWithoutParameters('insert', 'ins');
        $this->runTestWithoutParameters('italic', 'i');
        $this->runTestWithParameters('label', 'label', ['for'=>'testfor']);
    }


    public function test_br()
    {
        $output = '<br />';
        $code = "\Lucid\Html\Html::build('br')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_hr()
    {
        $output = '<hr />';
        $code = "\Lucid\Html\Html::build('hr')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    # note: this implicitly tests definitionTerm and definitionDescription
    public function test_definitionList()
    {
        $output = '<dl><dt>term</dt><dd>description</dd></dl>';

        $code = "\Lucid\Html\Html::build('definitionList', \Lucid\Html\Html::build('definitionTerm', 'term'), \Lucid\Html\Html::build('definitionDescription', 'description'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

}