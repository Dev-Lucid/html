<?php
namespace Lucid\Html\Base\Tags;

class image extends \Lucid\Html\Tag
{
	public $tag = 'img';
	public $parameters = ['src', 'width', 'height', 'alt'];
	public $allowQuickClose = true;
	public $allowChildren = false;
}
