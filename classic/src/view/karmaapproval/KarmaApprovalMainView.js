Ext.define('DDO.view.karmaapproval.KarmaApprovalMainView', {
    extend: 'Ext.container.Container',
    alias: 'widget.karmaapprovalmainview',
    requires: [
        'DDO.view.karmaapproval.KarmaApproval'
    ],
    //scrollable:true,
    //layout:'fit',
   // width:200,
    items:[
      {
      xtype:"button",
      iconCls: "x-fa fa-refresh",
      handler: function(){
       var store= this.up('karmaapprovalmainview').down('karmaapproval').getStore();
       store.reload();
      },
      cls:'refresbuttn-cls',
     width: '5%',
      height: '5%',
    // margin: '0px 0px 0px 20px',
      tooltip : 'Refresh Button'
    },{
      xtype:'karmaapproval',
       height:390
    }]
})