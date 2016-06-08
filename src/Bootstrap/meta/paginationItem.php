<?php
    public function setDisabled($val) : \Lucid\Html\TagInterface
    {
        if ($val === true) {
            $this->addClass('disabled');
        } else {
            $this->remove('disabled');
        }
        return $this;
    }
    
    public function getDisabled() : bool
    {
        return $this->hasClass('disabled');
    }
    
    public function preRender() : string
    {
        if ($this->href != '') {
            $this->preChildrenHtml .= '<a href="'.$this->href.'" class="page-link">';
            $this->postChildrenHtml = '</a>' . $this->postChildrenHtml;
        }
        return parent::preRender();
    }
?>