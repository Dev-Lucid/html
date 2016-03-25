<?php
namespace Lucid\Html\Base\Tags;

class Tfoot extends \Lucid\Html\Tag
{
    public $tag = 'tfoot';
    public $preChildrenHtml = '<tr>';
    public $postChildrenHtml = '</tr>';
    public $parameters = ['child'];
}
