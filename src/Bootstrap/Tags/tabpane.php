<?php
namespace Lucid\Html\Bootstrap\Tags;

class TabPane extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Traits\Activable;

    public $tag = 'div';
    public $parameters = ['id',];

    public function init()
    {
        parent::init();
        $this->addClass('tab-pane');
        $this->addClass('fade');
        $this->attributes['role'] = 'tabpanel';
    }

    public function preRender()
    {
        $this->toggleClass('in', ($this->active() === true));
    }
}
