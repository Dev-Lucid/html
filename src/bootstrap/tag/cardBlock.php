<?php
namespace Devlucid\Bootstrap\Tags;

class CardBlock extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Gridable;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card-block');
    }
}
