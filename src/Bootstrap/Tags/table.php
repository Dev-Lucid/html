<?php
namespace Lucid\Html\Bootstrap\Tags;

class table extends \Lucid\Html\Base\Tags\table
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Inverseable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'table';
	public $responsive = false;
	public $bootstrapInversePrefix = 'table';
	public $bootstrapSizePrefix = 'table';
	public $bootstrapSizesAllowed = ['sm', null];
	public $bootstrapModifierPrefix = 'table';
	public $bootstrapModifiersAllowed = ['success', 'warning', 'danger', 'info', 'active'];

	public function init()
	{
		$this->addClass('table');
		parent::init();
	}
    

    public function setBordered($val)
    {
        if ($val === true) {
            $this->addClass('table-bordered');
        } elseif ($val === false) {
            $this->removeClass('table-bordered');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'bordered', $val, ['true', 'false']);
        }
        return $this;
    }
    
    public function setHover($val)
    {
        if ($val === true) {
            $this->addClass('table-hover');
        } elseif ($val === false) {
            $this->removeClass('table-hover');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'hover', $val, ['true', 'false']);
        }
        return $this;
    }
    
    public function setStriped($val)
    {
        if ($val === true) {
            $this->addClass('table-striped');
        } elseif ($val === false) {
            $this->removeClass('table-striped');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'striped', $val, ['true', 'false']);
        }
        return $this;
    }

    public function setReflow($val)
    {
        if ($val === true) {
            $this->addClass('table-reflow');
        } elseif ($val === false) {
            $this->removeClass('table-reflow');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'reflow', $val, ['true', 'false']);
        }
        return $this;
    }
    
    public function setResponsive($val)
    {
        if ($val === true || $val === false) {
            $this->responsive  = $val;
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'responsive', $val, ['true', 'false']);
        }
        return $this;
    }
    
    public function preRender() : string
    {
        if ($this->responsive === true) {
            $this->preHtml .= '<div class="table-responsive">';
            $this->postHtml = $this->postHtml . '</div>';
        }
        return parent::preRender();
    }
}
