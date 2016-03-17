<?php
namespace Devlucid\Tag;

class BootstrapTabPane extends BaseTag
{
    use BootstrapActivableTrait;

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
