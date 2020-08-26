Ext.define('DDO.view.employeereportview.EmployeeReportMainView', {
  extend: 'Ext.container.Container',
  alias: 'widget.employeereportmainview',
  requires: [
    'DDO.view.employeereportview.EmployeeReportForm',
    'DDO.view.employeereportview.EmployeeReportController',
    'DDO.view.employeereportview.EmployeeReportWin',
    'DDO.view.employeereportview.EmployeeReportGrid',
    'DDO.view.employeereportview.EmployeeReportMainViewModel'
  ],
  viewModel: {
    type: 'employeereportmainviewmodel'
  },
  cls: 'employeereport-cls',
  margin: '0 0 0 0',
  controller: 'employeereportcontroller',
  items: [{
    xtype: 'employeereportform'
  },
    {
      xtype: 'employeereportgrid',
      height: Constants.ViewportHeight*1.632
    }]
});