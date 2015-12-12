/**
 * Created by jessestone on 12/6/15.
 */

define(function (require) {
    var mn = require('marionette');
    var term_tmpl = require('hbs!app/templates/terminalView');
    var cmv = require('./consoleItemView');


    var TerminalItemView = cmv.ConsoleItemView.extend({

        initialize:function(){

            //set input and display IDs for TERMINAL
            this.input_form_id='#user_input';
            this.console_display_id='#terminal_display';
            this.command_line_handle_id = '#command_line_user';

            var form_id = this.input_form_id;
            var this_model = this.model;

            // the view is first created and THEN appended to DOM by region, so have to wait for 'show' event to fire before attaching these various handlers, etc.
            this.on('show',function() {

                this.printBuffer();

                //hiding the submit button - only want ENTER to be the way to submit commands (what console has a 'submit' button?!)
                $("#console_submit").hide();

                //start with focus on input box as soon as view appears
                //noinspection JSJQueryEfficiency
                if ($('#terminal_div').is(":visible")){
                    $('#user_input').focus();
                }
                //anytime a user clicks anywhere on terminal the focus stays in the input box (nothing to 'do' outside of the input box)
                //noinspection JSJQueryEfficiency
                $('#terminal_div').click(function(){$('#user_input').focus();});

                //sets the models 'current_command' value to any submitted text & clears the text box
                $("#form_command").submit(function (e) {
                    e.preventDefault();
                    var command = $(form_id).val();
                    this_model.set({current_command: command});
                    $(form_id).val('');
                });
            });
        },



        template: term_tmpl,

        className:"terminal",

        modelEvents: {

            'change:current_packet':'printToScreen',
            'change:command_line_handle':'changeCommandHandle'

        }

    });


    return {TerminalItemView:TerminalItemView}

});