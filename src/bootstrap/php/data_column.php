<?php

namespace DevLucid;


if(class_exists('\DevLucid\bootstrap_table') === false)
{
    include(__DIR__.'/table.php');
}

class bootstrap_data_column extends base_tag
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

    public function render_column()
    {
        return '<col width="'.$this->width.'" />';
    }

    public function render_header()
    {
        $html = '<th';

        $html .= ' data-sortable="'.(($this->sortable === true)?'true':'false').'"';
        if($this->sortable === true)
        {
            $html .= ' onclick="factory.dataTable.sort(this);"';
        }

        $html .= '>';
        $html .= $this->render_sort_indicator();
        $html .= $this->label;
        $html .= '</th>';
        return $html;
    }

    public function render_data($row)
    {
        $html = '<td';
        $html .= '>';

        if(is_callable($this->renderer))
        {
            $func = $this->renderer;
            $html .= $func($row);
        }
        else
        {
            $data_name = $this->data_name;
            $html .= $row[$data_name];
        }
        $html .= '</td>';
        return $html;
    }

    public function render_sort_indicator()
    {
        if($this->sortable === true)
        {
            $class = 'fa-chevron-right';

            if($this->parent->sort_col == $this->index)
            {
                $class = 'fa-chevron-' . (($this->parent->sort_dir == 'asc')?'up':'down');
            }
            return '<i class="fa '.$class.'"></i> ';
        }
        return '';
    }
}
