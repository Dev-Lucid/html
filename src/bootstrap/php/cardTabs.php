<?php
namespace Devlucid\Tag;

if (class_exists('DevLucid\\Tag\\BootstrapNav') === false) {
    include(__DIR__.'/nav.php');
}

class BootstrapCardTabs extends BootstrapNav
{
    public $postRenderTabs = false;
    private $footer = null;

    public function init()
    {
        parent::init();
        $this->tabs(true);
    }

    public function preRender()
    {
        $html = parent::preRender();
        $this->tabs(true);
        $this->addClass('card-header-tabs');
        $this->addClass('pull-xs-left');

        return '<div class="card text-xs-left"><div class="card-header">'.$html;
    }

    public function postRender()
    {
        $html = parent::postRender();
        $html .= '</div><div class="card-block">';
        $html .= $this->renderPanes(true);
        $html .= '</div>';

        if (is_null($this->footer) === false) {
            $html .= $this->footer->render();
        }

        $html .= '</div>';
        return $html;
    }

    public function addTab($label, $id=null)
    {
        if (is_null($id) === true) {
            $id = uniqid('tab');
        }
        $this->add(\DevLucid\html::navAnchor($id, $label));
        return $this->lastPane();
    }

    public function getfooter()
    {
        if (is_null($this->footer) === true) {
            $this->footer = \DevLucid\html::cardFooter();
        }
        return $this->footer;
    }

    public function setfooter($value)
    {
        $this->getfooter()->add($value);
        return $this;
    }
}
