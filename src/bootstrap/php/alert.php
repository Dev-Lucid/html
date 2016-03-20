<?php
namespace DevLucid\Tag;


class BootstrapAlert extends BaseTag
{
    use BootstrapPullableTrait, BootstrapModifiableTrait;

    public $bootstrapModifierPrefix  = 'alert';
    public $bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', ];

    public $parameters = ['modifier','title', 'msg',];

    public $autoclose = false;
    public $title = '';

    public function init()
    {
        parent::init();
        $this->tag = 'div';
        $this->addClass('alert');
    }

    public function preRender()
    {
        if ($this->title != '') {
            $this->preChildrenHtml = \DevLucid\html::strong($this->title);
        }
        return parent::preRender();
    }
}
