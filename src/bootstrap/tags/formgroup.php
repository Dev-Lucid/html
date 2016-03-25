<?php
namespace Lucid\Html\Bootstrap\Tags;
use Lucid\Html\html;

class FormGroup extends \Lucid\Html\Tag
{
    use \Lucid\Html\Base\Traits\Disableable;

    public $tag             = 'div';
    public $label           = null;
    public $help            = null;
    public $parameters      = ['label', 'child', 'help',];
    public $use_grid        = false;
    public $labelGridSize = 2;


    public function init()
    {
        parent::init();
        $this->addClass('form-group');
    }

    public function preRender()
    {
        # determine if we're using the checkbox structure for the form group or not based on the first child in the group
        $checkboxLayout = ($this->children[0]->tag == 'input' && ($this->children[0]->type == 'checkbox' || $this->children[0]->type == 'radio'));

        # build the basic label. Will be modified by logic below depending on form layout
        $label = html::label()->add($this->label)->for($this->children[0]->name());

        # build the help text area if necessary
        $help = '';

        if (is_null($this->help) === false && $this->help != '') {
            $help = html::small()->addClass('text-muted')->add($this->help)->render();
        }

        if ($this->use_grid === true) {
            $this->addClass('row');
            $label->addClass('col-sm-'.$this->labelGridSize);
            $field_grid_div = '<div class="col-sm-'.(12 - $this->labelGridSize).'">';

            if ($checkboxLayout === true) {
                $this->preChildrenHtml .= $label->render();
                $this->preChildrenHtml .= $field_grid_div;
                $this->preChildrenHtml .= '<div class="'.$this->children[0]->type.'">';
                $this->preChildrenHtml .= '<label>';

                $this->postChildrenHtml .= $help;
                $this->postChildrenHtml .= '</label>';
                $this->postChildrenHtml .= '</div>';
                $this->postChildrenHtml .= '</div>';
            } else {
                $this->children[0]->addClass('form-control');
                $label->addClass('form-control-label');
                $this->preChildrenHtml .= $label->render();
                $this->preChildrenHtml .= $field_grid_div;

                $this->postChildrenHtml .= $help;
                $this->postChildrenHtml .= '</div>';
            }
        } else {
            if ($checkboxLayout === true) {
                $this->removeClass('form-group');
                $this->addClass($this->children[0]->type);
                $this->preChildrenHtml .= '<label>';

                $this->postChildrenHtml .= ' '.$this->label.'</label>';
            } else {
                $this->children[0]->addClass('form-control');
                $this->add($help);
                $this->preChildrenHtml .= $label->render();
            }
        }

        return '';
    }


    public function setDisabled($val)
    {
        html::errorBoolean($this, 'disabled', $val);
        return $this->toggleClass('disabled', $val);
    }

    public function get_disabled()
    {
        return $this->hasClass('disabled');
    }
}
