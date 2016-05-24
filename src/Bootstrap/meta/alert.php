<?php
    public function getTitle()
    {
        if (is_null($this->title) === true) {
            $this->title = $this->build('strong');
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
    
    public function preChildren() 
    {
        if (is_null($this->title) === false) {
            $this->preChildrenHtml .= $this->title->render().' ';
        }
        return parent::preChildren();
    }
?>