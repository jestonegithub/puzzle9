/**
 * Created by jessestone on 12/9/15.
 */



define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    //var term_tmpl = require('hbs!app/templates/terminalView');


    var ConsoleItemView = mn.ItemView.extend({


        input_form_id: '',

        console_display_id:'',


        //display 'prints' to the console screen and will display the 'packet':{packet_data,type,delay}  - data are line(s) to be displayed, packet_type is single line or multiple, and delay is
//   how long to wait before printing each line (to create an 'installation animation', for example

        printToScreen: function () {


            var packet = this.model.get('current_packet');
            var display_id = this.console_display_id;


            if (packet.packet_type === 'multi'){

                var packet_size = packet.packet_data.length;

                for (i=0;i < packet_size;i++){

                    var counter = i;
                    setTimeout(function(count){

                    $(display_id).append('<p>'+packet.packet_data[count]+'</p>');
                    if (count=== packet_size-1){bb.trigger('wallet_install_display_complete')}

                    },i*packet.packet_delay,counter);

                }
            }else{
                $(this.console_display_id).append('<p>'+packet.packet_data+'</p>');
            }
        }



    });


    return {ConsoleItemView: ConsoleItemView}

});











