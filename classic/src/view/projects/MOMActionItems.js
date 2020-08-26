Ext.define('DDO.view.projects.MOMActionItems', {
    extend: 'Ext.window.Window',
    alias: 'widget.momActionItems',
    controller: 'momActionItemsController',
    viewModel: {
        type: 'momActionItemViewModel'
    },  
    requires: [
        'DDO.view.projects.MOMActionItemsController',
        'DDO.view.projects.MOMActionItemsViewModel',
        'DDO.store.projects.MOMActionItemsStore',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.filters.Filters',
    ],
    closable: true,
    constrain: true,
    header: true,
    padding: '5px 20px',
    modal: true,
    resizable: false,
    layout: 'fit',
    scrollable: 'y',
    title: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMACTIONTITLE, 
   tbar: {
       cls:'mom-search-cls',
       items:[
       {
        xtype:'textfield',
        emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.SEARCHBOX,
        cls: 'ddo-search-text',
        name:'momagenda',
        enableKeyEvents: true,
        listeners: {
            change: 'onMomSearchText'
        }
       }, {
		xtype: 'button',
		width: 10,
		height: 10,
		cls: 'search-icon-field'
       },'->',{
        text:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.COLUMNS,
        arrowVisible: false,
        reference : 'hidecolumns',
        cls:'hidecolumn-cls',
        iconCls:'x-fa fa-columns',
        tooltip:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.HIDEORUNHIDE,
        menu:{
            bodyPadding:'0 0 10 0',
            items:[{
                xtype:'checkboxgroup',
                defaults: {
                    fontSize: 14,
                    margin: '0 -18 0',
                    checked: true,
                },
                columns:1,
                items:[{
                    boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
                    inputValue:2,
                    reference:'assignedto'
                },{
                    boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.AGENDA,
                    inputValue:3,
                    refrence:'columnagenda'
                },
            {
                boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TASK,
                inputValue:4,
                refrence:'task'
            },{
                boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMSTARTDATE,
                inputValue:5,
                refrence:'startdate'
            },{
                boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDDATE,
                inputValue:6,
                refrence:'enddate'
            },{
                boxLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
                inputValue:7,
                refrence:'status'
            }]
            },{
                xtype:'button',
                text:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.APPLY,
                reference:'applybutton',
                align:'center',
                // width: 40,
                height: 30,
                cls:'column-apply-click',
                listeners:{
                    click:'onColumnApplyClick'
                }
            }]
        }
       },
    {
        xtype: 'button',
        html: '<img src =  "/resources/images/feeds/dwld.png" width="20" height="22">',
        ui: 'plain',
        margin:'0 0 0 15px',
        tooltip: LabelsTitles.SHEETS.DOWNLOADEXCEL,
        listeners: {
            click: 'onDownloadExcelBtnClick'
        }
    }
    ],
   
   },
    cls: 'ddoRatingSelfwindow',
    width:Constants.ViewportWidth*0.62,
   
    height:Constants.ViewportHeight*0.8,
    maxHeight: Constants.ViewportHeight,
    bbar: {
        cls: 'mom-bbar-cls',
        height:56,
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.FOLLOWUP,
            cls: 'mom-folloup-cls',
            width: Constants.ViewportWidth*0.073,
            height: 35,
            margin: '0px 0px 0px 12px',
            handler: 'onFollowUp'
        }]
    },
    items:[{
        xtype: 'grid',
        scrollable: 'y',
        height: '100px',
        reference: 'actionItemsGridRef',
        cls: "check-btn-cls",
      
        features: [{
            ftype: 'grouping'
        }],
        bind: {
            store: '{momActionItemsStore}'
        },
        selModel: {
            selType: 'checkboxmodel'
        },
      
        columns: [
            {
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO, 
                dataIndex: 'empname',
                name:'employeename',
                cls: "removeLine",
                flex: 1,
            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMAGENDA,
                dataIndex: 'mom',
                name : 'momagenda',
                cls: "removeLine",
                flex: 1,
            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TASK,
                dataIndex: 'task',
                cls: "removeLine",
                flex: 1,
            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.MOMSTARTDATE,
                dataIndex: 'task_start_date',
                cls: "removeLine",
                flex: 1,
                renderer:function(value){
                    value = Ext.Date.format(new Date(value), 'd-m-Y') ;
                     return value;
                }

            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDDATE,
                dataIndex: 'task_end_date',
                cls: "removeLine",
                flex: 1,
                renderer:function(value){
                    value = Ext.Date.format(new Date(value), 'd-m-Y') ;
                     return value;
                }
            },{
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS, 
                dataIndex: 'iscompleted',
                cls: "removeLine",
                name: 'status',
                flex: 0.8,
                align: 'center'
            }
        ],
        plugins: [
             {
                ptype: 'gridexporter',
                pluginId: 'exporter'
            },
            {
                ptype: 'rowexpander',
                align:'center',
                headerWidth:40,
                selectRowOnExpand:true,
                rowBodyTpl: [
                    '<tpl>',
                    "<table border='1'>",
                    '<table style="width:500px; border: 1px solid black">',
                    '<tr> <td class="gridcss"><b>History</b></td></tr>',
                    '<tr><td class="gridcss"> {[this.momActionHistory(values.history)]}</td></tr>',
                    '</table>',
                    '</tpl>',
                {
                        momActionHistory: function(value) {
                        if (!Ext.isEmpty(value))  {
                            return (value);
                        }
                        else{
                            return 'History not available' ;
                        }
                    },
                }
             ],
            
            }
        ],
    viewConfig: {
        enableTextSelection: true
    }
 
    }]

})