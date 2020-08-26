/**
 * The file MOMActionItemsController is the ViewController for DDO.view.projects.MOMActionItems.
 * @extends {Ext.app.ViewController}
 * @alias 'controller.momActionItemsController'
 */
Ext.define('DDO.view.projects.MOMActionItemsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.momActionItemsController',

    onFollowUp: function(){
        try{
           var me = this;
           var grid = me.getReferences().actionItemsGridRef;
           var selectedItems = grid.getSelection();
           var followUpItems = [];
        //    var url = Api.URL.followUpItems.UPDATE;
            for(var index in selectedItems){
                var data = selectedItems[index].data;
                var obj = {};
                obj.empId = data.task_owner;
                obj.empName = data.empname;
                obj.momId = data.momid;
                obj.momAgenda = data.mom;
                obj.task = data.task;
                obj.taskId = data.ddo_task_id;
                obj.startDate = data.task_start_date;
                obj.endDate = data.task_end_date;
                obj.email = data.email;
                obj.projectName = data.projectname;
                followUpItems.push(obj);
            }
            // console.log(followUpItems);
            me.getView().mask('loading...');
            Ext.Ajax.request({
                url: Api.URL.followUpActionItems.UPDATE,
                method: 'PUT',
                // params: Ext.JSON.encode(followUpItems),
                jsonData: Ext.JSON.encode(followUpItems),
                success:  function(){
                    me.getView().unmask();
                    Ext.Msg.alert("Success", "Followup Mail has been Sent Succcessfully!");
                    // console.log("Sucess!!")
                },
                failure: function(){
                    me.getView().unmask();
                    Ext.Msg.alert("Failure", "Something Went Wrong on sending Followup Mail!");
                    // console.log("Failure!!")
                }
            })
            }catch(err){
                Utility.showToast(Messages.EXECUTIVEDASHBOARD.MOM.CREATEWINDOW, err);
            }
    },
    onMomSearchText:function(view,searchValue,eOpts){
   var actionItemsStore = this.getViewModel().getStore('momActionItemsStore');
             var momAgenda,empName,status;
              searchString = searchValue.toLowerCase();
              if(searchString){
                  actionItemsStore.clearFilter(true);
                  actionItemsStore.filter(function(record){
                      if(record.data.empname.toLowerCase().includes(searchString.toLowerCase())){
                          return true;
                      } else if(record.data.mom !=null || record.data.iscompleted !=null){
                          if((record.data.mom.toLowerCase().search(new RegExp(searchString.toLowerCase(), 'gi')) == 0)){
                              return true;
                          }
                           else if((record.data.iscompleted.toLowerCase().search(new RegExp(searchString.toLowerCase(), 'gi')) == 0)){
                                return true;
                            }else{
                                return false;
                            }
                      }
                        else{
                              return false;
                          }
                    },this);
                }else if(searchString.length == 0){
                    actionItemsStore.clearFilter(true);
                    actionItemsStore.reload();
                  }
    },

    onDownloadExcelBtnClick:function(btn,event,eOtps){
        event.stopEvent();
        var grid = btn.up('window').down('grid');
        var momActionItemswindow = btn.up('window');
        var sheetName = 'MOMActionItems';
            var xml = grid.getPlugin('exporter').getDocumentData({
                title: "MOMActionItems",
            })
        var blob = new Blob([xml], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, sheetName+'.xls');
    },
    onColumnApplyClick:function(btn,event,eOtps){
        // debugger;
        var checkboxGroup=btn.up('momActionItems').down('checkboxgroup');
           var menu = btn.up('momActionItems').down('menu');
           menu.hide();
           checkboxGroup.items.items.map(function (item) {
			if (item.value === false) {
				btn.up('momActionItems').down('grid').getColumns()[item.inputValue].setHidden(true);
			} else {
				btn.up('momActionItems').down('grid').getColumns()[item.inputValue].setHidden(false);
			}
		});
    }

});