<?php
namespace Lucid\Html\Bootstrap\Tags;

class Input extends \Lucid\Html\Base\Tags\Input
{
    use \Lucid\Html\Bootstrap\Traits\Sizeable, \Lucid\Html\Bootstrap\Traits\Pullable;

    public $preAddon  = null;
    public $postAddon = null;

    public $bootstrapSizePrefix  = 'form-control';
    public $bootstrapSizesAllowed = ['sm', 'lg', ];

    public function preRender()
    {
        switch ($this->type) {
            case 'radio':
            case 'checkbox':
                break;
            case 'file':
                $this->addClass('form-control-file');
                break;
            default:
                $this->addClass('form-control');
                break;
        }

        if (is_null($this->preAddon) === false || is_null($this->postAddon) === false) {
            $class = 'input-group';
            foreach ($this->bootstrapSizesAllowed as $size) {
                if($this->hasClass($this->bootstrapSizePrefix.'-'.$size) === true) {
                    $this->removeClass($this->bootstrapSizePrefix.'-'.$size);
                    $class .= ' input-group-'.$size;
                }
            }
            if ($this->hasClass('pull-right')) {
                $this->removeClass('pull-right');
                $class .= ' pull-right';
            }
            if ($this->hasClass('pull-left')) {
                $this->removeClass('pull-left');
                $class .= ' pull-left';
            }

            $this->preHtml  .= '<div class="'.$class.'">';
            $this->postHtml .= '</div>';

            if (is_null($this->preAddon) === false) {
                $this->preHtml .= '<span class="input-group-addon">'.$this->preAddon.'</span>';
            }
            if (is_null($this->postAddon) === false) {
                $this->postHtml = '<span class="input-group-addon">'.$this->postAddon.'</span>'.$this->postHtml;
            }
        }
        return parent::preRender();
    }

    public function setType($type)
    {
        parent::settype($type);

        if ($type == 'date') {
            $this->attributes['type'] = 'text';
            #$this->postAddon = html::icon('calendar');
            $this->attributes['onfocus'] = "window.jQuery(this).datetimepicker({mask:'9999-12-39 23:59', format:'Y-m-d H:i'});window.jQuery(this).datetimepicker('toggle');";
        }
        return $this;
    }
}
