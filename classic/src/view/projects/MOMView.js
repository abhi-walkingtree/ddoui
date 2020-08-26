/**
 * The file MOMView is the view file for MOM tab in 'DDO.view.projects.ProjectsTabsDetailsView'.
 * @extends {Ext.container.Container}
 * @alias 'widget.momview'.
 * ViewModel : 'DDO.view.projects.MOMViewModel'.
 * ViewController : 'DDO.view.projects.MOMCmpViewController'.
 */
Ext.define('DDO.view.projects.MOMView', {
    extend: 'Ext.container.Container',

    alias: 'widget.momview',

    requires: [
        'DDO.view.projects.MOMProject',
        'DDO.view.projects.MOMCmpView',
        'DDO.view.widget.generic.HtmlEditor',
        'DDO.view.projects.MOMCmpViewController'
    ],

    controller: 'momcmpviewcontroller',
   
    padding: '0 21',

    items: [
        {
        xtype: 'momproject'
    }, 
    {
        xtype: 'momcmpview'
    }]
});