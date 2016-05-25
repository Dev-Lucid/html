<?php
namespace Lucid\Html\Bootstrap\Tags;
use Lucid\Html\html;

class DataTable extends \Lucid\Html\Bootstrap\Tags\Table
{
    public $id           = null;
    public $data         = null;
    public $refreshUrl  = null;
    public $sortColumn     = null;
    public $sortDirection     = 'asc';
    public $currentPage = 0;
    public $maxPage     = 0;
    public $rowsPerPage= 10;
    public $result       = null;

    public $filters      = [];

    public $topleft     = null;
    public $topright    = null;
    public $bottomleft  = null;
    public $bottomright = null;
    public $renderer    = null;

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

    public $useCookie     = true;
    public $cookieTimeout = 3600;
    public $msgDataNoFoundTitle = 'No data found.';
    public $msgDataNotFoundBody = '';

    public function init()
    {
        parent::init();
        $this->bordered(false);
        $this->responsive(false);
        $this->tag = 'table';
        $this->parameters = ['title', 'id', 'data', 'refreshUrl', 'sortColumn', 'sortDirection', 'rowsPerPage', 'currentPage',];

        $this->topleft     = html::span()->pull('left')->style('width:1%;');
        $this->topright    = html::span()->pull('right')->style('width:1%;');
        $this->bottomleft  = html::span()->pull('left');
        $this->bottomright = html::span()->pull('right');
    }

    public function setTitle($val)
    {
        $this->components['title'] = $val;
        return $this;
    }

    public function getTitle($val)
    {
        return $this->components['title'];
    }

    protected function findPositionForComponent($name)
    {
        $return_position = null;
        foreach ($this->positions as $current_position=>$components) {
            if (in_array($name, $components)) {
                $return_position = $current_position;
            }
        }
        if (is_null($return_position) === true) {
            throw new \Exception('Could not find a position for component '.$name.' in data_table. ');
        }
        return $return_position;
    }

    protected function addComponentsToPositions()
    {
        foreach($this->components as $component_name=>$component) {
            if (is_null($component) === false) {
                $position = $this->findPositionForComponent($component_name);

                if (is_object($component) === false) {
                    $component = html::span($component);
                }

                if (strpos($position,'right') !== false) {
                    $component->pull('right');
                }
                if (strpos($position,'left') !== false) {
                    $component->pull('left');
                }
                $this->$position->add($component);
            }
        }
    }

    public function sendRefresh()
    {
        if (isset($_REQUEST['refresh-data']) === true && $_REQUEST['refresh-data'] == $this->id) {
            $this->retrieveData();
            ob_clean();
            header('Content-Type: application/json');
            exit(json_encode([
                'tbody' => $this->renderTbody(),
                'maxPage' => $this->maxPage,
                'pager' => $this->buildPager()->render()
            ]));
        }
    }

    public function determineQueryProperties()
    {
        $this->readSettingsFromCookie();

        if (isset($_REQUEST['sort-col']) === true) {
            $this->sortColumn = intval($_REQUEST['sort-col']);
        }

        if (isset($_REQUEST['sort-dir']) === true) {
            $this->sortDirection = $_REQUEST['sort-dir'];
        }

        if (isset($_REQUEST['current-page']) === true) {
            $this->currentPage = intval($_REQUEST['current-page']);
        }

        if (isset($_REQUEST['rows-per-page']) === true) {
            $this->rowsPerPage = intval($_REQUEST['rows-per-page']);
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
        $this->writeSettingsToCookie();
    }

    public function readSettingsFromCookie()
    {
        if($this->useCookie === true)
        {
            $this->sortColumn    = (isset($_COOKIE[$this->id.'-sort-col']) )?$_COOKIE[$this->id.'-sort-col']         :$this->sortColumn;
            $this->sortDirection = (isset($_COOKIE[$this->id.'-sort-dir']) )?$_COOKIE[$this->id.'-sort-dir']         :$this->sortDirection;
            $this->currentPage   = (isset($_COOKIE[$this->id.'-current-page']) )?$_COOKIE[$this->id.'-current-page'] :$this->currentPage;
            $this->rowsPerPage   = (isset($_COOKIE[$this->id.'-rows-per-page']))?$_COOKIE[$this->id.'-rows-per-page']:$this->rowsPerPage;
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

    public function writeSettingsToCookie()
    {
        if ($this->useCookie === true) {
            $new_cookies = [];

            $cookies[$this->id.'-sort-col'] = $this->sortColumn;
            $cookies[$this->id.'-sort-dir'] = $this->sortDirection;
            $cookies[$this->id.'-current-page'] = $this->currentPage;
            $cookies[$this->id.'-rows-per-page'] = $this->rowsPerPage;

            foreach ($this->filters as $filterName=>$filterSettings) {
                $value = $filterSettings['value'];
                $value = (is_array($value) === true)?implode(' ',$value):$value;
                $cookies[$this->id.'-filter-'.$filterName] = $value;
            }

            $expires = time() + $this->cookieTimeout;
            foreach ($cookies as $name=>$value) {
                setcookie ($name, $value, $expires);
            }
        }
    }

    public function checkValidChild($child)
    {
        #html::errorChildTag($this, $child->tag, ['tr'], null);
    }

    protected function retrieveData()
    {
        for ($i=0; $i<count($this->children); $i++) {
            $this->children[$i]->index = $i;
            if (is_null($this->sortColumn) === true && $this->children[$i]->sortable === true) {
                $this->sortColumn = $i;
                $this->sortDirection = 'asc';
            } elseif($this->sortColumn == $i && $this->children[$i]->sortable === false) {
                throw new \Exception('Cannot sort table on column '.$i.', it is not set to be sortable.');
            }
        }
        $this->determineQueryProperties();

        $func = html::$config['hooks']['data_table__query'];
        $sortColumn_name = (is_null($this->sortColumn) === true)?null:$this->children[$this->sortColumn]->data_name;
        list($this->maxPage, $this->result) = $func($this->data, $sortColumn_name, $this->sortDirection, $this->currentPage, $this->rowsPerPage, $this->filters);
    }

    public function render()
    {
        $this->retrieveData();
        $this->components['pager'] = $this->buildPager();
        $this->addComponentsToPositions();

        $html = '<div class="card data-table" id="'.$this->id.'"';
        $html .= ' data-refresh-url="'.$this->refreshUrl.'"';
        $html .= ' data-sort-col="'.$this->sortColumn.'"';
        $html .= ' data-sort-dir="'.$this->sortDirection.'"';
        $html .= ' data-max-page="'.$this->maxPage.'"';
        $html .= ' data-current-page="'.$this->currentPage.'"';
        $html .= ' data-rows-per-page="'.$this->rowsPerPage.'"';
        $html .= ' data-filters="'.implode(',',array_keys($this->filters)).'"';
        $html .= '>';

        $html .= $this->renderHeader();

        $html .= $this->preRender();
        $html .= $this->preHtml;
        $html .= $this->renderTagStart();
        $html .= $this->renderColgroup();
        $html .= $this->renderThead();
        $html .= '<tbody>';
        $html .= $this->renderTbody();
        $html .= '</tbody>';

        $html .= $this->renderTagEnd();
        $html .= $this->postHtml;
        $html .= $this->postRender();

        $html .= $this->renderFooter();

        $html .= '</div>';
        return $html;
    }

    public function renderHeader()
    {
        $header = html::cardHeader();
        $header->add($this->topleft);
        $header->add($this->topright);
        return $header->render();
    }

    public function renderFooter()
    {
        $footer = html::cardFooter();
        $footer->add($this->bottomleft);
        $footer->add($this->bottomright);
        return $footer->render();
    }

    public function renderColgroup()
    {
        $html = '<colgroup>';
        foreach($this->children as $child)
        {
            $html .= $child->renderColumn();
        }
        $html .= '</colgroup>';
        return $html;
    }

    public function renderThead()
    {
        $html = '<thead><tr>';
        foreach($this->children as $child)
        {
            $html .= $child->renderHeader();
        }
        $html .= '</tr></thead>';
        return $html;
    }

    public function renderTbody()
    {
        $html = '';

        if ($this->maxPage == 0) {
            $html .= $this->renderNoDataMessage();
        } else {
            foreach ($this->result as $row) {
                $html .= '<tr>';
                foreach ($this->children as $child) {
                    $html .= $child->renderData($row);
                }
                $html .= '</tr>';
            }
        }
        return $html;
    }

    public function renderNoDataMessage()
    {
        $row = html::row();
        $row->add(html::td()->colspan(count($this->children)));
        $row->lastChild()->add(html::alert('warning', $this->msgDataNoFoundTitle, $this->msgDataNotFoundBody));
        return $row->render();
    }

    public function buildPager()
    {
        $pager = html::buttonGroup(); #->size('sm');

        $pager->add(html::button(html::icon('fast-backward'), 'primary', 'lucid.html.dataTable.page(this,\'first\');'));
        $pager->add(html::button(html::icon('backward'), 'primary', 'lucid.html.dataTable.page(this,\'previous\');'));

        $pager->add(html::select(null, $this->currentPage, $this->buildPagerOptions(), "lucid.html.dataTable.page(this,this.options[this.selectedIndex].value);"));
        $pager->lastChild()->modifier('primary');

        $pager->add(html::button(html::icon('forward'), 'primary', 'lucid.html.dataTable.page(this,\'next\');'));
        $pager->add(html::button(html::icon('fast-forward'), 'primary', 'lucid.html.dataTable.page(this,\'last\');'));

        return html::span()->addClass('data-table-pager')->add($pager);
    }

    public function buildPagerOptions()
    {
        $options = [];
        for ($i=0; $i<$this->maxPage; $i++) {
            $options[] = [$i,'Page '.($i + 1).' of '.$this->maxPage];
        }
        return $options;
    }

    public function determineFilterValue($filter)
    {
        $value = '';
        if (isset($_COOKIE[$this->id.'-filter-'.$filter]) === true) {
            $value = $_COOKIE[$this->id.'-filter-'.$filter];
        }
        if (isset($_REQUEST['filter-'.$filter]) === true) {
            $value = $_REQUEST['filter-'.$filter];
        }
        return $value;
    }

    public function enableSelectFilter($field, $data)
    {
        $id = $this->id.'-filter-'.$field;
        $value = $this->determineFilterValue($field);

        $this->components['filter_select'] = \Lucid\html\html::select(null, $value, $data, "lucid.html.dataTable.filter(this,false);")
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

    public function enableSearchFilter($fields, $filter_name = 'search')
    {
        $id = $this->id.'-filter-'.$filter_name;
        $value = $this->determineFilterValue($filter_name);

        $this->components['filter_search'] = html::input('text', $filter_name, $value)
            ->id($id)
            ->preAddon(\Lucid\html\html::icon('search'))
            ->size('sm')
            ->style('width:auto;')
            ->onkeyup('lucid.html.dataTable.filter(this, true);');

        $this->filters[$filter_name] = [
            'field' => $fields,
            'operator'=>'like',
            'value'=>$value
        ];

        return $this;
    }

    public function enableAddNewButton($url, $label='Add New', $modifier='primary')
    {
        $this->components['add_new'] = html::anchorButton($url, $label, 'primary');
        return $this;
    }
}

if (isset(html::$config['hooks']['data_table__query']) === false || is_null(html::$config['hooks']['data_table__query']) === true) {
    html::$config['hooks']['data_table__query'] = function($data, $column = null, $direction = null, $page = 0, $limit = 10, $filters = []) {
        # apply filters
        foreach ($filters as $key=>$filter) {
            if (is_null($filter['value']) === false && strval($filter['value'] !== '')) {
                if ($filter['operator'] == 'like') {
                    if (is_array($filter['value']) === false) {
                        $filter['value'] = [$filter['value']];
                    }
                    if (is_array($filter['field']) === false) {
                        $filter['field'] = [$filter['field']];
                    }

                    $raw = '';
                    foreach ($filter['field'] as $field) {
                        $raw .= ($raw == '')?'':' OR ';
                        $raw .= $field.' like ?';
                    }

                    foreach ($filter['value'] as $value) {
                        $raw_values = [];
                        for($i=0; $i<count($filter['field']); $i++) {
                            $raw_values[] = '%'.$value.'%';
                        }
                        $data->where_raw('('.$raw.')', $raw_values);
                    }
                } elseif ($filter['operator'] == 'equals' && strval($filter['value']) !== '') {
                    $data->where($filter['field'], $filter['value']);
                }
            }
        }

        # perform a count query without sorts/limit/offset
        $count = $data->count();

        if (is_null($column) === false) {
            if ($direction == 'asc') {
                $data->order_by_asc($column);
            } else {
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
