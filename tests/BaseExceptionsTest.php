<?php
use Lucid\Html\Html as html;

class BaseExceptionsTest extends BaseTest
{    
    public function setup()
    {
    }
    
    public function testChildrenNotAllowed()
    {
        $this->setExpectedException(\Lucid\Html\Exception\ChildrenNotAllowed::class);
        $this->runAsPHP("@build('image')->add('test')->render()");
    }
    
    public function testInvalidAttribute()
    {
        $this->setExpectedException(\Lucid\Html\Exception\InvalidAttribute::class);
        $this->runAsPHP("@build('image')->set('hiya', 'NOYOU')->render()");
    }
}