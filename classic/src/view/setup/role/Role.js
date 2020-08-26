/**
*   This file is responsible for containing views of all available roles and creation of new roles.
*   @extends {Ext.container.Container} - containing grid, toolbar and window.
*   @alias role
*   ViewController : 'DDO.view.setup.role.RoleViewController'.
*/
Ext.define('DDO.view.setup.role.Role', {
    extend: 'Ext.container.Container',

    alias: 'widget.role',

    cls: 'karmarule-cls roleview-cls',
    requires: [
        'DDO.view.setup.role.RoleGrid',
        'DDO.view.setup.department.DepartmentToolbar',
        'DDO.view.setup.role.RoleViewController',
        'DDO.view.setup.role.RoleWindow'
    ],

    controller: 'roleviewcontroller',
    initComponent: function() {
        this.callParent(arguments);
        var roleGrid = this.down('rolegrid'),
            gridStore = roleGrid.getStore();
        if (!gridStore.isLoaded()) {
            Utility.onStoreLoading(gridStore);
        }
    },
    items: [{
        xtype: 'departmenttoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: Constants.ViewportHeight*0.11,
        html: LabelsTitles.EMPSETUP.ROLE.ROLES
    }, {
        xtype: 'rolegrid',
        store:  'setup.role.RoleStore'
    }]
});