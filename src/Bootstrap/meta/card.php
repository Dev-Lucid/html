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
    
    public function getBlock()
    {
        if (is_null($this->block) === true) {
            $this->block = $this->build('cardBlock');
            $this->add($this->block);
        }
        return $this->block;
    }

    public function setBlock($newValue)
    {
        $block = $this->get('block');
        $block->children = [];
        $block->add($newValue);
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
    
    public function getTitle()
    {
        return $this->get('block')->get('title');
    }
    
    public function setTitle($newValue)
    {
        $block = $this->get('block');
        $block->set('title', $newValue);
        return $this;
    }
    
    public function getSubtitle()
    {
        return $this->get('block')->get('subtitle');
    }
    
    public function setSubtitle($newValue)
    {
        $block = $this->get('block');
        $block->set('subtitle', $newValue);
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
        
        foreach ($this->children as $child) {
            if (is_object($child) === true && $child->tag == 'ul') {
                foreach ($child->children as $listItem) {
                    $listItem->addClass('list-group-item');
                }
            }
        }
        return parent::preChildren();
    }
    
    public function add($child)
    {
        if (is_object($child) === true) {
            if (
                $child->hasClass('card-header') === true || 
                $child->hasClass('card-block') === true || 
                $child->hasClass('card-footer')  === true || 
                $child->tag == 'ul'
            ) {
                if ($child->tag == 'ul') {
                    $child->addClass('list-group')->addClass('list-group-flush');
                }
                return parent::add($child);
            } else {
                $block = $this->get('block');
                $block->add($child);
                return $this;
            }
            
        } else {
            $block = $this->get('block');
            $block->add($child);
            return $this;
        }
    }
?>