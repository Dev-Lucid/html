<?php
namespace Devlucid\Bootstrap\Tags;

class CardFooter extends \Lucid\Html\Tag
{
    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card-footer');
    }
}
