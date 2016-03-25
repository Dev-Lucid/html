<?php
namespace Lucid\Html\Bootstrap\Tag;

class Th extends \DevLucid\Base\Tags\Th
{
    use \Lucid\Html\Bootstrap\Trait\Modifiable;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}
