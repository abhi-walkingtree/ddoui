/**
 * The file MOMProject is the view file of the container which contains search field and create mom button.
 * @extends {Ext.container.Container}.
 * @alias 'widget.momproject'
 * ViewModel : 'DDO.view.projects.MOMViewModel'.
 * ViewController : 'DDO.view.projects.MOMCmpViewController'.
 */
Ext.define('DDO.view.projects.MOMProject', {
	extend: 'Ext.container.Container',

	alias: 'widget.momproject',

	requires: [
		'DDO.view.projects.MOMCreateWindow'
	],

	itemId: 'mom',

	layout: {
		type: 'hbox',
		align: 'center'
	},

	cls: 'notes-toolbar-cls',

	margin: '0 20 0 10',

	defaults: {
		margin: 5
	},

	items: [{
		xtype: 'textfield',
		reference: 'searchname',
		emptyText: LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.EMPTYTEXT,
		cls: 'ddo-mom-detail-search-text',
		name: 'taskname',
		enforceMaxLength: true,
		height: 30,
		width: Constants.ViewportWidth*0.2,
		margin: 15,
		enableKeyEvents: true,
		listeners: {
            keyup: 'onSearchText'
        }
	}, {
		xtype: 'button',
		width: 10,
		height: 10,
		cls: 'search-icon-field'
	}, {
		xtype: 'tbfill'
	},{
		xtype: 'button',
		cls: 'notes-create-btn-cls',
		width: Constants.ViewportWidth*0.096,
		height: 40,
		handler: 'onMOMActionItems',
		text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.ACTIONITEM,
	}, {
		xtype: 'button',
		cls: 'notes-create-btn-cls',
		width: Constants.ViewportWidth*0.096,
		height: 40,
		text:  LabelsTitles.EXECUTIVEDASHBOARD.PROJECT.MOM.CREATE,
		listeners: {
			click: 'onMOMCreateBtnClick'
		}
	}]
});