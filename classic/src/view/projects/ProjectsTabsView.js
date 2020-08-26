/**
 *   This file is responsible for ProjectsTabsView.
 *   @extends {Ext.container.Container}
 *   @alias widget.projectstabsview
 *   ViewModel :'DDO.view.projects.ProjectsViewModel'.
 *   ViewController :'DDO.view.projects.ProjectsViewController'.
 */
Ext.define('DDO.view.projects.ProjectsTabsView', {
    extend: 'Ext.container.Container',
    alias: 'widget.projectstabsview',
    requires: [
        'DDO.view.projects.ProjectsTabsDetailsView',
        'DDO.view.projects.FeedbackWindow',
        'DDO.view.profile.nominateview.NominateViewWindow',
        'DDO.view.projects.ProjectsViewModel'
    ],
    width: '100%',
    viewModel: {
        type: 'projectsviewmodel'
    },
    layout: {
        type: 'hbox'
    },
    margin: '0 20 20 20',
    initComponent: function () {
        var me = this;
        var toolbarContainer;
        this.callParent(arguments);
        toolbarContainer = this.down('container[reference="projectstoolbar"]');
        Ext.Ajax.request({
            url: 'resources/data/projects.json',
            method: 'GET',
            scope: this,
            success: function (response) {
                var res = Ext.decode(response.responseText),
                    itemsArray = [];
                res.data.forEach(function (rec) {
                    if (rec.btnName) {
                        itemsArray.push({
                            xtype: 'button',
                            cls: 'projects-btn-cls',
                            text: rec.btnName,
                            toggleGroup: 'projectsGroup',
                            enableToggle: true,
                            listeners: {
                                click: 'onBtnClick'
                            }
                        });
                    } else if (rec.projectStatus == 'ProjectStatus') {
                        // itemsArray.push({
                        //     xtype: 'combobox',
                        //     name: 'status',
                        //     reference: 'status',
                        //     editable: false,
                        //     forceSelection: true,
                        //     width: Constants.ViewportWidth * 0.107,
                        //     height: Constants.ViewportHeight * 0.062,
                        //     margin: '9 0 0 6',
                        //     emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTS.EMPTYTEXT,
                        //     bind: {
                        //         store: '{projectStatus}'
                        //     },
                        //     listeners: {
                        //         select: 'onSelectStatusValue'
                        //     },
                        //     cls: 'ddo-project-combo',
                        //     displayField: 'status',
                        //     valueField: 'status',
                        // })
                    } else {
                        // itemsArray.push({
                           
                        // })
                    }
                });
                toolbarContainer.add(itemsArray);
            }
        });
    },
    items: [{
        cls: 'projectpic-container-cls',
        width: '16%',
        defaults: {
            margin: 10
        },
        layout: {
            type: 'vbox'
        },
        items: [{
            xtype: 'form',
            items: [
                {
                    xtype: 'dataview',
                    loadMask: false,
                    cls: 'projectPic-cls',
                    // store: 'projects.ProjectDashboardStore',
                    tpl: [
                        
                        '<div class="testing">',
                        '<h2 style = "color:#707070; "> Client Details </b> </h2>',
                        '<tpl if="this.imgExistance(values)">',
                        '<img src="{[this.projectImageUrl(values)]}" class="pro-tab-img-cls" wrap-td="image_url" onerror = ' + Utility.defaultProjectImg + '>',
                        '<br />',
                        '<tpl else>',
                        '<div style="background: {[this.nonImgColor(values)]};" wrap-td="image_url" class="pro-tab-non-img-cls"><span class="testing">{[this.getNonImgFirstLetter(values)]}</span></div>',
                        '<br />',
                        '</tpl>',
                        '<div class="pro-tab-name-cls" data-qtip="{name}" >{name}</div>',
                        '<p>Client Name:</p>',
                        '<div class ="clientname-cls">{clientname}</div>',
                        '</div>',
                        {
                            setId: function (values) {
                                var itemId;
                                itemId = 'input_' + values.project_id;
                                Ext.Function.defer(this.addListener, 2, this, [itemId, values]);
                                return itemId;
                            },
                            projectImageUrl: function (values) {
                                var path = values.image_url;
                                return (path) ? Utility.imageCheck(path) : Utility.projectImg;
                            },
                            imgExistance: function (values) {
                                if (values.image_url && values.image_url != "null") {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            nonImgColor: function (values) {
                                return values.color || '#FFFFFF 0% 0% no-repeat padding-box;';
                            },
                            getNonImgFirstLetter: function (values) {
                                return values.name[0];
                            }
                        }
                    ],
                    itemSelector: '.testing'
                }, {
                    xtype: 'filefield',
                    opType: 'upload',
                    name: 'projectImage',
                    accept: 'image',
                    cls: 'projectsCamera-cls',
                    buttonOnly: true,
                    buttonText: '',
                    listeners: {
                        change: 'onProjectImgChange'
                    }
                }
            ]
        }, {
            xtype: 'button',
            cls: 'projects-feedback-button-cls',
            width: Constants.ViewportWidth * 0.103,
            height: Constants.ViewportHeight * 0.067,
            margin: '50 0 0 0',
            text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTS.FEEDBACK,
            listeners: {
                click: 'onFeedbackClick'
            }
        }]
    },{
        xtype: 'container',
        width: '100%',
        cls: 'project-view-container',
        layout: {
            type: 'vbox'
        },
        items:[{ 
         xtype: 'combobox',
        name: 'projectSelect',
        reference: 'projectSelect',
        forceSelection: true,
        hideTrigger: true,
        width: Constants.ViewportWidth * 0.107,
        height: Constants.ViewportHeight * 0.062,
        emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTS.SEARCHPROJECT,
        queryMode: 'local',
        filterPickList: true,
        fieldLabel:LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTS.LABEL,
       // labelAlign:'top',
        margin: '9 0 0 10',
        store: 'projects.ProjectDashboardStore',
        cls: 'ddo-projecttabs-combo',
        displayField: 'name',
        valueField: 'name',
        listConfig:{
            minWidth:250,
            maxHeight:400, 
        },
        listeners: {
            select: 'onSelectProjectName',
            beforequery: 'onSerchProjectName',
            beforerender: function (combo) {
                combo.setValue('');
            }
        }
    },{
		xtype: 'button',
		width: 10,
		height: 10,
		cls:'switch-project-search-icon-field'
	}, {
		xtype: 'tbfill'
	},{
         xtype: 'container',
        width: '84%',
         cls: 'project-toolbar-detailsview-container-cls',
         margin: '24 0 0 0',
        items: [
            // {
            //         xtype: 'button',
            //         width: Constants.ViewportWidth * 0.036,
            //         height: Constants.ViewportHeight * 0.04,
            //         padding: 0,
            //         margin: 0,
            //         iconCls: 'x-fa fa-arrow-left',
            //         cls: 'back-button',
            //         listeners: {
            //             click: 'onClickBackNavigate'
            //         }
            //     }
                ,{
                    xtype: 'container',
                    itemId: 'projectstoolbar',
                    reference: 'projectstoolbar',
                    layout: {
                        type: 'column'
                    },
                    defaults: {
                        width: Constants.ViewportWidth * 0.074,
                        height: Constants.ViewportHeight * 0.062,
                        margin: '9 7 7 7'
                    },
                }, {
                    xtype: 'projectstabsdetailsview'
                }]
            }
        ]
        
    },
]
});