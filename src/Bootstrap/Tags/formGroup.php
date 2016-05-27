<?php
namespace Lucid\Html\Bootstrap\Tags;

class formGroup extends \Lucid\Html\Tag
{
	public $tag = 'fieldset';

	public function init()
	{
		$this->addClass('form-group');
		parent::init();
	}

    public function preRender() : string
    {
        $checkboxSelector = new \Lucid\Html\Selector('input[type=checkbox]');
        $checkboxes = $this->queryChildren($checkboxSelector, true);

        $radioSelector = new \Lucid\Html\Selector('input[type=radio]');
        $radios = $this->queryChildren($radioSelector, true);

        if (count($checkboxes) > 0) {
            $this->tag = 'div';
            $this->removeClass('form-group');
            $this->addClass('checkbox');
    		$this->preChildrenHtml  .= '<label>';
    		$this->postChildrenHtml .= '</label>';
        }
        if (count($radios) > 0) {
            $this->tag = 'div';
            $this->removeClass('form-group');
            $this->addClass('radio');
    		$this->preChildrenHtml  .= '<label>';
    		$this->postChildrenHtml .= '</label>';
        }
        
        return parent::preRender();
    }
}