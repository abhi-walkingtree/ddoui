/**
 * The file 'DDO.view.setup.financialyear.FinancialYear' is the view file for the  FinancialYear.
 * @extends {Ext.container.Container} 
 * @alias 'widget.financialyear'.
 * ViewController : 'DDO.view.setup.financialyear.FinancialYearViewController'
 */
Ext.define('DDO.view.setup.financialyear.FinancialYear', {
    extend: 'Ext.container.Container',
    alias: 'widget.financialyear',
    requires: [
        'DDO.view.setup.financialyear.FinancialYearGrid',
        'DDO.view.setup.financialyear.FinancialYearToolbar',
        'DDO.view.setup.financialyear.FinancialYearViewController',
        'DDO.view.setup.financialyear.FinancialYearWindow'
    ],
    cls: 'karmarule-cls department-cls',
    scrollable:false,
    controller: 'financialyearviewcontroller',
    initComponent: function() {
        this.callParent(arguments);
        var financialGrid = this.down('financialyeargrid');
        var store = financialGrid.getStore();
        if (!store.isLoaded()) {
            Utility.onStoreLoading(store);
        }
    },
    items: [{
        xtype: 'financialyeartoolbar',
        cls: 'wallet-toolbar-cls',
        width: '100%',
        height: Constants.ViewportHeight * 0.11,
        html: LabelsTitles.EMPSETUP.FINANCIALYEAR.FYEAR
    }, {
        xtype: 'financialyeargrid',
        store: 'setup.financialyear.FinancialYearStore'
    }]
});