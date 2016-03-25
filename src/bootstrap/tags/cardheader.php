<?php
namespace Lucid\Html\Bootstrap\Tags;

class CardHeader extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Traits\Gridable;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card-header');
    }
}
