<?php
namespace Lucid\Html\Bootstrap\Tags;

class paginationItem extends \Lucid\Html\Base\Tags\listItem
{
	use \Lucid\Html\Bootstrap\Traits\Activable;

	public $tag = 'li';
	public $parameters = ['href'];
	public $href = '';

	public function init()
	{
		$this->addClass('page-item');
		parent::init();
	}

    public function setDisabled($val) : \Lucid\Html\TagInterface
    {
        if ($val === true) {
            $this->addClass('disabled');
        } else {
            $this->remove('disabled');
        }
        return $this;
    }
    
    public function getDisabled() : bool
    {
        return $this->hasClass('disabled');
    }
    
    public function preRender() : string
    {
        if ($this->href != '') {
            $this->preChildrenHtml .= '<a href="'.$this->href.'" class="page-link">';
            $this->postChildrenHtml = '</a>' . $this->postChildrenHtml;
        }
        return parent::preRender();
    }
}
