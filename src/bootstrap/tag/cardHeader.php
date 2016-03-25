<?php
namespace Devlucid\Bootstrap\Tags;

class CardHeader extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Trait\Gridable;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card-header');
    }
}
