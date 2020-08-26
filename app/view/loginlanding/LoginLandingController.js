// this is extended by the login and forgot password viewcontrollers
Ext.define('DDO.view.loginlanding.LoginLandingController', {
    extend: 'Ext.app.ViewController',

    onCreateAccount: function(btn, e, opts) {
        var CreateAccountWindow = Ext.ComponentQuery.query('createaccountwindow')[0] 
            || Ext.create('DDO.view.loginlanding.createaccount.CreateAccountWindow'),
            form = CreateAccountWindow.down('form'),
            refs, cityComboRef, stateComboRef,
            tickIconRef ,errContent, designationRef,
            phTickIconRef, existNumber,
            errEmailContent, emailTickIconRef,
            designationComboRef;

        form.reset();

        refs = CreateAccountWindow.getReferences();

        errContent = refs.errcontent;
        tickIconRef = refs.tickIcon;

        phTickIconRef = refs.phTickIcon;
        existNumber = refs.existNumber;

        errEmailContent = refs.existEmail;
        emailTickIconRef = refs.emailTickIcon;
        
        designationRef = refs.otherDesignationRef;
        designationComboRef = refs.designationComboRef;
        
        errContent.hide();
        tickIconRef.hide();

        existNumber.hide();
        phTickIconRef.hide();

        errEmailContent.hide();
        emailTickIconRef.hide();

        designationRef.hide();

        designationComboRef.setWidth('100%');

        CreateAccountWindow.show();
    }
});