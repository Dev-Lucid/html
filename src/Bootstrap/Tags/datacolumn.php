<?php
namespace Lucid\Html\Bootstrap\Tags;

class DataColumn extends \Lucid\Html\Tag
{
    public $label     = null;
    public $data_name = null;
    public $width     = null;
    public $sortable  = false;
    public $renderer  = null;
    public $index     = null;

    public function init()
    {
        parent::init();
        $this->tag = 'td';
        $this->parameters = ['label', 'data_name', 'width', 'sortable', 'renderer',];
    }

    public function renderColumn()
    {
        return '<col width="'.$this->width.'" />';
    }

    public function renderHeader()
    {
        $html = '<th';

        $html .= ' data-sortable="'.(($this->sortable === true)?'true':'false').'"';
        if ($this->sortable === true) {
            $html .= ' onclick="lucid.html.dataTable.sort(this);"';
        }

        $html .= '>';
        $html .= $this->renderSortIndicator();
        $html .= $this->label;
        $html .= '</th>';
        return $html;
    }

    public function renderData($row)
    {
        $html = '<td';
        $html .= '>';

        if (is_callable($this->renderer) === true) {
            $func = $this->renderer;
            $html .= $func($row);
        } elseif (is_callable($this->parent->renderer) === true) {
            $func = $this->parent->renderer;
            $html .= $func($row, $this->data_name);
        } else {
            $data_name = $this->data_name;
            $html .= $row[$data_name];
        }
        $html .= '</td>';
        return $html;
    }

    public function renderSortIndicator()
    {
        if ($this->sortable === true) {
            $class = 'fa-chevron-right';

            if ($this->parent->sort_col == $this->index) {
                $class = 'fa-chevron-' . (($this->parent->sort_dir == 'asc')?'up':'down');
            }
            return '<i class="fa '.$class.'"></i> ';
        }
        return '';
    }
}
