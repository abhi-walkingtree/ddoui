/**
 * This file is responsible for grid view of the AllocationSheetContainer.
 * ViewModel : 'DDO.view.allocationsheet.AllocationSheetModel'.
 * ViewController : 'DDO.view.allocationsheet.AllocationSheetController'.
 */
Ext.define('DDO.view.sheets.allocationsheet.AllocationSheet', {
    extend: 'Ext.grid.Panel',
    xtype:'allocationsheet',
    requires: [
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.Exporter'
    ],
    loadMask: true,
    plugins: [
        'gridfilters', {
            ptype: 'gridexporter',
            pluginId: 'exporter'
        }
    ],
emptyText:"No Data Found",
    features: [{
        ftype: 'grouping'
    }],
    headerBorders: false,
    cls: 'ddo-dashboard-grid',
   
    columns: [{
        text:LabelsTitles.SNO,
        xtype: 'rownumberer',
        align: 'left',
        flex:0.50
    }, {
        text: LabelsTitles.EMPLOYEENAME,
        dataIndex: 'fullName',
        flex:1.5,
        filter: {
            type: 'string'
        }
    }, {
        text: LabelsTitles.EMPLOYEEID,
        dataIndex: "employee_code",
        flex:1,
        filter: {
            type: 'string'
        }
    },{
        text: LabelsTitles.DESIGNATION,
        dataIndex: 'designationname',
        flex:1,
        filter: {
            type: 'string'
        }
    },{
        text: LabelsTitles.PROJECTNAME,
        dataIndex: 'project',
        flex:1,
        filter: {
            type: 'string'
        }
    }, {
        text:LabelsTitles.ALLOCATIONFACTOR,
        dataIndex: 'allocation_factor',
        flex:1
    },{
        text:LabelsTitles.FINANCIALYEAR,
        dataIndex: 'yearname',
        flex:1
    },{
        text:LabelsTitles.MONTH,
        dataIndex: 'monthname',
        flex:1
    }]

   
});