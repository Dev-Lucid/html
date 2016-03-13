<?php

namespace DevLucid;

class bootstrap_form_group extends base_tag
{
    public $tag             = 'div';
    public $label           = null;
    public $help            = null;
    public $parameters      = ['label', 'child', 'help',];
    public $use_grid        = false;
    public $label_grid_size = 2;

    use trait_base_disablable;

    public function init()
    {
        parent::init();
        $this->add_class('form-group');
    }

    public function pre_render()
    {
        # determine if we're using the checkbox structure for the form group or not based on the first child in the group
        $checkbox_layout = ($this->children[0]->tag == 'input' && ($this->children[0]->type == 'checkbox' || $this->children[0]->type == 'radio'));

        # build the basic label. Will be modified by logic below depending on form layout
        $label = html::label()->add($this->label)->for($this->children[0]->name());

        # build the help text area if necessary
        $help = '';
        if(is_null($this->help) === false && $this->help != '')
        {
            $help = html::small()->add_class('text-muted')->add($this->help)->render();
            html::log('rendering help: '.$help);
        }

        if($this->use_grid === true)
        {
            $this->add_class('row');
            $label->add_class('col-sm-'.$this->label_grid_size);
            $field_grid_div = '<div class="col-sm-'.(12 - $this->label_grid_size).'">';

            if($checkbox_layout === true)
            {
                $this->pre_children_html .= $label->render();
                $this->pre_children_html .= $field_grid_div;
                $this->pre_children_html .= '<div class="'.$this->children[0]->type.'">';
                $this->pre_children_html .= '<label>';

                $this->post_children_html .= $help;
                $this->post_children_html .= '</label>';
                $this->post_children_html .= '</div>';
                $this->post_children_html .= '</div>';
            }
            else
            {
                $this->children[0]->add_class('form-control');
                $label->add_class('form-control-label');
                $this->pre_children_html .= $label->render();
                $this->pre_children_html .= $field_grid_div;

                $this->post_children_html .= $help;
                $this->post_children_html .= '</div>';
            }
        }
        else
        {
            if($checkbox_layout === true)
            {
                $this->remove_class('form-group');
                $this->add_class($this->children[0]->type);
                $this->pre_children_html .= '<label>';

                $this->post_children_html .= ' '.$this->label.'</label>';
            }
            else
            {
                $this->children[0]->add_class('form-control');
                $this->add($help);
                $this->pre_children_html .= $label->render();
            }
        }

        return '';
    }


    public function set_disabled($val)
    {
        html::error_boolean($this, 'disabled', $val);
        return $this->toggle_class('disabled', $val);
    }

    public function get_disabled()
    {
        return $this->has_class('disabled');
    }
}
