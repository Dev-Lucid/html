<?php
namespace Devlucid\Tag;

class BootstrapCard extends BaseTag
{
    use BootstrapGridableTrait;

    public $tag = 'div';

    public function init()
    {
        parent::init();
        $this->addClass('card');
    }

    public function getHeader()
    {
        if (count($this->children) == 0) {
            $this->add(\DevLucid\html::cardHeader());
            return $this->lastChild();
        } elseif ($this->children[0]->hasClass('card-header') === false) {
            $this->prepend(\DevLucid\html::cardHeader());
            return $this->firstChild();
        }
        return $this->children[0];
    }

    public function setHeader($value)
    {
        $header = $this->getHeader();
        $header->add($value);
        return $this;
    }

    public function getFooter()
    {
        if (count($this->children) == 0) {
            $this->add(\DevLucid\html::cardFooter());
            return $this->lastChild();
        } elseif($this->lastChild()->hasClass('card-footer') === false) {
            $this->add(\DevLucid\html::cardFooter());
            return $this->lastChild();
        }
        return $this->lastChild();
    }

    public function setFooter($value)
    {
        $footer = $this->getFooter();
        $footer->add($value);
        return $this;
    }

    public function getBlock()
    {
        foreach ($this->children as $child) {
            if ($child->hasClass('card-block')) {
                return $child;
            }
        }

        $this->add(\DevLucid\html::cardBlock());
        return $this->lastChild();
    }

    public function setBlock($value)
    {
        $block = $this->getBlock();
        $block->add($value);
        return $this;
    }

    public function preRender()
    {
        for ($i=0; $i<count($this->children); $i++) {
            $child = $this->children[$i];
            if ($child->tag == 'img') {
                if ($i === 0) {
                    $child->addClass('card-img-top');
                } elseif (($i + 1) === count($this->children)) {
                    $child->addClass('card-img-bottom');
                }
            } elseif (in_array($child->tag,['h3','h4']) === true) {
                $this->addClass('block');
                $child->addClass('card-title');
            } elseif ($child->tag == 'p') {
                $this->addClass('block');
                $child->addClass('card-text');
            } elseif ($child->tag == 'ul') {
                $child->addClass('list-group');
                $child->addClass('list-group-flush');
            } elseif ($child->tag == 'blockquote') {
                $child->addClass('card-blockquote');
            } elseif($child->tag == 'a' && $child->hasClass('btn') === false) {
                $child->addClass('card-link');
            }
        }
        return parent::preRender();
    }
}
