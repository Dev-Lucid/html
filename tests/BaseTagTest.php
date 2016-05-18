<?php
use Lucid\Html\Html as html;

class BaseTagTest extends BaseTest
{
    public function test_abbreviation()
    {
        $code = "\Lucid\Html\Html::build('abbreviation', 'test', 'titleAttr')->render()";
        $this->assertEquals('<abbr title="titleAttr">test</abbr>', $this->runAsJs($code));
        $this->assertEquals('<abbr title="titleAttr">test</abbr>', $this->runAsPHP($code));
    }

    public function test_address()
    {
        $code = "\Lucid\Html\Html::build('address', 'hi')->render()";
        $this->assertEquals('<address>hi</address>', $this->runAsJs($code));
        $this->assertEquals('<address>hi</address>', $this->runAsPHP($code));
    }

    public function test_listItem()
    {
        $code = "\Lucid\Html\Html::build('listItem')->render()";
        $this->assertEquals('<li></li>', $this->runAsJs($code));
        $this->assertEquals('<li></li>', $this->runAsPHP($code));
    }
}