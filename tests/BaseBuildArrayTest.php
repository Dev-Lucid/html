<?php
use Lucid\Html\Html as html;

class BaseBuildArrayTest extends BaseTest
{
    
    public function setup()
    {
    }

    public function testSimpleBuild()
    {
        $output = '<span id="testSimpleBuildSpan" class="woohoo">testBuildSpan</span>';
        $code = "@buildFromArray(#['type'=>'span','class'=>'woohoo','id'=>'testSimpleBuildSpan','children'=>@['testBuildSpan']@]#)->render()";
        #$this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function testRecurseBuild()
    {
        $output = '<span class="woohoo"><div>innerDiv1</div><div>innerDiv2</div><div>innerDiv3</div></span>';
        $code = "@buildFromArray(@['type'=>'span','class'=>'woohoo','children'=>#[@['type'=>'div', 'children'=>#['innerDiv1']#]@,@['type'=>'div', 'children'=>#['innerDiv2']#]@,@['type'=>'div', 'children'=>#['innerDiv3']#]@]#]@)->render()";
        #$this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function testDefaults()
    {
        $output = '<span class="woohoo">testBuildSpan</span>';
        $code = "@buildFromArray(#['type'=>'span','children'=>@['testBuildSpan']@]#,#['class'=>'woohoo']#)->render()";
        #$this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
    
    public function testRecurseDefaults()
    {
        $output = '<span class="woohoo"><div class="woohoo">innerDiv1</div></span>';
        $code = "@buildFromArray(#['type'=>'span','children'=>@[@['type'=>'div', 'children'=>#['innerDiv1']#]@]@]#,#['class'=>'woohoo']#)->render()";
        #$this->assertEquals($output, $this->runAsJs($code));
        $this->assertEquals($output, $this->runAsPHP($code));
    }
}