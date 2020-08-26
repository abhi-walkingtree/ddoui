 /**
 * This is controller for view 'DDO.view.profile.sendresignation.SendResignationWindow'.
 * @extends 'Ext.app.ViewController'
 * @alias 'controller.resignationwindowcontroller'
 */
Ext.define('DDO.view.profile.sendresignation.SendResignationWindowController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.resignationwindowcontroller',

  /**
   * Handler resoposible for processing resignation procedures.
   */
  Onresignationok: function() {
    try {
      var resignform = this.getView().down('textarea[name=reason]')
    resignform_content = resignform.getValue();
    var empId = this.getView().up('userprofile').getViewModel().getData().profiledata.about.ddo_employee_id
    var scope = this;
    Ext.Msg.confirm(
      'Confirm',
      'Do you want to continue?',
      function(btnId) {
        if (btnId === 'yes') {
          scope.getView().mask("");
          scope.postAjaxRequest(scope,resignform_content,empId);
        } else {
        }
      });
    } catch (err) {
        Utility.showToast(Messages.PROFILE.RESIGNOK, err);
    }
  },
  /**
   * The function postAjaxRequest is responsible to send the api call for sending the resignation.
   * @param {controller} 'scope' which is the current controller scope. 
   * @param {string} 'resignform_content' the content which is written in the resignation form. 
   * @param {number} 'empId' the employee_id number. 
   */
  postAjaxRequest:function(scope,resignform_content,empId){
    Ext.Ajax.request({
      scope: scope,
      url: '/employeeexitrequest',
      method: 'POST',
      params: {
        reason: resignform_content,
        empid: empId
      },
      success: function(batch, opt) {
        scope.getView().unmask("");
        scope.getView().close();
        if (batch.responseText) {
          var jsonData = batch.responseText
          Ext.Msg.alert('Success', 'Successfully Sent Resignation');
        }
      }
    })
  },
  /**
   * Handler responsible for cancelling resign process
   */
  Onresignationcancel: function() {
    var win = this.getView();
    win.close();
  }
});