<?php
namespace Lucid\Html\Bootstrap\Tags;

class formGroup extends \Lucid\Html\Tag
{
	public $tag = 'fieldset';
	public $parameters = ['field', 'label', 'inputType', 'value', 'help'];

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
        
        if (isset($this->attributes['rowLayout']) === true && $this->attributes['rowLayout'] === true) {
            $this->attributes['rowLayout'] = null;
            $this->addClass('row');

            $labels = $this->queryChildren(new \Lucid\Html\Selector('label'));
            foreach ($labels as $label) {
                $label->addClass('col-sm-2');
                $label->addClass('col-form-label');
            }

            $fields = $this->queryChildren(new \Lucid\Html\Selector('.form-control'), true);
        
            foreach ($fields as $field) {
                $field->preHtml .= '<div class="col-sm-10">';
                $field->postHtml = '</div>'.$field->postHtml;
            }
        }
        
        return parent::preRender();
    }
    
    public function setRowLayout($val) : \Lucid\Html\TagInterface
    {
        if ($val === true || $val === false) {
            $this->attributes['rowLayout'] = $val;
        } else {
            throw new \Lucid\Html\Exception\InvalidAttributeValue($this->instantiatorName, 'rowLayout', $val, ['true', 'false']);
        }
        return $this;
    }
    
    public function setProperties(array $properties = []) : \Lucid\Html\TagInterface
	{
		$field = (isset($properties[0]) === true)?$properties[0]:null;
		$label = (isset($properties[1]) === true)?$properties[1]:null;
		$inputType = (isset($properties[2]) === true)?$properties[2]:null;
		$value = (isset($properties[3]) === true)?$properties[3]:null;
		$help = (isset($properties[4]) === true)?$properties[4]:null;
		
        if (is_null($field) === false) {
            $this->label = $this->add($this->build('label', $field, $label))->lastChild();
		    $this->field = $this->add($this->build($inputType, $field, $value))->lastChild();
		}
		if (is_null($help) === false) {
			$this->help = $this->add($this->build('inputHelp', $help))->lastChild();
		}
		
		return $this;
	}
    
    public function getLabel() : \Lucid\Html\TagInterface
	{
		return $this->label;
	}
	
	public function getField() : \Lucid\Html\TagInterface
	{
		return $this->field;
	}

	public function getHelp()
	{
		return $this->help;
	}
}
