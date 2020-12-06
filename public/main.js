var data_to_rasp = {
  "tarX": -1,
  "tarY": -1,
  "mode": "",
  "lift": false,
  "emergency_stop": false,
  "translation_P_gain": 15.0 * 127.0/2500.0,
  "translation_D_gain": 2.0,
  "yaw_P_gain": -10.0,
  "yaw_D_gain": -4.0,
  "command": "",
  "arg1": 0,
  "arg2": 0
};

function sendValues()
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/update-cmd", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data_to_rasp));
}


/***** SLIDERS *****/
// get slider reference from DOM
var arg1_slider = document.getElementById("arg1_slider");
var arg1_label = document.getElementById("arg1_label");

// initialize slider
arg1_slider.min = -1000;
arg1_slider.max = 1000;
arg1_slider.value = 0;
var arg1_prefix = "arg1: ";
arg1_label.innerHTML = arg1_prefix + arg1_slider.value;

// slider functionality
arg1_slider.oninput = function() {
    data_to_rasp["arg1"] = Number(this.value);
    arg1_label.innerHTML = arg1_prefix + data_to_rasp["arg1"];
    sendValues();
}

// get slider reference from DOM
var arg2_slider = document.getElementById("arg2_slider");
var arg2_label = document.getElementById("arg2_label");

// initialize slider
arg2_slider.min = -1000;
arg2_slider.max = 1000;
arg2_slider.value = 0;
var arg2_prefix = "arg2: ";
arg2_label.innerHTML = arg2_prefix + arg2_slider.value;

// slider functionality
arg2_slider.oninput = function() {
    data_to_rasp["arg2"] = Number(this.value);
    arg2_label.innerHTML = arg2_prefix + data_to_rasp["arg2"];
    sendValues();
}
/*********************/

/***** CHECKBOXES *****/
// get references from DOM
var lift_box = document.getElementById("lift");
var emergency_stop_box = document.getElementById("emergency_stop");

// initialize boxes
lift_box.checked = false;
emergency_stop_box.checked = false;

lift_box.onchange = function ()
{
    data_to_rasp["lift"] = lift_box.checked; 
    sendValues();
}

emergency_stop_box.onchange = function ()
{
    data_to_rasp["emergency_stop"] = emergency_stop_box.checked; 
    sendValues();
}

/***** BUTTONS *****/
var move_rel_btn = document.getElementById("move_rel_btn");
var move_abs_btn = document.getElementById("move_abs_btn");
var rotate_rel_btn = document.getElementById("rotate_rel_btn");
var rotate_abs_btn = document.getElementById("rotate_abs_btn");
var nop_btn = document.getElementById("nop_btn");

move_rel_btn.onclick = function ()
{
    data_to_rasp["command"] = "move_rel"
    console.log("move_rel")
    sendValues();
}

move_abs_btn.onclick = function ()
{
    data_to_rasp["command"] = "move_abs"
    sendValues();
}

rotate_rel_btn.onclick = function ()
{
    data_to_rasp["command"] = "rotate_rel"
    sendValues();
}

rotate_abs_btn.onclick = function ()
{
    data_to_rasp["command"] = "rotate_abs"
    sendValues();
}

rotate_abs_btn.onclick = function ()
{
    data_to_rasp["command"] = "nop"
    sendValues();
}
