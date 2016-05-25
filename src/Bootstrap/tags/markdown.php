<?php
namespace Lucid\Html\Bootstrap\Tags;

class Markdown extends \Lucid\Html\Bootstrap\Tags\Textarea
{
    public function init()
    {
        parent::init();
        $this->attributes['data-iconlibrary'] = 'fa';
        $this->attributes['data-provide'] = 'markdown-editable';
        $this->attributes['rows'] = 10;
        $this->id = 'markdown-'.uniqid();
    }

    public function postRender(){
        \Lucid\Html\html::$hooks['javascript']("window.jQuery('#".$this->id."').markdown();");
        return parent::postRender();
    }
}
