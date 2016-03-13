<?php

namespace DevLucid;


if(class_exists('\DevLucid\bootstrap_table') === false)
{
    include(__DIR__.'/table.php');
}

class bootstrap_data_table extends bootstrap_table
{
    public $id           = null;
    public $data         = null;
    public $refresh_url  = null;
    public $sort_col     = null;
    public $sort_dir     = 'asc';
    public $current_page = 0;
    public $max_page     = 0;
    public $rows_per_page= 10;
    public $result       = null;

    public $filters      = [];

    public $topleft     = null;
    public $topright    = null;
    public $bottomleft  = null;
    public $bottomright = null;

    public $components = [
        'pager'=>null,
        'title'=>null,
        'add_new'=>null,
        'filter_search'=>null,
        'filter_select'=>null,
    ];

    public $positions   = [
        'topleft'=>['title',],
        'topright'=>['filter_search'],
        'bottomleft'=>['add_new','filter_select'],
        'bottomright'=>['pager',],
    ];

    public $use_cookie     = true;
    public $cookie_timeout = 3600;
    public $msg_data_not_found_title = 'No data found.';
    public $msg_data_not_found_body = '';

    public function init()
    {
        parent::init();
        $this->bordered(false);
        $this->responsive(false);
        $this->tag = 'table';
        $this->parameters = ['title', 'id', 'data', 'refresh_url', 'sort_col', 'sort_dir', 'rows_per_page', 'current_page',];

        $this->topleft     = html::span()->pull('left')->style('width:1%;');
        $this->topright    = html::span()->pull('right')->style('width:1%;');
        $this->bottomleft  = html::span()->pull('left');
        $this->bottomright = html::span()->pull('right');
    }

    public function set_title($val)
    {
        $this->components['title'] = $val;
        return $this;
    }

    public function get_title($val)
    {
        return $this->components['title'];
    }

    protected function find_position_for_component($name)
    {
        $return_position = null;
        foreach($this->positions as $current_position=>$components)
        {
            if(in_array($name, $components))
            {
                $return_position = $current_position;
            }
        }
        if(is_null($return_position) === true)
        {
            throw new \Exception('Could not find a position for component '.$name.' in data_table. ');
        }
        return $return_position;
    }

    protected function add_components_to_positions()
    {
        foreach($this->components as $component_name=>$component)
        {
            if(is_null($component) === false)
            {
                $position = $this->find_position_for_component($component_name);

                if(is_object($component) === false)
                {
                    $component = html::span($component);
                }

                if(strpos($position,'right') !== false)
                {
                    $component->pull('right');
                }
                if(strpos($position,'left') !== false)
                {
                    $component->pull('left');
                }
                $this->$position->add($component);
            }
        }
    }

    public function send_refresh()
    {
        if(isset($_REQUEST['refresh-data']) === true && $_REQUEST['refresh-data'] == $this->id)
        {
            $this->retrieve_data();
            ob_clean();
            header('Content-Type: application/json');
            exit(json_encode([
                'tbody' => $this->render_tbody(),
                'max_page' => $this->max_page,
                'pager' => $this->build_pager()->render()
            ]));
        }
    }

    public function determine_query_properties()
    {
        $this->read_settings_from_cookie();
        if(isset($_REQUEST['sort-col']))
        {
            $this->sort_col = intval($_REQUEST['sort-col']);
        }

        if(isset($_REQUEST['sort-dir']))
        {
            $this->sort_dir = $_REQUEST['sort-dir'];
        }

        if(isset($_REQUEST['current-page']))
        {
            $this->current_page = intval($_REQUEST['current-page']);
        }

        if(isset($_REQUEST['rows-per-page']))
        {
            $this->rows_per_page = intval($_REQUEST['rows-per-page']);
        }

        /*
        foreach($this->filters as $filter_name=>$filter_settings)
        {
            if (isset($_REQUEST['filter-'.$filter_name]))
            {
                $val  = trim($_REQUEST['filter-'.$filter_name]);
                if($val != '')
                {
                    if($this->filters[$filter_name]['operator'] == 'like')
                    {
                        $val = explode(' ', $val);
                    }
                    $this->filters[$filter_name]['value'] = $val;
                }
                else
                {
                    $this->filters[$filter_name]['value'] = null;
                }
            }
        }
        */
        $this->write_settings_to_cookie();
    }

    public function read_settings_from_cookie()
    {
        if($this->use_cookie === true)
        {
            $this->sort_col      = (isset($_COOKIE[$this->id.'-sort-col'])     )?$_COOKIE[$this->id.'-sort-col']:$this->sort_col;
            $this->sort_dir      = (isset($_COOKIE[$this->id.'-sort-dir'])     )?$_COOKIE[$this->id.'-sort-dir']:$this->sort_dir;
            $this->current_page  = (isset($_COOKIE[$this->id.'-current-page']) )?$_COOKIE[$this->id.'-current-page']:$this->current_page;
            $this->rows_per_page = (isset($_COOKIE[$this->id.'-rows-per-page']))?$_COOKIE[$this->id.'-rows-per-page']:$this->rows_per_page;
            /*
            foreach($this->filters as $filter_name=>$filter_settings)
            {
                $val = (isset($_COOKIE[$this->id.'-filter-'.$filter_name]))?$_COOKIE[$this->id.'-filter-'.$filter_name]:$this->filters[$filter_name]['value'];
                if($val != '')
                {
                    if($this->filters[$filter_name]['operator'] == 'like')
                    {
                        $val = explode(' ', $val);
                    }
                }
                else
                {
                    $val = null;
                }
                $this->filters[$filter_name]['value'] = $val;
            }
            */
        }
    }

    public function write_settings_to_cookie()
    {
        if($this->use_cookie === true)
        {
            $new_cookies = [];

            $cookies[$this->id.'-sort-col'] = $this->sort_col;
            $cookies[$this->id.'-sort-dir'] = $this->sort_dir;
            $cookies[$this->id.'-current-page'] = $this->current_page;
            $cookies[$this->id.'-rows-per-page'] = $this->rows_per_page;

            foreach($this->filters as $filter_name=>$filter_settings)
            {
                $value = $filter_settings['value'];
                $value = (is_array($value) === true)?implode(' ',$value):$value;
                $cookies[$this->id.'-filter-'.$filter_name] = $value;
            }

            $expires = time() + $this->cookie_timeout;
            foreach($cookies as $name=>$value)
            {
                setcookie ($name, $value, $expires);
            }
        }
    }

    public function check_valid_child($child)
    {
        #html::error_child_tag($this, $child->tag, ['tr'], null);
    }

    protected function retrieve_data()
    {
        for($i=0; $i<count($this->children); $i++)
        {
            $this->children[$i]->index = $i;
            if(is_null($this->sort_col) === true && $this->children[$i]->sortable === true)
            {
                $this->sort_col = $i;
                $this->sort_dir = 'asc';
            }
            else if($this->sort_col == $i && $this->children[$i]->sortable === false)
            {
                throw new \Exception('Cannot sort table on column '.$i.', it is not set to be sortable.');
            }
        }
        $this->determine_query_properties();

        $func = html::$hooks['data_table__query'];
        $sort_col_name = (is_null($this->sort_col) === true)?null:$this->children[$this->sort_col]->data_name;
        list($this->max_page, $this->result) = $func($this->data, $sort_col_name, $this->sort_dir, $this->current_page, $this->rows_per_page, $this->filters);
    }

    public function render()
    {
        $this->retrieve_data();
        $this->components['pager'] = $this->build_pager();
        $this->add_components_to_positions();

        $html = '<div class="card data-table" id="'.$this->id.'"';
        $html .= ' data-refresh-url="'.$this->refresh_url.'"';
        $html .= ' data-sort-col="'.$this->sort_col.'"';
        $html .= ' data-sort-dir="'.$this->sort_dir.'"';
        $html .= ' data-max-page="'.$this->max_page.'"';
        $html .= ' data-current-page="'.$this->current_page.'"';
        $html .= ' data-rows-per-page="'.$this->rows_per_page.'"';
        $html .= ' data-filters="'.implode(',',array_keys($this->filters)).'"';
        $html .= '>';

        $html .= $this->render_header();

        $html .= $this->pre_render();
        $html .= $this->pre_html;
        $html .= $this->render_tag_start();
        $html .= $this->render_colgroup();
        $html .= $this->render_thead();
        $html .= '<tbody>';
        $html .= $this->render_tbody();
        $html .= '</tbody>';

        $html .= $this->render_tag_end();
        $html .= $this->post_html;
        $html .= $this->post_render();

        $html .= $this->render_footer();

        $html .= '</div>';
        return $html;
    }

    public function render_header()
    {
        $header = html::card_header();
        $header->add($this->topleft);
        $header->add($this->topright);
        return $header->render();
    }

    public function render_footer()
    {
        $footer = html::card_footer();
        $footer->add($this->bottomleft);
        $footer->add($this->bottomright);
        return $footer->render();
    }

    public function render_colgroup()
    {
        $html = '<colgroup>';
        foreach($this->children as $child)
        {
            $html .= $child->render_column();
        }
        $html .= '</colgroup>';
        return $html;
    }

    public function render_thead()
    {
        $html = '<thead><tr>';
        foreach($this->children as $child)
        {
            $html .= $child->render_header();
        }
        $html .= '</tr></thead>';
        return $html;
    }

    public function render_tbody()
    {
        $html = '';

        if($this->max_page == 0)
        {
            $html .= $this->render_no_data_message();
        }
        else
        {
            foreach($this->result as $row)
            {
                $html .= '<tr>';
                foreach($this->children as $child)
                {
                    $html .= $child->render_data($row);
                }
                $html .= '</tr>';
            }
        }
        return $html;
    }

    public function render_no_data_message()
    {
        $row = html::row();
        $row->add(html::td()->colspan(count($this->children)));
        $row->last_child()->add(html::alert('warning', $this->msg_data_not_found_title, $this->msg_data_not_found_body));
        return $row->render();
    }

    public function build_pager()
    {
        $pager = html::button_group(); #->size('sm');

        $pager->add(html::button(html::icon('fast-backward'), 'primary', 'html.dataTable.page(this,\'first\');'));
        $pager->add(html::button(html::icon('backward'), 'primary', 'html.dataTable.page(this,\'previous\');'));

        $pager->add(html::select(null, $this->current_page, $this->build_pager_options(), "html.dataTable.page(this,this.options[this.selectedIndex].value);"));
        $pager->last_child()->modifier('primary');

        $pager->add(html::button(html::icon('forward'), 'primary', 'html.dataTable.page(this,\'next\');'));
        $pager->add(html::button(html::icon('fast-forward'), 'primary', 'html.dataTable.page(this,\'last\');'));

        return $pager;
    }

    public function build_pager_options()
    {
        $options = [];
        for($i=0; $i<$this->max_page; $i++)
        {
            $options[] = [$i,'Page '.($i + 1).' of '.$this->max_page];
        }
        return $options;
    }

    public function determine_filter_value($filter)
    {
        $value = '';
        if(isset($_COOKIE[$this->id.'-filter-'.$filter]))
        {
            $value = $_COOKIE[$this->id.'-filter-'.$filter];
        }
        if(isset($_REQUEST['filter-'.$filter]))
        {
            $value = $_REQUEST['filter-'.$filter];
        }
        return $value;
    }

    public function enable_select_filter($field, $data)
    {
        $id = $this->id.'-filter-'.$field;
        $value = $this->determine_filter_value($field);

        $this->components['filter_select'] = html::select(null, $value, $data, "html.dataTable.filter(this,false);")
            ->id($id)
            ->size('sm')
            ->style('width:auto;');

        $this->filters[$field] = [
            'field'=>$field,
            'operator'=>'equals',
            'value'=>$value,
        ];

        return $this;
    }

    public function enable_search_filter($fields, $filter_name = 'search')
    {
        $id = $this->id.'-filter-'.$filter_name;
        $value = $this->determine_filter_value($filter_name);

        $this->components['filter_search'] = html::input('text', $filter_name, $value)
            ->id($id)
            ->pre_addon(html::icon('search'))
            ->size('sm')
            ->style('width:auto;')
            ->onkeyup('html.dataTable.filter(this, true);');

        $this->filters[$filter_name] = [
            'field' => $fields,
            'operator'=>'like',
            'value'=>$value
        ];

        return $this;
    }

    public function enable_add_new_button($url, $label='Add New', $modifier='primary')
    {
        $this->components['add_new'] = html::anchor_button($url, $label, 'primary');
        return $this;
    }
}

if(isset(html::$hooks['data_table__query']) === false || is_null(html::$hooks['data_table__query']) === true)
{
    html::$hooks['data_table__query'] = function($data, $column = null, $direction = null, $page = 0, $limit = 10, $filters = [])
    {
        # apply filters
        foreach($filters as $key=>$filter)
        {
            if(is_null($filter['value']) === false && strval($filter['value'] !== ''))
            {
                if($filter['operator'] == 'like')
                {
                    if(is_array($filter['value']) == false)
                    {
                        $filter['value'] = [$filter['value']];
                    }
                    if(is_array($filter['field']) == false)
                    {
                        $filter['field'] = [$filter['field']];
                    }

                    $raw = '';
                    foreach($filter['field'] as $field)
                    {
                        $raw .= ($raw == '')?'':' OR ';
                        $raw .= $field.' like ?';
                    }

                    foreach($filter['value'] as $value)
                    {
                        $raw_values = [];
                        for($i=0; $i<count($filter['field']); $i++)
                        {
                            $raw_values[] = '%'.$value.'%';
                        }
                        $data->where_raw('('.$raw.')', $raw_values);
                    }
                }
                else if ($filter['operator'] == 'equals' && strval($filter['value']) !== '')
                {
                    $data->where($filter['field'], $filter['value']);
                }
            }
        }

        # perform a count query without sorts/limit/offset
        $count = $data->count();

        if (is_null($column) === false)
        {
            if($direction == 'asc')
            {
                $data->order_by_asc($column);
            }
            else
            {
                $data->order_by_desc($column);
            }
        }

        $data->offset($page * $limit);
        $data->limit($limit);

        # perform the final query
        $result = $data->find_many();
        return [ceil($count / $limit), $result];
    };
}
