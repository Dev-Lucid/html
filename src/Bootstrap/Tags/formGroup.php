<?php
namespace Lucid\Html\Bootstrap\Tags;

class formGroup extends \Lucid\Html\Tag
{
	public $tag = 'fieldset';
	public $parameters = ['field', 'label', 'inputType', 'value', 'help'];
	public $gridSizeMinimum = 'sm';
	public $gridSizeLabel = 2;
	public $gridSizeField = 10;

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
        
        $useRowLayout = (isset($this->attributes['rowLayout']) === true && $this->attributes['rowLayout'] === true);
        $this->attributes['rowLayout'] = null;
        
        if (count($checkboxes) > 0 || count($radios) > 0) {
            $this->tag = 'div';
            
            if ($useRowLayout === true) {

        		$this->preChildrenHtml  .= '<label class="form-check-label">';
        		$this->postChildrenHtml = '</label>'.$this->postChildrenHtml;

        		$this->preChildrenHtml  = '<label class="col-'.$this->gridSizeMinimum.'-'.$this->gridSizeLabel.'"></label><div class="col-'.$this->gridSizeMinimum.'-'.$this->gridSizeField.'"><div class="form-check">'.$this->preChildrenHtml;
        		$this->postChildrenHtml .= '</div></div>';
                
                for ($i=0; $i < count($checkboxes); $i++) {
                    $checkboxes[$i]->addClass('form-check-input');
                }
                
                for ($j=0; $j < count($radios); $j++) {
                    $radios[$j]->addClass('form-check-input');
                }
            } else {
        		$this->preChildrenHtml  .= '<label>';
        		$this->postChildrenHtml = '</label>'.$this->postChildrenHtml;
                $this->removeClass('form-group');
                $this->addClass(((count($checkboxes) > 0)?'checkbox':'radio'));
            }
        }
        
        if  ($useRowLayout === true) {
            
            $this->addClass('row');

            $labels = $this->queryChildren(new \Lucid\Html\Selector('label'), true);
            foreach ($labels as $label) {
                $label->addClass('col-'.$this->gridSizeMinimum.'-'.$this->gridSizeLabel);
                $label->addClass('col-form-label');
            }

            $fields = $this->queryChildren(new \Lucid\Html\Selector('.form-control'), true);
        
            foreach ($fields as $field) {
                $field->preHtml .= '<div class="col-'.$this->gridSizeMinimum.'-'.$this->gridSizeField.'">';
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
            if ($inputType == 'inputCheckbox') {
    		    $this->field = $this->add($this->build($inputType, $field, $value, $label))->lastChild();
            } else if ($inputType == 'inputRadio') {
    		    $this->field = $this->add($this->build($inputType, $field, $value, $label))->lastChild();
            } else {
                $this->label = $this->add($this->build('label', $field, $label))->lastChild();
    		    $this->field = $this->add($this->build($inputType, $field, $value))->lastChild();
            }
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
    
    public function setGridSizeMinimum($val)
    {
        $this->gridSizeMinimum = $val;
        return $this;
    }
    
    public function setGridSizeField($val)
    {
        $this->gridSizeField = $val;
        return $this;
    }
    
    public function setGridSizeLabel($val)
    {
        $this->gridSizeLabel = $val;
        return $this;
    }
}
