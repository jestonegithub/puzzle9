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

        display_buffer_line_size:16,

        command_line_handle_id:'',


        //display 'prints' to the console screen and will display the 'packet':{packet_data,type,delay}  - data are line(s) to be displayed, packet_type is single line or multiple, and delay is
        //   how long to wait before printing each line (to create an 'installation animation', for example

        printToScreen: function () {


            var packet = this.model.get('current_packet');
            var display_id = this.console_display_id;
            var buffer_size = this.display_buffer_line_size;
            var current_buffer = this.model.get('display_buffer');
            var this_model = this.model;



            if (packet.packet_type === 'multi'){

                var packet_size = packet.packet_data.length;

                for (i=0;i < packet_size;i++){

                    var counter = i;
                    setTimeout(function(count){

                        if($('.console_display_line').length >= buffer_size){
                            $('.console_display_line').first().remove();
                            current_buffer = current_buffer.splice(1);
                        }
                        $(display_id).append('<p class="console_display_line">'+packet.packet_data[count]+'</p>');
                        current_buffer.push(packet.packet_data[count]);
                        console.log(current_buffer);
                        if (count === packet_size-1){
                            bb.trigger('print_job_complete');
                            this_model.set({'display_buffer':current_buffer});
                        }

                        },i*packet.packet_delay,counter);

                }
            }else{
                $(this.console_display_id).append('<p class="console_display_line">'+packet.packet_data+'</p>');
            }
        },

        printBuffer:function(){

            console.log('filling in buffer');

            var buffer = this.model.get('display_buffer');
            var display_id = this.console_display_id;


            for (i=0;i < buffer.length;i++){
                $(display_id).append('<p class="console_display_line">'+buffer[i]+'</p>');

            }

        },



        changeCommandHandle:function(){

            var new_handle = this.model.get('command_line_handle');
            $(this.command_line_handle_id).text(new_handle);

        }



    });





    return {ConsoleItemView: ConsoleItemView}

});











