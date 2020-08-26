
/**
 * The file MomComponentCreateWindow is the window which comes by clicking on CreateMoM button in MoM page.
 * @extends {Ext.window.Window}
 * @alias 'widget.momcomponentcreatewindow'.
 * ViewModel: 'DDO.view.projects.MOMWindowViewModel'.
 * ViewController : 'DDO.view.projects.MOMWindowController'
 */
Ext.define('DDO.view.projects.MOMCreateWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.momcreatewindow',
    requires: [
        'DDO.view.projects.MOMWindowController',
        'DDO.view.projects.MOMWindowViewModel',
        'Ext.form.field.Time',
        'Ext.form.field.Date',
        'DDO.overrides.form.field.Tag',
        'DDO.ux.button.FabButton'
    ],
    controller: 'momwindowcontroller',
    viewModel: {
        type: 'momwindowviewmodel'
    },
    padding: '5px 25px',
    initComponent: function() {
        this.callParent(arguments);
        var controller = this.getController(),
        empStore = Ext.getStore('projects.EmpNamesStore');
        if (!empStore.isLoaded()) {
            empStore.load();
        }
      //   Ext.getDoc().on('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    destroy: function() {
        var controller = this.getController();
        Ext.getDoc().un('click', Ext.bind(controller.onWindowOutsideTap, controller));
    },
    modal: true,
    resizable: false,
    bind: {
        title: '{title}'
    },
    cls: 'momwindow-cls',
    width: Constants.ViewportWidth*0.593,
    scrollable: 'y',
    height:500,
    maxHeight:  Constants.ViewportHeight,
    bbar: {
        cls: 'mom-bbar-cls',
        height:80,
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DRAFTS,
            cls: 'mom-drafts-cls',
            width: Constants.ViewportWidth*0.073,
            height: 31,
            margin: '10px 0px 0px 12px',
            bind: {
                disabled: '{BtnVisible}'
            },
            listeners: {
                click: 'onDraftSubmitClick'
            }
        }, {
            xtype: 'button',
            cls: 'mom-submit-cls',
            width: Constants.ViewportWidth*0.073,
            height: 31,
         
            margin: '20px 12px 0px 12px',
            bind: {
                text: '{BtnText}'
            },
            listeners: {
                click: 'onMomSubmitClick'
            }
        }]
    },
   items:[{
        xtype: 'form',
        reference: 'agenda-ref',
        width: '100%',
        height: '60%',
        layout: {
            type: 'vbox'
        },
        items: [{
            xtype: 'container',
            width:'100%',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'textfield',
                name: 'mom_agenda',
                padding: '0px',
                cls: 'employeeexitcombo-cls',
                flex: 1,
                labelSeparator: '',
                fieldLabel: 'Title',
                labelAlign: "top",
                labelStyle: "height:25px",
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TITLE,
                bind: {
                    value: '{agenda}'
                }
        },
        {
            xtype: 'tbspacer',
            width: '20px'
        },
        {
            xtype: 'tagfield',
            reference: 'comboTagview',
            matchFieldWidth: false,
            bind: {
              fieldLabel: 'Participants [{selectedEmpCount}]'
          },
            cls: 'employeeexitcombo-clss',
            labelAlign: 'top',
            flex: 0.5,
            clearOnBackspace: false,
            tagCustomiseMom : true,
            tagMomOwnerId : '123',
            // cls: 'share-group-cls',
            forceSelection: false,
            scrollable:'y',
            grow: true,
            growMax:'150px',
            // grow: false,
            // editable : false,
            store: 'feeds.Groups',
            emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.PARTICIPANTSEMT,
            displayField: 'tagName',
            valueField: 'tagId',
            disabledCls: 'mom-item-disabled',
            queryMode: 'local',
            // clearFilterOnBlur: true,
            filterPickList: true,
            // listConfig: {
            //     cls: 'tag-view-list',
            //     width: Constants.ViewportWidth*0.222
            // },
            tpl: [
                '<ul class="x-list-plain"><tpl for=".">',
                '<li role="option" class="x-boundlist-item">',
                '<tpl if="values.isGroup">',
                '<span class="ddo-groupTag-round">{[this.getGroupTags(values)]}</span>',
                '{tagName}</tpl>',
                '<tpl else if="!values.isGroup">',
                '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
                '<div class="ddo-tag-Name">{tagName}</div></tpl></li></tpl>',
                '</ul>', {
                    getGroupTags: function(values) {
                      //   debugger;
                        if (typeof(values) === "object") {
                            if (values.isGroup) {   
                                return values.tagName[0];
                            }
                        }
                    },
                  
                    getTags: function(values) {
                      //   debugger;
                        if (typeof(values) === "object") {
                            if (!values.isGroup) {
                                var tagPic=Utility.imageCheck(values.tagPic)
                                if (tagPic) {
                                    return '<img class="tagUrl-img"  src="' + tagPic + '" onerror =' + Utility.defaultUserImg+'>';
                                }
                            } 
                        }
                    }
                }
            ],
          
            listeners: {
                select: function(combo, record, eOpts) {
                  var viewModel = this.up().up().up().getViewModel();
                  viewModel.set('selectedEmpCount', record.length);
                  combo.inputEl.dom.value = '';
                  
                    combo.collapse();
                  //   this.getRec(record);
                    var view = Ext.ComponentQuery.query('momcreatewindow')[0];
                    var vm = view.getViewModel();
                    var groupIds = [];
                    record.forEach((element) => {
                        console.log(element)
                        if(element.data.isGroup){
                            groupIds.push(element.data.tagId);
                        }
                        
                      })
                      if(groupIds.length > 0){
                          vm.set('isGroupSelected', true);
                          vm.set('groupIds', groupIds);
                      }
                }
            }
          },
            {
                    xtype: 'tbspacer',
                    width: '20px'
           },
                {   
                    xtype: 'tagfield',
                    reference: 'comboTagviewAbse',
                    matchFieldWidth: false,
                  bind: {
                      fieldLabel: 'Absentees [{absentEmpCount}]'
                  },
                    cls: 'employeeexitcombo-clss',
                    height:'20px',
                    maxHeight: '20px',
                    labelAlign: 'top',
                    flex: 0.5,
                    allowBlank: false,
                    clearOnBackspace: false,
                    tagCustomiseMom : true,
                    tagMomOwnerId : '123',
                    clearFilterOnBlur: true,
                    // cls: 'share-group-cls',
                    scrollable: true,
                    growMax:'150px',
                    forceSelection: false,
                    store: 'feeds.Groups',
                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ABSENTEESEMT,
                    displayField: 'tagName',
                    valueField: 'tagId',
                    disabledCls: 'mom-item-disabled',
                    queryMode: 'local',
                    filterPickList: true,
                    // listConfig: {
                    //     cls: 'tag-view-list',
                    //     width: Constants.ViewportWidth*0.222
                    // },
                    tpl: [
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">',
                        '<tpl if="values.isGroup">',
                        '<span class="ddo-groupTag-round">{[this.getGroupTags(values)]}</span>',
                        '{tagName}</tpl>',
                        '<tpl else if="!values.isGroup">',
                        '<div class="ddo-tag-round">{[this.getTags(values)]}</div>',
                        '<div class="ddo-tag-Name">{tagName}</div>',
                      //   '<div class="itemPic" id="boxPic{id}" onclick="onPic({id})">more</div>',
                        '</tpl></li></tpl>',
                        '</ul>', {
                            getGroupTags: function(values) {
                              //   debugger;
                                if (typeof(values) === "object") {
                                    if (values.isGroup) {   
                                        return values.tagName[0];
                                    }
                                }
                            },
                            getTags: function(values) {
                              //   debugger;
                                if (typeof(values) === "object") {
                                    if (!values.isGroup) {
                                        var tagPic=Utility.imageCheck(values.tagPic)
                                        if (tagPic) {
                                            return '<img class="tagUrl-img"  src="' + tagPic + '" onerror =' + Utility.defaultUserImg+'>';
                                        }
                                    } 
                                }
                            }
                        }
                    ],
                    listeners: {
          
                        select: function(combo, record, eOpts) {
                          //   debugger;
                            var viewModel = this.up().up().up().getViewModel();
                            viewModel.set('absentEmpCount', record.length);
                            combo.inputEl.dom.value = '';
                            combo.collapse();
                        
                            var view = Ext.ComponentQuery.query('momcreatewindow')[0];
                            var vm = view.getViewModel();
                            var groupIds = [];
                            record.forEach((element) => {
                                console.log(element)
                                if(element.data.isGroup){
                                    groupIds.push(element.data.tagId);
                                }
                                
                              })
                              if(groupIds.length > 0){
                                  vm.set('isGroupSelected', true);
                                  vm.set('groupIds', groupIds);
                              }
                        }
                    }
                
             }]
        },
        {
            xtype: 'container',
                    reference: 'dateValues',
                    width:'100%',
                    // height: '40%',
                    layout: {
                        type: 'hbox'
                    },
                    items:[{
                                    xtype: 'timefield',
                                    name: 'start_time',
                                    reference: 'startTime',
                                    disabledCls: 'mom-item-disabled',
                                    fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTTIME,
                                    required: true,
                                    labelAlign: 'top',
                                    flex: 0.2,
                                    bind: {
                                        value: '{start_time}'
                                    },
                                    editable: false,
                                    cls: 'employeecombo-cls',
                                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TIMEEMPTY,
                                    minValue: '00:00',
                                    maxValue: '24:00',
                                    hideTrigger: false,
                                    format: 'H-i',
                                    increment: 30,
                                    listConfig: {
                                        cls: 'mom-stime-cls'
                                    },
                                    listeners: {
                                        select: 'onStartTimeSelect'
                                    }
                                },
                                {
                                        xtype: 'tbspacer',
                                        width: 18
                                    },
                                {
                                    xtype: 'timefield',
                                    name: 'end_time',
                                    reference: 'endTime',
                                    disabledCls: 'mom-item-disabled',
                                    fieldLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ENDTIME,
                                    required: true,
                                    flex: 0.2,
                                    bind: {
                                        value: '{end_time}'
                                    },
                                    editable: false,
                                    cls: 'employeecombo-cls',
                                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.TIMEEMPTY,
                                    labelAlign: 'top',
                                    minValue: '00:00',
                                    maxValue: '24:00',
                                    hideTrigger: false,
                                    format: 'H-i',
                                    increment: 30,
                                    // listConfig: {
                                    //     cls: 'mom-stime-cls'
                                    // },
                                    listeners: {
                                        select: 'onEndTimeSelect'
                                    }
                                
                        } ,
                        {
                            xtype: 'tbspacer',
                            width: 18
                        },
                        {
                                        fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DURATION,
                                        labelAlign: 'top',
                                        xtype: 'numberfield',
                                        name: 'duration',
                                        editable: false,
                                        reference: 'duration',
                                        required: true,
                                        flex: 0.2,
                                        // width: Constants.ViewportWidth*0.048,
                                        emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.HRS,
                                        hideTrigger: true,
                                        bind: {
                                            value: '{duration}'
                                        },
                                        cls: 'employeecombo-cls'
                                    },
                                    {
                                        xtype: 'tbspacer',
                                        width: '18px'
                                    },
                                    
                                    {  
                                    fieldLabel: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STARTDATE,
                                    labelAlign: "top",
                                    xtype: 'datefield',
                                    flex: 0.2,
                                    cls: 'employeecombo-cls',
                                    maskRe: /[0-9\-\/]/,                
                                    required: true,
                                    alwaysOnTop: true,
                                    name: 'start_date',
                                    disabledCls: 'notestatus-item-disabled',
                                    reference: 'fromDate',
                                    bind: {
                                        value: '{start_date}'
                                    },
                                    emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DATEEMPTY,
                                    format: 'd-m-Y',
                                    listeners: {
                                        focusleave:"onKeyDownDate"
                                    },
                                    minValue: new Date(),
                                    createPicker: function() {
                                        var me = this,
                                            format = Ext.String.format;
                                        return Ext.create('Ext.picker.Date', {
                                            pickerField: me,
                                            ownerCt: me.ownerCt,
                                            renderTo: document.body,
                                            floating: true,
                                            hidden: true,
                                            focusOnShow: true,
                                            cls: 'ddo-create-datepicker',
                                            minDate: me.minValue,
                                            maxDate: me.maxValue,
                                            disabledDatesRE: me.disabledDatesRE,
                                            disabledDatesText: me.disabledDatesText,
                                            disabledDays: me.disabledDays,
                                            disabledDaysText: me.disabledDaysText,
                                            format: me.format,
                                            showToday: me.showToday,
                                            startDay: me.startDay,
                                            minText: format(me.minText, me.formatDate(me.minValue)),
                                            maxText: format(me.maxText, me.formatDate(me.maxValue)),
                                            listeners: {
                                                scope: me,
                                                select: me.onSelect
                            
                                            },
                                            keyNavConfig: {
                                                esc: function() {
                                                    me.collapse();
                                                }
                                            }
                                        });
                                      }
                                }
                    ]
        }]
    },
  
     {
        xtype: 'ddohtmleditor',
        hidden: true,
        reference: 'editor-ref',
        name: 'mom_desc',
        required: true,
        emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DESCRIPTION,
        submitEmptyText: false,
        cls: 'mom-html-editor-cls',
        disabledCls: 'mom-item-disabled',
        width: Constants.ViewportWidth*0.595,
        height: Constants.ViewportHeight*0.28,
        bind: {
            value: '{mom_desc}'
        },
        listeners: {
            render: function(editor) {
                editor.getToolbar().hide();
            }
        }
    },
     {
        xtype: 'grid',
        reference: 'gridValues',
        width: '100%',
        padding: '20px 0px 0px 0px',
        height: '110px',
        height: Constants.ViewportHeight*0.33,
        layout: 'fit',
        columnLines: true,
        rowLines: false,
        // cls: 'ddo-rating-grid',
        cls: 'mom-grid-view',
        disabledCls: 'mom-item-disabled',
        bind: {
            disabled: '{nonEditablePermit}'
        },
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1,
            clicksToMoveEditor: 2,
            autoCancel: false,
            listeners: {
                edit: function(editor, context, eOpts) {
                    var name, store, record;
                    if (arguments[1].record.data) {
                        name = arguments[1].record.data.assigned_to;
                    }
  
                    store = Ext.getStore('projects.EmpNamesStore');
  
                    if (store) {
                        record = store.findRecord("user_full_name", name, 0, true);
                    }
  
                    if (store && record) {
                        arguments[1].record.data.user_id = record.data.user_id;
                    }
                }
            }
        },
        store: 'projects.MOMGridStore',
        columns: [{
            xtype: 'rownumberer',
            align: 'center',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.SNO,
            flex: 0.2
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'action_item',
            flex: 0.7,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ACTIONITEM,
            editor: {
                xtype: 'textfield',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ACTIONITEM,
                disabledCls: 'mom-item-disabled',
                bind: {
                    disabled: '{nonEditablePermit}',
                    value: '{actionItem}'
                }
            }
        }, {
            xtype: 'gridcolumn',
            flex: 0.4,
            dataIndex: 'assigned_to',
            reference: 'assignedTo',
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
            editor: {
                xtype: 'combobox',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ASSIGNEDTO,
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local',
                lastQuery: '',
                minChars: 1,
                displayField: 'user_full_name',
                valueField: 'user_full_name',
                disabledCls: 'mom-item-disabled',
                bind: {
                    disabled: '{nonEditablePermit}',
                    value: '{assigned_to}'
                },
                store: 'projects.EmpNamesStore'
            },
            renderer: function(value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                var empStore = Ext.getStore('projects.EmpNamesStore');
                    empStore.reload();
                return value;
            }
        },
         {
            xtype: 'gridcolumn',
            dataIndex: 'due_date',
            flex: 0.4,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DUEDATE,
            menuDisabled: true,
            autoSync: true,
            renderer: Ext.util.Format.dateRenderer('d-m-Y'),
            editor: {
                xtype: 'datefield',
                disabledCls: 'mom-item-disabled',
                bind: {
                    disabled: '{nonEditablePermit}',
                    value: '{due_date}'
                },
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.DATEEMPTY,
                format: 'd-m-Y',
                minValue: new Date(),
                createPicker: function() {
                    var me = this,
                        format = Ext.String.format;
                    return Ext.create('Ext.picker.Date', {
                        pickerField: me,
                        ownerCt: me.ownerCt,
                        renderTo: document.body,
                        floating: true,
                        hidden: true,
                        focusOnShow: true,
                        cls: 'ddo-create-datepicker',
                        minDate: me.minValue,
                        maxDate: me.maxValue,
                        disabledDatesRE: me.disabledDatesRE,
                        disabledDatesText: me.disabledDatesText,
                        disabledDays: me.disabledDays,
                        disabledDaysText: me.disabledDaysText,
                        format: me.format,
                        showToday: me.showToday,
                        startDay: me.startDay,
                        minText: format(me.minText, me.formatDate(me.minValue)),
                        maxText: format(me.maxText, me.formatDate(me.maxValue)),
                        listeners: {
                            scope: me,
                            select: me.onSelect
                        },
                        keyNavConfig: {
                            esc: function() {
                                me.collapse();
                            }
                        }
                    });
                }
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'status',
            flex: 0.3,
            text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
            editor: {
                xtype: 'textfield',
                readOnly: true,
                emptyText:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.STATUS,
                disabledCls: 'mom-item-disabled',
                bind: {
                    value: '{status}'
                }
            }
        },
        {
          xtype: 'actioncolumn',
          text: 'Action Column',
          align: 'center',
          flex: 0.2,
          bind: {
              hidden: '{action}'
          },
          cls: "removeLine",
          items: [{
              iconCls: 'delete-plus',
              tooltip: 'Delete',
              handler: "deleteMomGridrow",
              // align: 'center',
          }]
      }
  ]
    },{
        xtype: 'fabbutton',
        fabUi: 'add',
        position: 'br',
        listeners: {
            click: function(btn, e, eOpts) {
                var me = this,
                    win = me.up(),
                    grid = win.down('grid');
                win.getController().addTask(grid);
            }
        }
    },
    
  ],
    listeners: {
        beforeClose: function(winPanel) {
            var view = winPanel.down('gridview'),
                vm = winPanel.getViewModel();
            if (view && view.editingPlugin) {
                view.editingPlugin.cancelEdit();
            }
            vm.set('isExists', false);
  
        },
        afterrender: function(me, eOpts) {
            var tagView = me.down('tagfield[reference=comboTagview]'),
                particpantTagStore = tagView.getStore(),
                winVm = me.getViewModel(),
                loginStore, empId, loginParticipantData, loginEmpId;
            particpantTagStore.load({
                callback: function() {
                    loginStore = Ext.getStore('login'),
                        empId = loginStore.getData().items[0].data.ddo_employee_id,
                        loginParticipantData = particpantTagStore.findRecord("tagId", empId);
                    if (loginParticipantData && loginParticipantData.data) {
                        loginEmpId = loginParticipantData.data.tagId;
                        winVm.set('loginEmpId', loginEmpId);
                        tagView.setValue(loginParticipantData.data.tagId);
                        winVm.set('isExists', true);
                    }
  
                }
            })
        }
    }
  });