<?php
namespace Lucid\Html\Base\Tags;

class tableData extends \Lucid\Html\Tag
{
	public $tag = 'td';

	public function init()
	{
		$this->allowedAttributes[] = 'rowspan';
		$this->allowedAttributes[] = 'colspan';
		parent::init();
	}

	public function checkValidChild($child)
	{
		if (in_array($child->tag, ['th', 'td', 'tr']) === true) {
			throw new \Exception('Invalid child. Tag td does not allow these tags as children: th, td, tr');
		}
	}

    public function render_colspan()
    {
        $val = intval($this->attributes['colspan']);
        if ($val == 1) {
            return null;
        }
        return $val;
    }
}
