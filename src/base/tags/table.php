<?php
namespace Lucid\Html\Base\Tags;
use Lucid\Html\html;

class Table extends \Lucid\Html\Tag
{
    private $thead = null;
    private $tfoot = null;

    public $preChildrenHtml  = '<tbody>';
    public $postChildrenHtml = '</tbody>';

    function init()
    {
        $this->allowedAttributes[] = 'cellspacing';
        $this->allowedAttributes[] = 'cellpadding';
        $this->allowedAttributes[] = 'border';
        $this->allowedAttributes[] = 'width';
    }

    function checkValidChild($child)
    {
        html::errorChildTag($this, $child->tag, ['tr'], null);
    }

    function preChildren()
    {
        if (is_null($this->thead) === false) {
            if (count($this->thead->children) > 0) {
                return $this->thead->render();
            }
        }
        return '';
    }

    function postChildren()
    {
        if (is_null($this->tfoot) === false) {
            if (count($this->tfoot->children) > 0) {
                return $this->tfoot->render();
            }
        }
        return '';
    }

    public function get_head()
    {
        if (is_null($this->thead) === true) {
            $this->thead = html::thead();
        }
        return $this->thead;
    }

    private function getColspan()
    {
        if (count($this->children) === 0) {
            return 1;
        } else {
            return count($this->children[0]->children);
        }
    }

    public function setHead($text)
    {
        $head = $this->head();
        $head->children = [];
        $head->add(html::th()->colspan($this->getColspan())->add($text));
        return $this;
    }

    public function getFoot()
    {
        if(is_null($this->tfoot))
        {
            $this->tfoot = html::tfoot();
        }
        return $this->tfoot;
    }

    public function setFoot($text)
    {
        $foot = $this->foot();
        $foot->children = [];
        $foot->add(html::td()->colspan($this->getColspan())->add($text));
        return $this;
    }

    public function row()
    {
        $this->add(html::tr());
        return $this->lastChild();
    }
}
