<?php
use Lucid\Html\Html as html;

class BaseTagTest extends BaseTest
{

    public function testClassFunctions()
    {
        $output = '<span class="testClass1 testClass3">testClassFunctions</span>';
        $code = "\Lucid\Html\Html::build('span','testClassFunctions')->addClass('testClass1')->addClass('testClass2')->addClass('testClass3')->removeClass('testClass2')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<span class="testClass1">testClassFunctions</span>';
        $code = "\Lucid\Html\Html::build('span','testClassFunctions')->addClass('testClass1')->addClass('testClass2')->toggleClass('testClass2')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

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
        $this->runTestWithoutParameters('legend');
        $this->runTestWithoutParameters('listItem', 'li');
        $this->runTestWithoutParameters('main');
        $this->runTestWithoutParameters('mark');
        $this->runTestWithSetCalls('menu', 'menu', ['type'=>'context', 'label'=>'mymenu']);
        #$this->runTestWithSetCalls('menuitem', 'menuitem');
        $this->runTestWithoutParameters('nav');
        $this->runTestWithoutParameters('orderedList', 'ol');
        $this->runTestWithoutParameters('paragraph', 'p');
        $this->runTestWithoutParameters('preformatted', 'pre');
        $this->runTestWithoutParameters('quote', 'q');
        $this->runTestWithoutParameters('sample', 'samp');
        $this->runTestWithoutParameters('section');
        $this->runTestWithoutParameters('small');
        $this->runTestWithoutParameters('span');
        $this->runTestWithoutParameters('strikethrough', 's');
        $this->runTestWithoutParameters('strong');
        $this->runTestWithoutParameters('subscript', 'sub');
        $this->runTestWithoutParameters('summary');
        $this->runTestWithoutParameters('superscript', 'sup');
        $this->runTestWithoutParameters('tableBody', 'tbody');
        $this->runTestWithoutParameters('tableData', 'td');
        #$this->runTestWithoutParameters('tableData', 'td');
        #$this->runTestWithoutParameters('tableFoot', 'tfoot');
        #$this->runTestWithoutParameters('tableHead', 'thead');
        $this->runTestWithoutParameters('tableHeader', 'th');
        $this->runTestWithoutParameters('tableRow', 'tr');
        $this->runTestWithoutParameters('time', 'time');
        $this->runTestWithoutParameters('underline', 'u');
        $this->runTestWithoutParameters('unorderedList', 'ul');
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

    public function test_table()
    {
        $output = '<table><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>';
        $code = "\Lucid\Html\Html::build('table')->add(\Lucid\Html\Html::build('tableHead'))->add(\Lucid\Html\Html::build('tableBody'))->add(\Lucid\Html\Html::build('tableFoot'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<thead><tr><th>col1</th><th>col2</th></tr></thead>';
        $code = "\Lucid\Html\Html::build('tableHead')->add(\Lucid\Html\Html::build('tableHeader', 'col1'))->add(\Lucid\Html\Html::build('tableHeader', 'col2'))->render()";
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