<?php
namespace Lucid\Html\Bootstrap\Tags;

class card extends \Lucid\Html\Tag
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Inverseable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'div';
	public $parameters = ['header', 'block', 'footer'];
	public $header = null;
	public $block = null;
	public $footer = null;
	public $bootstrapInversePrefix = 'card';
	public $bootstrapModifierPrefix = 'card';
	public $bootstrapModifiersAllowed = ['primary', 'success', 'warning','danger', 'info'];

	public function init()
	{
		$this->addClass('card');
		parent::init();
	}

    public function getHeader() : \Lucid\Html\TagInterface
    {
        if (is_null($this->header) === true) {
            $this->header = $this->build('cardHeader');
        }
        return $this->header;
    }

    public function setHeader($newValue) : \Lucid\Html\TagInterface
    {
        $header = $this->get('header');
        $header->children = [];
        $header->add($newValue);
        return $this;
    }
    
    public function getBlock() : \Lucid\Html\TagInterface
    {
        if (is_null($this->block) === true) {
            $this->block = $this->build('cardBlock');
            $this->add($this->block);
        }
        return $this->block;
    }

    public function setBlock($newValue) : \Lucid\Html\TagInterface
    {
        $block = $this->get('block');
        $block->children = [];
        $block->add($newValue);
        return $this;
    }
    
    public function getFooter() : \Lucid\Html\TagInterface
    {
        if (is_null($this->footer) === true) {
            $this->footer = $this->build('cardFooter');
        }
        return $this->footer;
    }
    
    public function setFooter($newValue) : \Lucid\Html\TagInterface
    {
        $footer = $this->get('footer');
        $footer->children = [];
        $footer->add($newValue);
        return $this;
    }
    
    public function getTitle() : \Lucid\Html\TagInterface
    {
        return $this->get('block')->get('title');
    }
    
    public function setTitle($newValue) : \Lucid\Html\TagInterface
    {
        $block = $this->get('block');
        $block->set('title', $newValue);
        return $this;
    }
    
    public function getSubtitle() : \Lucid\Html\TagInterface
    {
        return $this->get('block')->get('subtitle');
    }
    
    public function setSubtitle($newValue) : \Lucid\Html\TagInterface
    {
        $block = $this->get('block');
        $block->set('subtitle', $newValue);
        return $this;
    }
    
    public function preChildren() : string
    {
        if (is_null($this->header) === false) {
            $this->preChildrenHtml .= $this->header->render();
        }
        if (is_null($this->footer) === false) {
            $this->postChildrenHtml .= $this->footer->render();
        }
        
        $i = 0;
        foreach ($this->children as $child) {
            if (is_object($child) === true) {
                if ($child->tag == 'ul') {
                    foreach ($child->children as $listItem) {
                        $listItem->addClass('list-group-item');
                    }
                }
                if ($child->tag == 'img') {
                    if ($i == 0 && is_null($this->header) === true) {
                        $child->addClass('card-img-top');
                    } elseif ($i == (count($this->children) - 1) && is_null($this->footer) === true) {
                        $child->addClass('card-img-bottom');
                    }
                }
            }
            $i++;
        }
        return parent::preChildren();
    }
    
    public function add($child) : \Lucid\Html\TagInterface
    {
        if (is_object($child) === true) {
            if (
                $child->hasClass('card-header') === true || 
                $child->hasClass('card-block') === true || 
                $child->hasClass('card-footer')  === true || 
                $child->tag == 'ul' || 
                $child->tag == 'img'
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
}
