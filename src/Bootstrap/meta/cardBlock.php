<?php
    public function getTitle()
    {
        if (is_null($this->title) === true) {
            $this->title = $this->build('cardTitle');
        }
        return $this->title;
    }

    public function setTitle($newValue)
    {
        $title = $this->get('title');
        $title->children = [];
        $title->add($newValue);
        return $this;
    }
    
    public function getSubtitle()
    {
        if (is_null($this->subtitle) === true) {
            $this->subtitle = $this->build('cardSubtitle');
        }
        return $this->subtitle;
    }
    
    public function setSubtitle($newValue)
    {
        $subtitle = $this->get('subtitle');
        $subtitle->children = [];
        $subtitle->add($newValue);
        return $this;
    }
    
    public function preChildren() 
    {
        if (is_null($this->title) === false) {
            $this->preChildrenHtml .= $this->title->render();
        }
        if (is_null($this->subtitle) === false) {
            $this->preChildrenHtml .= $this->subtitle->render();
        }
        return parent::preChildren();
    }
?>