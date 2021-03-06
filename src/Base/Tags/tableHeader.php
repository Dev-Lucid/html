<?php
namespace Lucid\Html\Base\Tags;

class tableHeader extends \Lucid\Html\Tag
{
	public $tag = 'th';

	public function init()
	{
		$this->allowedAttributes[] = 'rowspan';
		$this->allowedAttributes[] = 'colspan';
		parent::init();
	}

	public function checkValidChild($child) : bool
	{
		if (in_array($child->tag, ['th', 'td', 'tr']) === true) {
			throw new \Exception('Invalid child. Tag th does not allow these tags as children: th, td, tr');
		}
		return true;
	}

    public function renderColspan()
    {
        $val = intval($this->attributes['colspan']);
        if ($val == 1) {
            return null;
        }
        return $val;
    }
}
