<?php
    public function getHeader()
    {
        if (is_null($this->header) === true) {
            $this->header = $this->build('cardHeader');
        }
        return $this->header;
    }

    public function setHeader($newValue)
    {
        $header = $this->get('header');
        $header->children = [];
        $header->add($newValue);
        return $this;
    }
    
    public function getFooter()
    {
        if (is_null($this->footer) === true) {
            $this->footer = $this->build('cardFooter');
        }
        return $this->footer;
    }
    
    public function setFooter($newValue)
    {
        $footer = $this->get('footer');
        $footer->children = [];
        $footer->add($newValue);
        return $this;
    }
    
    public function preChildren() 
    {
        if (is_null($this->header) === false) {
            $this->preChildrenHtml .= $this->header->render();
        }
        if (is_null($this->footer) === false) {
            $this->postChildrenHtml .= $this->footer->render();
        }
        return parent::preChildren();
    }
?>