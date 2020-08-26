/**
 *   This file  is responsible for KarmaApproval.
 *   @extends {Ext.grid.Panel}
 *   @alias widget.karmaapproval
 *   ViewModel:'DDO.view.karmaapproval.KarmaApprovalViewModel'.
 *   ViewController :'DDO.view.karmaapproval.KarmaApprovalController'.
 */
Ext.define('DDO.view.karmaapproval.KarmaApproval', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.button.Button',
        'DDO.view.karmaapproval.KarmaApprovalViewModel',
        'DDO.view.karmaapproval.KarmaApprovalWindow',
        'DDO.view.karmaapproval.KarmaApprovalController',
        'DDO.view.karmaapproval.KarmaRejectWindow',
        'DDO.view.karmaapproval.ProjectedKarmaAcceptWindow'
    ],
    initComponent: function() {
        this.callParent(arguments);
        var karmaApprovalVM = this.getViewModel();
        var karmaApprovalStore = karmaApprovalVM.getStore('karmaapprovalstore');
        if(!karmaApprovalStore.isLoaded()){
            karmaApprovalStore.load();
        }
    },
    //columnLines: true,
   // rowLines: true,
    width: '100%',
    alias: 'widget.karmaapproval',
    controller: 'karmaapprovalcontroller',
    viewModel: {
        type: 'karmaapprovalviewmodel'
    },
    bind:{
        store: '{karmaapprovalstore}'
    },
    padding: '5 27 0 5',
    margin: '37 0 0 0',
    cls: 'ddo-approval-cls',
    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.EMPTYTEXT,
    columns: [{
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.FORM,
            dataIndex: 'fromname',
            //flex: 1,
            sortable: false,
            align: 'center',
            menuDisabled: true
        },
        {
            text: 'Submited date',
            dataIndex: 'submiteddate',
            //flex: 0.6,
            sortable: false,
            align: 'center',
            menuDisabled: true,
        },
         {
            text: 'Karma Units',
            dataIndex: 'karmaunits',
            align: 'center',
            //flex: 1,
            sortable: false,
            menuDisabled: true
        },
         {
            // text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.KARMAPOINTS,
            text:'Derived Points',
            dataIndex: 'points',
            align: 'center',
            //flex: 1,
            sortable: false,
            menuDisabled: true
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.KARMACAT,
            dataIndex: 'karmacategory_name',
            //flex: 1,
            align: 'center',
            sortable: false,
            menuDisabled: true
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.KARMA,
            dataIndex: 'karma_name',
            //flex: 1,
            sortable: false,
            menuDisabled: true,
            align: 'center',
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.MONATH,
            dataIndex: 'nominate_month',
            //flex: 1,
            sortable: false,
            align: 'center',
            menuDisabled: true
        }, {
            text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.COMMENTS,
            dataIndex: 'comments',
            align: 'center',
            //flex: 1,
            sortable: false,
            menuDisabled: true,
            renderer:function(data,record){
                var limitedChar=  data.substr(0, 7);
              var  elipsis="...";
                return limitedChar + elipsis;
             }
        },{
            text:'Hr Karmaunits',
            dataIndex:'hr_karma',
            align:'center',
            //flex:1.5,
            sortable:false,
            menuDisabled:true
        },{
            text: 'Hr Comments',
            dataIndex: 'hrcomments',
            align: 'center',
            //flex: 1.5,
            sortable: false,
            menuDisabled: true,
            renderer:function(data,record){
                var limitedChar=  data.substr(0, 7);
              var  elipsis="...";
                return limitedChar + elipsis;
             }
        },
        {
            text:'Finance Karmaunits',
            dataIndex:'finance_karma',
            align:'center',
            //flex:1,
            sortable:false,
            menuDisabled:true
        },{
            text: 'Finance Comments',
            dataIndex: 'financecomments',
            align: 'center',
            //flex: 1.5,
            sortable: false,
            menuDisabled: true,
            renderer:function(data,record){
                var limitedChar=  data.substr(0, 7);
              var  elipsis="...";
                return limitedChar + elipsis;
             }
        },{
            xtype:'actioncolumn',
            header:'Actions',
            reference:'action',
           // flex: 0.5,
            align: 'center',
            sortable:false,
            menuDisabled:true,
            layout:'hbox',
            align:'center',
            cls:'action-coloumn-cls',
            items:[{
                iconCls:'x-fa fa-check',
                // html:<i class="x-fa fa-check" style="color:green"></i>,
                handler:'onAcceptBtnClick',
                // header:'hidden',
                cls:'accept-icon-cls'

            },
        {
            xtype:'tbspacer'
        },{
            iconCls:'x-fa fa-times',
            handler:'onRejectBtnClick',
            cls: 'reject-icon-cls'
            // header:'hidden'

        }]
        }
        // {
        //     text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.SENDBACK,
        //     //flex: 0.9,
        //     xtype: 'widgetcolumn',
        //     cls: 'approve-header-cls',
        //     sortable: false,
        //     menuDisabled: true,
        //     widget: {
        //         xtype: 'button',
        //         text: LabelsTitles.EXECUTIVEDASHBOARD.KARMAAPPROVAL.SENDBACKBTN,
        //         name: 'sendback',
        //         cls: 'rejectbutton sendbackbutton',
        //         handler: 'onRejectBtnClick'
        //     },
        //     renderer: function (value, meta, record) {
        //         meta.tdCls += 'approve-cell-css';
        //         return value;
        //     }
        // }
    ],
    listeners: {
        // cellclick: '+++',
        afterrender: function () {
            this.getStore().load();
        }
    }
});