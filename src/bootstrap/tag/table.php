<?php
namespace Lucid\Html\Bootstrap\Tag;

class Table extends \DevLucid\Base\Tags\Table
{
    use \Lucid\Html\Bootstrap\Trait\Sizeable;
    public $bootstrapSizePrefix = 'table';
    public $bootstrapSizesAllowed = ['sm'];

    public function init()
    {
        $this->addClass('table');
        $this->responsive = true;
        $this->hover = true;
        parent::init();
    }

    public function setInverse($val)
    {
        \DevLucid\html::errorBoolean($this, 'inverse', $val);
        return $this->toggleClass('table-inverse', $val);
    }

    public function getInverse()
    {
        return $this->hasClass('table-inverse');
    }

    public function setStriped($val)
    {
        \DevLucid\html::errorBoolean($this, 'striped', $val);
        return $this->toggleClass('table-striped', $val);
    }

    public function getStriped()
    {
        return $this->hasClass('table-striped');
    }

    public function setBordered($val)
    {
        \DevLucid\html::errorBoolean($this, 'bordered', $val);
        return $this->toggleClass('table-bordered', $val);
    }

    public function getBordered()
    {
        return $this->hasClass('table-bordered');
    }

    public function setHover($val)
    {
        \DevLucid\html::errorBoolean($this, 'hover', $val);
        return $this->toggleClass('table-hover', $val);
    }

    public function getHover()
    {
        return $this->hasClass('table-hover');
    }

    public function setResponsive($val)
    {
        if($val === true) {
            $this->preHtml  .= '<div class="table-responsive">';
            $this->postHtml .= '</div>';
        }

        return $this;
    }

    public function getTesponsive()
    {
        return (strpos($this->preHtml, '<div class="table-responsive">') !== false);
    }
}
