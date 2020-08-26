Ext.define('DDO.view.loginlanding.LoginLanding', {
    extend: 'Ext.container.Container',
    xtype: 'loginlanding',

    requires: [
        'DDO.view.loginlanding.Greeting',
        'DDO.view.loginlanding.LoginHeader',
        'DDO.view.loginlanding.createaccount.CreateAccountWindow'
    ],

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    bind: {
        style: {
            'background': 'url("resources/images/bgs/login_image.jpg") 0 0/cover'
        }
    },
    items: [{
        xtype: 'container',
        cls: 'loginView-cls',
        width: '60%',
        items: [{
            xtype: 'loginheader'
        }, 
        {
            xtype: 'container',
            reference: 'landingContainer',
            margin: '0 0 30 0',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'logingreeting',
                plugins: 'responsive',
                responsiveConfig: {
                    'width <= 810': {
                        visible: false
                    },
                    'width > 810': {
                        visible: true
                    }
                }

            }]

        }, 
        // {
        //    xtype: 'button',
        //     align:'center',
        //     text: 'Create Account',
        //     cls: 'createaccountbtn',
        //     handler: 'onCreateAccount'
           
        // }
    ]
    }],

    initComponent: function() {
        this.updateStatus();
        this.callParent(arguments);
    },

    updateStatus: function() {
        // var store = Ext.getStore('quotestore');
        // if (store) {
        //     store.on('load', this.statusPerTime, this);
        // }
    },

    statusPerTime: function(store, data) {
        var array = data,
            currentTime = Ext.Date.format(new Date(), 'H'),
            i = Math.floor(Math.random() * array.length),
            viewModel = this.getViewModel(),
            bgImage;
        currentTime = parseInt(currentTime);

        switch (true) {

            case (currentTime >= 12 && currentTime < 18):
                bgImage = array[i].data.bgimgurl;
                break;
            case (currentTime >= 18 && currentTime < 21):
                bgImage = array[i].data.bgimgurl;
                break;
            case (currentTime >= 21 && currentTime < 24):
                bgImage = array[i].data.bgimgurl;
                break;
            case (currentTime >= 0 && currentTime < 3):
                bgImage = array[i].data.bgimgurl;
                break;
            case (currentTime >= 3 && currentTime < 6):
                bgImage = array[i].data.bgimgurl;
                break;
            case (currentTime >= 6 && currentTime < 9):
            default:
                bgImage = array[i].data.bgimgurl;

        }

        viewModel.set('bgImage', bgImage);
    }
});
