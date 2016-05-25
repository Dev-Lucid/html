<?php
    public function getTitle() : \Lucid\Html\TagInterface
    {
        if (is_null($this->title) === true) {
            $this->title = $this->build('strong');
        }
        return $this->title;
    }
    
    public function setTitle($newValue) : \Lucid\Html\TagInterface
    {
        $title = $this->get('title');
        $title->children = [];
        $title->add($newValue);
        return $this;
    }
    
    public function preChildren() : string
    {
        if (is_null($this->title) === false) {
            $this->preChildrenHtml .= $this->title->render().' ';
        }
        return parent::preChildren();
    }
?>