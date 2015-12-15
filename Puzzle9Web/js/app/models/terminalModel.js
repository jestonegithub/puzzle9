/**
 * Created by jessebstone on 12/1/15.
 */



define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var _ = require('underscore');
    var cm = require('./consoleModel');



    var password_tries = 3;
    // TERMINAL MODEL
    var TerminalModel = cm.ConsoleModel.extend({


        defaults:{

            my_region:"#activity", //may or may not be useful for terminal to know where in OS layout it is (what region)
            current_command:'',
            current_packet:{},
            display_buffer:['Testing Buffer...'],
            admin_pass:'1234',
            command_line_handle:'',
            user_handle:'user137$',
            open:false,
            installed:true



        },

        initialize:function(){

            this.on('change:current_command', this.onNewCommand,this);

        },


        install_list:{

          wallet:false

        },


        onNewCommand:function(){

            var input = this.get('current_command');

            //call appropriate action function using dict.
            if (this.action[input] != undefined) {
                _.bind(this.action[input],this)();
            }else{
                console.log('command not found')
            }


        },

        passwordRoutine: function () {

            console.log('here too');

            //change handle on command line from user to 'passwrd:' and give instructions to enter password
            this.set({'command_line_handle' : 'passwrd:'});
            this.set({'current_packet': install_packets.password_entry});
            bb.trigger('freeze_controls');

            var passwd_attempts = 0;
            var admin_pass = this.get('admin_pass');
            var user_handle = this.get('user_handle');


            var password_check = function () {

                    console.log(this.get('current_command'));

                if (this.get('current_command') === admin_pass) {

                    console.log('hooray');

                        //this.off('change:current_command');
                        this.set({'command_line_handle' : user_handle});

                        bb.trigger('wallet_password_correct');
                    } else {

                    console.log('blah');
                        passwd_attempts += 1;
                        console.log('attempts:'+passwd_attempts);
                        this.set({'current_packet' : {packet_data: 'Incorrect password.  Try again.'}});
                        if (passwd_attempts === 3) {
                            console.log('loser');
                            this.off('change:current_command');
                            this.on('change:current_command', this.onNewCommand,this);
                            this.set({'command_line_handle' : user_handle});
                            bb.trigger('unfreeze_controls');
                        }
                    }
                };



            //turn off event listening for general terminal commands
            this.off('change:current_command', this.onNewCommand);

            //turn on event listening for implicitly defined password function
            this.on('change:current_command', _.bind(password_check,this));

        },


        wallet_installation :function () {


            //this is the actual installation file
            var install = function () {

                console.log('wallet has been installed...or has it?')
                bb.trigger('unfreeze_controls');

            };

            this.off('change:current_command'); //remove listener being used by password routine (really removes ANY listeners on change:current_command
            this.on('change:current_command', this.onNewCommand, this);  //turn back on for general terminal commands


            console.log('installing wallet animation');
            bb.once('print_job_complete', _.bind(install, this));
            this.set({'current_packet': install_packets.wallet});

            this.install_list.wallet = true;

        },


        action : {


            "mine": function () {
                console.log('starting mining process...');
                this.set({'current_packet':install_packets.mine_local_startup});
                bb.trigger('starting_local_mining');



            },

            //'sudo apt-get install _____'
            "bit": function () {

                //- check that action hasn't already been done...
                if (this.install_list.wallet === false) {

                    bb.on('wallet_password_correct', _.bind(this.wallet_installation, this));

                    _.bind(this.passwordRoutine,this)();
                }
                else{console.log('already installed')}
            }

        }
    });


    var install_packets={


        wallet:{
            packet_data:['Opening connection with https://www.coinlab.com/cl-host',
                'Downloading cl-wallet_pkg...',
                'Creating installation directories...',
                'Installing software...',
                'Updating file permissions...',
                'Installation of cl-wallet is complete...',
                'Installation of cl-trPLTFRM is complete...',
                'Installation of cl-dcoinProtocolAPI is complete...',
                'Installation of cl-localDB is complete...',
                'Configuring cl-wallet...',
                'Configuring AD FS configuration of cl-localDB...',
                'Retrieving local dtc-configfile...',
                'Installation complete...',
                'Cleaning up files...',
                '...',
                '...',
                '...',
                '...'
            ],
            packet_type:'multi',
            packet_delay:500
        },

        password_entry:{
            packet_data:['__________________________________________________________',
                         '|',
                         '|CRYPTONITE PASSWORD MANAGER',
                         '|_________________________________________________________',
                         '[S Y S T E M  M S G  I D : 0 1 9 4 8 1 7 4  2 3 4 7 9 2]',
                         'This action requires administrator privileges.',
                         'Enter your password (3 attempts)',
                         '__________________________________________________________',
                         '*********************************',
                         '*****************************',
                         '**********************',
                         '****************',
                         '**********',
                         '*******',
                         '****',
                         '*'
            ],
            packet_type:'multi',
            packet_delay:100
        },

        mine_local_startup:{

            packet_data:['Starting Cryptominer thread...',
                         'Obtaining cryptocurrency type...',
                         'Connecting to local_walletAPI...',
                         'Now mining coins'
            ],
            packet_type:'multi',
            packet_delay:400
        }


    };




    return {TerminalModel:TerminalModel}





});