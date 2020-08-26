/**
 *   This file is responsible for ProjectsTabsDetailsView.
 *   @extends {Ext.container.Container}
 *   @alias widget.projectstabsdetailsview
 */
Ext.define('DDO.view.projects.ProjectsTabsDetailsView', {
    extend: 'Ext.container.Container',
    alias: 'widget.projectstabsdetailsview',
    cls: 'projecttabs-detailview-cls',
    requires: [
        'DDO.view.projects.NotesView',
        'DDO.view.projects.MOMView',
        'DDO.view.projects.people.PeopleView',
        'DDO.view.projects.TechnologiesView'
    ],
    layout: {
        type: 'card'
    },

    items: [{
        xtype: 'notesview',
        itemId: 'notes'
    }, {
        xtype: 'momview',
        itemId: 'mom'
    }, {
        xtype: 'peopleview',        
        itemId: 'people'
    },{
        xtype: 'technologiesview',
        itemId: 'technologies'
    }]
});