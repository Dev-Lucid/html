<?php

class base_001_Test extends PHPUnit_Framework_TestCase
{
    public function test_tag_creation()
    {
        $li = html::li();
        $this->assertEquals('<li></li>', $li->render());
    }
}