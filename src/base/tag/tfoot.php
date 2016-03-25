<?php
namespace Lucid\Html\Base\Tag;

class Tfoot extends \Lucid\Html\Tag
{
    public $tag = 'tfoot';
    public $preChildrenHtml = '<tr>';
    public $postChildrenHtml = '</tr>';
    public $parameters = ['child'];
}
