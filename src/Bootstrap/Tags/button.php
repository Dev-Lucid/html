<?php
namespace Lucid\Html\Bootstrap\Tags;

class button extends \Lucid\Html\Base\Tags\button
{
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'button';
	public $parameters = ['modifier', 'onclick'];
	public $title = null;
	public $bootstrapModifierPrefix = 'btn';
	public $bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'warning','danger', 'info', 'link'];
	public $bootstrapSizePrefix = 'btn';
	public $bootstrapSizesAllowed = ['sm', 'lg'];
	public $attributes = [
		'type'=>'button',
	];

	public function init()
	{
		$this->addClass('btn');
		parent::init();
	}


    public function preRender() : string
    {
        $classes = [];

        $grid = $this->get('grid');
        if (count($grid) > 0) {
            $this->set('grid', []);
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($grid[$i]) === true && is_null($grid[$i]) === false) {
                    $classes[] = 'col-'.$this->gridColumnNames[$i].'-'.$grid[$i];
                }
            }
        }
        
        $offset = $this->get('offset');
        if (count($offset) > 0) {
            $this->set('offset', []);
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($offset[$i]) === true && is_null($offset[$i]) === false) {
                    $classes[] = 'offset-'.$this->gridColumnNames[$i].'-'.$offset[$i];
                }
            }
        }
        
        $push = $this->get('gridPush');
        if (count($push) > 0) {
            $this->set('gridPush', []);
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($push[$i]) === true && is_null($push[$i]) === false) {
                    $classes[] = 'push-'.$this->gridColumnNames[$i].'-'.$push[$i];
                }
            }
        }
        
        $pull = $this->get('gridPull');
        if (count($pull) > 0) {
            $this->set('gridPull', []);
            for($i=0; $i<count($this->gridColumnNames); $i++) {
                if (isset($pull[$i]) === true && is_null($pull[$i]) === false) {
                    $classes[] = 'pull-'.$this->gridColumnNames[$i].'-'.$pull[$i];
                }
            }
        }
        
        if (count($classes) > 0) {
            $this->preHtml .= '<div class="'.implode(' ', $classes).'">';
            $this->postHtml = '</div>'.$this->postHtml;
        }
        
        return parent::preRender();
    }
}
