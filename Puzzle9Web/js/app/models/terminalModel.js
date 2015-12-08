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
            current_command:""

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
                this.action[input]();
            }else{
                console.log('command not found')
            }


        },


        action :{


                "test":function(){console.log('yay!')},

            //'sudo apt-get install _____'
                "bit":function(){
                    //- check that action hasn't already been done...
                    if (this.install_list.wallet === false){return}
                    console.log('installing wallet');




                    this.install_list.wallet = true;

                }
            }


    });





    return {TerminalModel:TerminalModel}





});