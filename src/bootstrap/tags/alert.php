<?php
namespace Lucid\Html\Bootstrap\Tags;
use \Lucid\html\html;

class Alert extends \Lucid\Html\Tag
{
    use \Lucid\Html\Bootstrap\Traits\Pullable, \Lucid\Html\Bootstrap\Traits\Modifiable;

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
            $this->preChildrenHtml = html::strong($this->title);
        }
        return parent::preRender();
    }
}
