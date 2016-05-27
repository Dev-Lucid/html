<?php
namespace Lucid\Html\Bootstrap\Tags;

class Th extends \Lucid\Html\Base\Tags\Th
{
    use \Lucid\Html\Bootstrap\Traits\Modifiable;

    public $bootstrapModifiersAllowed = ['active', 'success', 'info', 'warning', 'danger', ];
    public $bootstrapModifierPrefix = 'table';
}
