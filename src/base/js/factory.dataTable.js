factory.dataTable = {
    'colSelector':'table > thead > tr > th',
    'refreshSelector':'table > tbody',
    'pagerSelector':'span.data-table-pager',
    'colsSelector':'table > thead',
    'sortIconSelector':'i',
    'searchDelay':300,
    'refreshTimeouts':{}
};

factory.dataTable.getTableProperties=function(obj){
    obj = jQuery(obj);
    while(obj.hasClass('data-table') === false){
        obj = obj.parent();
    }

    var props = {
        'jquery'       :obj,
        'id'           :obj.attr('id'),
        'sort-col'     :parseInt(obj.attr('data-sort-col')),
        'sort-dir'     :(obj.attr('data-sort-dir') == 'desc')?'desc':'asc',
        'current-page' :parseInt(obj.attr('data-current-page')),
        'max-page'     :parseInt(obj.attr('data-max-page')),
        'rows-per-page':parseInt(obj.attr('data-rows-per-page')),
        'refresh-url'  :obj.attr('data-refresh-url'),
        'filters'      :{},

        'setProperty':function(prop, value){
            this[prop] = value;
            this.jquery.attr('data-'+prop, value);
            return this;
        }
    };

    var filterList = String(obj.attr('data-filters')).split(',');
    for(var i=0; i<filterList.length; i++){
        props.filters[filterList[i]] = window.jQuery('#'+props.id+'-filter-'+filterList[i]).val();
    }
    return props;
};

factory.dataTable.getRefreshParameters=function(props){
    var data = {
        'sort-col'     : props['sort-col'],
        'sort-dir'     : props['sort-dir'],
        'current-page' : props['current-page'],
        'rows-per-page': props['rows-per-page'],
        'refresh-data' : props.id
    };
    for(var key in props.filters){
        data['filter-'+key] = props.filters[key];
    }
    return data;
};

factory.dataTable.sort=function(col){
    var props = factory.dataTable.getTableProperties(col);
    var cols  = props.jquery.find(factory.dataTable.colSelector);
    var thisCol = null;
    for(var i=0; i<cols.length; i++){
        if(cols[i] == col){
            thisCol = i;
        }
    }
    if(thisCol == props['sort-col']){
        props.setProperty('sort-dir', (props['sort-dir'] == 'asc')?'desc':'asc');
    }else{
        props.setProperty('sort-col', thisCol);
        props.setProperty('sort-dir', 'asc');
    }
    props.setProperty('current-page', 0);
    factory.dataTable.updateSortIndictors(props);
    factory.dataTable.requestData(props);
};

factory.dataTable.page=function(pager, direction){
    var props = factory.dataTable.getTableProperties(pager);
    var newPage = props['current-page'];
    switch(direction){
        case 'first':
            newPage = 0;
            break;
        case 'previous':
            newPage--;
            break;
        case 'next':
            newPage++;
            break;
        case 'last':
            newPage = (props['max-page'] - 1);
            break;
        default:
            newPage = parseInt(direction);
            break;
    }

    if(newPage < 0){
        newPage = 0;
    }
    if(newPage >= props['max-page']){
        newPage = (props['max-page'] - 1);
    }

    if(newPage != props['current-page']){
        props.setProperty('current-page', newPage);
        factory.dataTable.requestData(props);
    }
};

factory.dataTable.filter = function(filter, delay){
    var props = factory.dataTable.getTableProperties(filter);
    props.setProperty('current-page',0);
    if(delay === false){
        factory.dataTable.requestData(props);
    }else{
        window.clearTimeout(factory.dataTable.refreshTimeouts[props.id]);
        factory.dataTable.refreshTimeouts[props.id] = window.setTimeout(function(){
            factory.dataTable.requestData(props);
        }, factory.dataTable.searchDelay);
    }
};

factory.dataTable.noDataMessage=function(props, show){
    if(show === true){
        props.jquery.find(factory.dataTable.colsSelector).hide();
        props.jquery.find(factory.dataTable.pagerSelector).hide();
    }else{
        props.jquery.find(factory.dataTable.colsSelector).show();
        props.jquery.find(factory.dataTable.pagerSelector).show();
    }
};

factory.dataTable.requestData=function(props){
    window.jQuery.ajax(props['refresh-url'], {
        'method':'POST',
        'data':factory.dataTable.getRefreshParameters(props),
        'complete':function(response, statusCode){
            console.log('loading new data');
            props.jquery.find(factory.dataTable.refreshSelector).html(response.responseJSON.tbody);
            props.setProperty('max-page', response.responseJSON.max_page);
            factory.dataTable.updatePager(props, response.responseJSON.pager);
            factory.dataTable.noDataMessage(props, (response.responseJSON.max_page === 0));
        }
    });
};

factory.dataTable.updateSortIndictors=function(props){
    var cols = props.jquery.find(factory.dataTable.colSelector);
    console.log(cols);
    var i = 0;
    cols.each(function(){
        var col = $(this);
        if(col.attr('data-sortable') == 'true'){
            var sortIcon = col.find(factory.dataTable.sortIconSelector);
            sortIcon.removeClass('fa-chevron-up fa-chevron-down fa-chevron-right');
            if(i == props['sort-col']){
                sortIcon.addClass('fa-chevron-'+((props['sort-dir'] == 'asc')?'up':'down'));
            }else{
                sortIcon.addClass('fa-chevron-right');
            }
        }
        i++;
    });
};

factory.dataTable.updatePager=function(props, newPager){
    var pager = props.jquery.find(factory.dataTable.pagerSelector);
    pager.html(newPager);
};
