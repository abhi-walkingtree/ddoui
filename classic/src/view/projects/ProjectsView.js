/**
 * The file DDO.view.projects.ProjectsView is the view file for the Projects tab in the application.
 * @extends {Ext.container.Container}.
 * @alias widget.projectsview.
 * ViewModel : 'DDO.view.projects.ProjectsViewModel'.
 * ViewController : 'DDO.view.projects.ProjectsViewController'.
 */
Ext.define('DDO.view.projects.ProjectsView', {
    extend: 'Ext.container.Container',

    xtype: 'projectsview',

    requires: [
        'DDO.view.projects.ProjectsViewController',
        'DDO.view.projects.ProjectsViewModel',
        'DDO.view.projects.ProjectDashboardView',
        'DDO.view.projects.ProjectsTabsView',
        'DDO.view.projects.ExternalUploadForm',
        'DDO.view.projects.AddProjectWindow',
        'DDO.store.projects.ProjectDashboardStore'
    ],

    controller: 'projectsviewcontroller',
    viewModel: {
        type: 'projectsviewmodel'
    },
    layout: {
        type: 'card'
    },
    cls: 'project-view-cls',
    items: [{
        xtype: 'container',
        items: [{
            xtype: 'toolbar',
            cls: 'project-toolbar-cls',
            width: '100%',
            items: [
            {
                xtype: 'button',
                width: 15,
                cls: 'project-search-icon',
                height: 15
            },
            {
                xtype: 'textfield',
                reference: 'agendaRef',
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.EMPTYSEARCHPROJECT,
                cls: 'ddo-projecttodo-detail-search-text',
                name: 'agendasearch',
                height: 30,
                width: Constants.ViewportWidth*0.2,
                margin: 15,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onProjectSearchText'
                }
            }, {
                xtype: 'tbfill'
            },{
                xtype: 'tagfield',
                reference: 'statustagview',
                matchFieldWidth: false,
                clearOnBackspace: false,
                forceSelection: true,
                width: '50%',
                cls: 'share-group-cls',
                bind : {
                    store: '{projectStatus}',
                },                
                emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.PROJECTSTATUS,
                displayField: 'status',
                multiSelect: true,
                valueField: 'status',
                disabledCls: 'mom-item-disabled',
                queryMode: 'local',
                filterPickList: true,
                listConfig: {
                    cls: 'tag-view-list',
                    width: Constants.ViewportWidth*0.22
                },
                listeners: {
                    change: 'onProjectStatusSelect'
                }
            },
             {
                xtype: 'button',
                text: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.ADDPROJECTS,
                cls: 'projects-add-btn',
                bind: {
                    hidden: '{addNewProject}'
                },
                listeners: {
                    click: 'onAddProjectClick'
                }
            }]
        }, {
            xtype: 'projectdashboardview',
            store: 'projects.ProjectDashboardStore'
        }]
    }, {
        xtype: 'projectstabsview'
    }]
});