/**
 * Created by jessebstone on 12/1/15.
 */



define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var _ = require('underscore');
    var cm = require('./consoleModel');



    // TERMINAL MODEL
    var TerminalModel = cm.ConsoleModel.extend({


        defaults:{

            my_region:"#activity", //may or may not be useful for terminal to know where in OS layout it is (what region)
            current_command:"",
            current_packet:{}

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


        action :{


                "test":function(){console.log('yay!')},

            //'sudo apt-get install _____'
                "bit":function(){

                    //this is the actual installation file
                    var install=function(){

                        console.log('wallet has been installed...or has it?')

                    };


                    this.set({'current_packet':install_packets.wallet});

                    //- check that action hasn't already been done...
                    if (this.install_list.wallet === false){
                        console.log('installing wallet');

                        bb.on('wallet_install_display_complete', _.bind(install,this));

                        this.trigger('installing_wallet');
                    }
                    else{return}
                    this.install_list.wallet = true;
                }
            }
    });


    var install_packets={


        wallet:{
            packet_data:['testing this print stuff out...',
                'testing this print stuff out more...',
                '...and more'],
            packet_type:'multi',
            packet_delay:1000
        }


    };




    return {TerminalModel:TerminalModel}





});