Ext.define('DDO.view.employeereportview.EmployeeReportGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.employeereportgrid',
  cls: 'employeereportgrid-cls',
  margin: '50 0 0 30',
  requires: [
    'Ext.grid.filters.Filters',
    'Ext.grid.plugin.Exporter'
  ],
  plugins: [
    {
      ptype: 'gridexporter',
      pluginId: 'exporter'
    }
  ],
  bind: {
    store: '{employestore}'
  },
  columns: [
    {
      text: 'EmployeeName',
      dataIndex: 'fullname',
      flex: 1
    },
    {
      text: 'designation',
      dataIndex: 'designationname',
      flex: 1
    },
    {
      text: 'primaryskills',
      dataIndex: 'primaryskill',
      flex: 1
    }, {
      text: 'Email',
      dataIndex: 'email',
      flex: 1
    },
    {
      text: 'PhoneNumber',
      dataIndex: 'phoneno',
      flex: 1
    },
    {
      text: 'ReportingTo',
      dataIndex: 'reportingname',
      flex: 1
    },
    {
      text: 'EmpStatus',
      dataIndex: 'empstatus',
      flex: 1
    }
  ]
});