<?php
namespace Devlucid\Tag;

class BootstrapNav extends BaseTag
{
    public $tag = 'ul';
    public $active_target = null;
    public $parameters = ['active_target',];
    public $panes = [];
    public $postRenderTabs = true;

    public function init()
    {
        parent::init();
        $this->addClass('nav');
        $this->addClass('nav-pills');
    }

    public function preRender()
    {
        $is_tabs = $this->getTabs();
        $active_index = false;
        for ($i=0; $i<count($this->children); $i++) {
            if ($this->children[$i]->href == $this->active_target) {
                $this->children[$i]->active(true);
            }
            if ($is_tabs === true) {
                $this->children[$i]->attributes['data-toggle'] = 'tab';
                $this->children[$i]->attributes['role'] = 'tab';
                if ($this->children[$i]->active() === true) {
                    $active_index = $i;
                    $this->panes[$i]->active(true);
                }
            }
            $this->children[$i]->preHtml = '<li class="nav-item">'.$this->children[$i]->preHtml;
            $this->children[$i]->postHtml = $this->children[$i]->postHtml.'</li>';
        }

        if ($is_tabs === true && $active_index === false) {
            $this->children[0]->active(true);
            $this->panes[0]->active(true);
            $this->active_target = $this->children[0]->href;
        }

        return parent::preRender();
    }

    public function setPills($val)
    {
        if ($val === true) {
            $this->removeClass('nav-inline');
            $this->removeClass('nav-tabs');
            $this->addClass('nav-pills');
        } else {
            $this->removeClass('nav-pills');
        }
        return $this;
    }

    public function getPills()
    {
        return $this->hasClass('nav-pills');
    }

    public function setStacked($val)
    {
        if ($val === true) {
            $this->setPills(true);
            $this->addClass('nav-stacked');
        } else {
            $this->removeClass('nav-stacked');
        }
        return $this;
    }

    public function getStacked()
    {
        return $this->hasClass('nav-stacked');
    }


    public function setTabs($val)
    {
        if($val === true){
            $this->removeClass('nav-inline');
            $this->removeClass('nav-pills');
            $this->addClass('nav-tabs');
            $this->attributes['role'] = 'tablist';

            $link_count = count($this->children);
            $pane_count = count($this->panes);

            while (count($this->panes) < $link_count) {
                $this->addPane();
            }
        } else {
            $this->removeClass('nav-tabs');
            $this->attributes['role'] = null;
        }
        return $this;
    }

    public function getTabs()
    {
        return $this->hasClass('nav-tabs');
    }

    public function addPane()
    {
        $pane = \DevLucid\html::tabPane($this->lastChild()->href);
        $pane->parent = $this;
        $this->panes[] = $pane;
        return $this;
    }

    public function add($child)
    {
        parent::add($child);
        if( $this->tabs() === true) {
            $this->addPane();
        }
        return $this;
    }

    public function firstPane()
    {
        if (count($this->panes) === 0) {
            return null;
        }
        return $this->panes[0];
    }

    public function lastPane()
    {
        if (count($this->panes) === 0) {
            return null;
        }
        return $this->panes[count($this->panes) - 1];
    }

    public function renderPanes($force = false)
    {
        $html = '';
        $isForced = ($this->postRenderTabs === true || $force === true);
        if ($isForced === true && count($this->panes) > 0 && $this->getTabs() === true) {
            $html .= '<div class="tab-content">';
            foreach ($this->panes as $pane) {
                $html .= $pane->render();
            }
            $html .= '</div>';
        }
        return $html;
    }

    public function postRender()
    {
        $html = parent::postRender();
        $html .= $this->renderPanes();
        $html .= parent::postRender();
        return $html;
    }
}
