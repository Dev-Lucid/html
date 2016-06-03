<?php
namespace Lucid\Html\Bootstrap\Tags;

class container extends \Lucid\Html\Tag
{
	public $tag = 'div';

	public function init()
	{
		$this->addClass('container');
		parent::init();
	}
    

    public function setFluid($val)
    {
        if ($val === true) {
            $this->removeClass('container');
            $this->addClass('container-fluid');
        } elseif ($val === false) {
            $this->addClass('container');
            $this->removeClass('container-fluid');
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'fluid', $val, ['true', 'false']);
        }
        return $this;
    }
}
