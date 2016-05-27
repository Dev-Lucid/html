<?php
use Lucid\Html\Html as html;

class BaseTagTest extends BaseTest
{
    
    public function setup()
    {
    }

    public function testClassFunctions()
    {
        $output = '<span class="testClass1 testClass3">testClassFunctions</span>';
        $code = "@build('span','testClassFunctions')->addClass('testClass1')->addClass('testClass2')->addClass('testClass3')->removeClass('testClass2')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<span class="testClass1">testClassFunctions</span>';
        $code = "@build('span','testClassFunctions')->addClass('testClass1')->addClass('testClass2')->toggleClass('testClass2')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_tags1()
    {
        $this->runTestWithParameters('abbreviation', 'abbr', ['title'=>'titleAbbr']);
        $this->runTestWithoutParameters('address');
        $this->runTestWithoutParameters('article');
        $this->runTestWithoutParameters('aside');
        $this->runTestWithParameters('base', 'base', ['href'=>'google.com', 'target'=>'something']);
        $this->runTestWithParameters('blockquote', 'blockquote', ['cite'=>'testcite']);
        $this->runTestWithoutParameters('dialog');
        $this->runTestWithoutParameters('body');
        $this->runTestWithoutParameters('bold', 'b');
        $this->runTestWithParameters('canvas', 'canvas', ['height'=>80, 'width'=>60]);
    }
    
    public function test_tags2()
    {
        $this->runTestWithSetCalls('caption', 'caption', ['align'=>'center']);
        $this->runTestWithSetCalls('progress', 'progress', ['value'=>15, 'max'=>100]);
        $this->runTestWithSetCalls('meter', 'meter', ['value'=>15, 'min'=>0, 'max'=>100]);
        $this->runTestWithoutParameters('cite');
        $this->runTestWithSetCalls('column', 'col', ['span'=>'3', 'class'=>'width-40']);
        $this->runTestWithoutParameters('columnGroup', 'colgroup');
        $this->runTestWithoutParameters('definition', 'dfn');
        $this->runTestWithoutParameters('listItem', 'li');
        $this->runTestWithoutParameters('details');
        $this->runTestWithoutParameters('div');
    }
    
    public function test_tags3()
    {
        $this->runTestWithoutParameters('emphasis', 'em');
        $this->runTestWithoutParameters('definitionTerm', 'dt');
        $this->runTestWithoutParameters('definitionDescription', 'dd');
        $this->runTestWithoutParameters('figure');
        $this->runTestWithoutParameters('figureCaption', 'figcaption');
        $this->runTestWithoutParameters('footer');
        $this->runTestWithParameters('form', 'form', ['name'=>'testForm', 'action'=>'action.php']);
        $this->runTestWithSetCalls('form', 'form', ['name'=>'testForm', 'action'=>'action.php', 'method'=>'post']);
        $this->runTestWithoutParameters('h1');
    }
    
    public function test_tags4()
    {
        $this->runTestWithoutParameters('h2');
        $this->runTestWithoutParameters('h3');
        $this->runTestWithoutParameters('h4');
        $this->runTestWithoutParameters('h5');
        $this->runTestWithoutParameters('h6');
        $this->runTestWithoutParameters('head');
        $this->runTestWithoutParameters('header');
        $this->runTestWithoutParameters('insert', 'ins');
        $this->runTestWithoutParameters('italic', 'i');
    }
    
    public function test_tags5()
    {
        $this->runTestWithParameters('label', 'label', ['for'=>'testfor']);
        $this->runTestWithoutParameters('legend');
        $this->runTestWithoutParameters('listItem', 'li');
        $this->runTestWithoutParameters('main');
        $this->runTestWithoutParameters('mark');
        $this->runTestWithSetCalls('menu', 'menu', ['type'=>'context', 'label'=>'mymenu']);
        #$this->runTestWithSetCalls('menuitem', 'menuitem');
        $this->runTestWithoutParameters('nav');
        $this->runTestWithoutParameters('orderedList', 'ol');
    }
    
    public function test_tags6()
    {
        $this->runTestWithoutParameters('paragraph', 'p');
        $this->runTestWithoutParameters('preformatted', 'pre');
        $this->runTestWithoutParameters('quote', 'q');
        $this->runTestWithoutParameters('sample', 'samp');
        $this->runTestWithoutParameters('section');
        $this->runTestWithoutParameters('small');
        $this->runTestWithoutParameters('span');
        $this->runTestWithoutParameters('strikethrough', 's');
        $this->runTestWithoutParameters('strong');
    }
    
    public function test_tags7()
    {
        $this->runTestWithParameters('style', 'style', ['media'=>'print']);
        $this->runTestWithoutParameters('subscript', 'sub');
        $this->runTestWithoutParameters('summary');
        $this->runTestWithoutParameters('superscript', 'sup');
        $this->runTestWithoutParameters('tableBody', 'tbody');
        $this->runTestWithoutParameters('tableData', 'td');
        #$this->runTestWithoutParameters('tableData', 'td');
        #$this->runTestWithoutParameters('tableFoot', 'tfoot');
        #$this->runTestWithoutParameters('tableHead', 'thead');
    }
    
    public function test_tags8()
    {
        $this->runTestWithoutParameters('tableHeader', 'th');
        $this->runTestWithoutParameters('tableRow', 'tr');
        $this->runTestWithoutParameters('time', 'time');
        $this->runTestWithoutParameters('underline', 'u');
        $this->runTestWithoutParameters('unorderedList', 'ul');
    }
    
    public function test_fieldset()
    {
        $output = '<fieldset><legend>legend</legend>content</fieldset>';
        $code = "@build('fieldset', 'legend', 'content')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_textarea()
    {
        $this->runTestWithParameters('inputTextarea', 'textarea', ['name'=>'textarea1', 'rows'=>4, 'cols'=>80,]);

        $output = '<textarea cols="80">hiya</textarea>';
        $code = "@build('inputTextarea')->set('cols', 80)->set('value', 'hiya')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));


        $output = '<textarea cols="80">hiya2</textarea>';
        $code = "@build('inputTextarea')->set('cols', 80)->set('value', 'hiya')->set('value', 'hiya2')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = 'hiya2';
        $code = "@build('inputTextarea')->set('cols', 80)->set('value', 'hiya')->set('value', 'hiya2')->get('value')";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<textarea disabled="disabled"></textarea>';
        $code = "@build('inputTextarea')->set('disabled', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        
        $output = '<textarea>hiya</textarea>';
        $code = "@build('inputTextarea')->set('disabled', true)->set('disabled', false)->set('value', 'hiya')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_option()
    {
        /*
        $output = '<option value="1">test1</option>';
        $code = "@build('option', 1, 'test1')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
        */

        $output = '<option value="2" selected="selected">test2</option>';
        $code = "@build('option', 2, 'test2', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<option value="3">test3</option>';
        $code = "@build('option', 3, 'test3', false)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_select()
    {
        $output = '<select name="myselect"><option value="1">test1</option><option value="2" selected="selected">test2</option></select>';
        $code = "@build('inputSelect', 'myselect', 2)->add(@build('option', 1, 'test1'))->add(@build('option', 2, 'test2'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

        $output = '<select name="myselect"><option value="1">test1</option><option value="2" selected="selected">test2</option></select>';
        $code = "@build('inputSelect', 'myselect', 2)->set('data', #[@['label'=>'test1','value'=>1]@,@['label'=>'test2','value'=>2]@]#)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));

    }
    
    public function test_inputCheckbox()
    {
        $output = '<input type="checkbox" name="testCheck" checked="checked" value="on" />hiya';
        $code = "@build('inputCheckbox', 'testCheck', true, 'hiya')->set('value', 'on')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_inputRadio()
    {
        $output = '<input type="radio" name="testRadio" value="1" checked="checked" />hiya';
        $code = "@build('inputRadio', 'testRadio', 1, true, 'hiya')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_inputText()
    {
        $output = '<input type="text" name="testText" value="hiya" required="required" />';
        $code = "@build('inputText', 'testText', 'hiya', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_inputFile()
    {
        $output = '<input type="file" name="testFile" />';
        $code = "@build('inputFile', 'testFile')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_inputPassword()
    {
        $output = '<input type="password" name="testText" value="password1" required="required" />';
        $code = "@build('inputPassword', 'testText', 'password1', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_inputEmail()
    {
        $output = '<input type="email" name="testEmail" value="hiya@hiya.com" required="required" />';
        $code = "@build('inputEmail', 'testEmail', 'hiya@hiya.com', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_inputTelephone()
    {
        $output = '<input type="tel" name="testPhone" value="1111111" required="required" />';
        $code = "@build('inputTelephone', 'testPhone', '1111111', true)->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function test_button()
    {
        $output = '<button type="button" onclick="this.form.submit();">mybutton</button>';
        $code = "@build('button', 'mybutton', 'this.form.submit();')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }


    public function test_br()
    {
        $output = '<br />';
        $code = "@build('br')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    public function test_hr()
    {
        $output = '<hr />';
        $code = "@build('hr')->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }


    public function test_table()
    {

        $output = '<table><thead><tr></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>';
        $code = "@build('table')->add(@build('tableHead'))->add(@build('tableBody'))->add(@build('tableFoot'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));


        $output = '<thead><tr><th>col1</th><th>col2</th></tr></thead>';
        $code = "@build('tableHead')->add(@build('tableHeader', 'col1'))->add(@build('tableHeader', 'col2'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }

    /*

    # note: this implicitly tests definitionTerm and definitionDescription
    public function test_definitionList()
    {
        $output = '<dl><dt>term</dt><dd>description</dd></dl>';

        $code = "@build('definitionList', @build('definitionTerm', 'term'), @build('definitionDescription', 'description'))->render()";
        $this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    */
}