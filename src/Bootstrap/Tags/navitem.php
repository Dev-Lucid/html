<?php
namespace Lucid\Html\Bootstrap\Tags;

class navItem extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Traits\Gridable;

    public $tag = 'li';

    public function init()
    {
        parent::init();
        $this->addClass('nav-item');
    }
}
