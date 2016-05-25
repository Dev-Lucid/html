<?php
namespace Lucid\Html\Base\Tags;

class inputFile extends \Lucid\Html\Base\Tags\input
{
	public $tag = 'input';
	public $parameters = ['name'];
	public $attributes = [
		'type'=>'file',
	];
}
