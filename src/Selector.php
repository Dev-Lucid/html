<?php
namespace Lucid\Html;

class Selector implements SelectorInterface
{
    protected $class = null;
    protected $tag   = null;
    protected $attributeName  = null;
    protected $attributeValue = null;
    
    public function __construct(string $pattern = '')
    {
        if ($pattern != '') {
            $pattern = explode('.', $pattern);
            if (count($pattern) > 1) {
                $this->class = array_pop($pattern);
            }
            $pattern = $pattern[0];
            
            $pattern = explode('[', $pattern);
            if (count($pattern) > 1) {
                $attribute = array_pop($pattern);
                $attribute = explode('=', str_replace(']', '', $attribute));
                $this->attributeName  = $attribute[0];
                $this->attributeValue = $attribute[1];    
            } 
            $pattern = $pattern[0];
            
            if (trim($pattern) != '') {
                $this->tag = $pattern;
            }
        }
    }
    
    public function matchTag(string $tag) : SelectorInterface
    {
        $this->tag = $tag;
        return $this;
    }
    
    public function matchClass(string $class) : SelectorInterface
    {
        $this->class = $class;
        return $this;
    }
    
    public function matchAttribute(string $name, string $value) : SelectorInterface
    {
        $this->attributeName  = $name;
        $this->attributeValue = $value;
        return $this;
    }
    
    public function test(TagInterface $tag) : bool
    {
        $matches = true;
        if (is_null($this->tag) === false) {
            if ($this->tag != $tag->getTag()) {
                $matches = false;
            }
        }
        if (is_null($this->class) === false) {
            if ($tag->hasClass($this->class) === false) {
                $matches = false;
            }
        }
        if (is_null($this->attributeName) === false) {
            if ($this->attributeValue != $tag->get($this->attributeName)) {
                $matches = false;
            }
        }
        return $matches;
    }
}
