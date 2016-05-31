<?php
namespace Lucid\Html\Bootstrap\Tags;

class alert extends \Lucid\Html\Tag
{
	use \Lucid\Html\Bootstrap\Traits\Gridable;
	use \Lucid\Html\Bootstrap\Traits\Modifiable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'div';
	public $parameters = ['modifier', 'title'];
	public $title = null;
	public $bootstrapModifierPrefix = 'alert';
	public $bootstrapModifiersAllowed = ['success', 'warning','danger', 'info'];
	public $attributes = [
		'role'=>'alert',
	];

	public function init()
	{
		$this->addClass('alert');
		parent::init();
	}

    public function getTitle() : \Lucid\Html\TagInterface
    {
        if (is_null($this->title) === true) {
            $this->title = $this->build('strong');
        }
        return $this->title;
    }
    
    public function setTitle($newValue) : \Lucid\Html\TagInterface
    {
        $title = $this->get('title');
        $title->children = [];
        $title->add($newValue);
        return $this;
    }
    
    public function preChildren() : string
    {
        if (is_null($this->title) === false) {
            $this->preChildrenHtml .= $this->title->render().' ';
        }
        return parent::preChildren();
    }
}
