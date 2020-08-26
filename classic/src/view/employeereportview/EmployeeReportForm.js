Ext.define('DDO.view.employeereportview.EmployeeReportForm', {
  extend: 'Ext.container.Container',
  alias: 'widget.employeereportform',
  cls: 'employeereportform-cls',
  layout: 'hbox',
  items: [
    {
      xtype: 'textfield',
      emptyText: 'Search Employee',
      cls: 'employeereporttxtfield-cls',
      width: Constants.ViewportWidth*0.367,
      triggers: {
        clear: {
          cls: Ext.baseCSSPrefix + 'fa fa-close',
          hidden: true,
          handler: "onClearIcon"
        },
        search: {
          cls: Ext.baseCSSPrefix + 'fa fa-search'
        }
      },
      listeners: {
        change: "onSearchEmployee",
      }
    },
    {
      xtype: 'button',
      cls: 'employeereportbtn-cls',
      iconCls: 'x-fa fa-angle-down',
      listeners: {
        click: 'onclickbtnemployeereport'
      }
    },
    {
      xtype: 'button',
      text: 'Download',
      cls: 'employeereportdownloadbtn-cls',
      listeners: {
        click: 'onDownloadExcelBtnClick'
      }
    },
    {
      xtype: 'button',
      text: 'ClearFilters',
      cls: 'employeereportdownloadbtn-cls',
      listeners: {
        click: 'onClearFilterBtnClick'
      }
    }
  ]
});