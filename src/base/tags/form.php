<?php
namespace Lucid\Html\Base\Tags;
use Lucid\Html\html;

class form extends \Lucid\Html\Tag
{
    public $parameters = ['name','action',];

    public function init()
    {
        $this->allowedAttributes[] = 'onsubmit';
        $this->allowedAttributes[] = 'enctype';
        $this->allowedAttributes[] = 'method';
        $this->allowedAttributes[] = 'target';
    }

    function checkValidChild($child)
    {
        if ($child->tag == 'form') {
            throw new \Exception(html::errorChildTag($child->tag, null, ['form',]));
        }
    }
}
