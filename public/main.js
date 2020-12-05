var data_to_rasp = {
  "tarX": -1,
  "tarY": -1,
  "mode": "",
  "lift_land": false,
  "emergency_stop": false,
  "translation_P_gain": 0,
  "translation_D_gain": 0,
  "yaw_P_gain": 0,
  "yaw_D_gain": 0,
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


/***** DISTANCE SLIDER *****/
// get slider reference from DOM
var distance_slider = document.getElementById("distance-slider");
var distance_label = document.getElementById("distance-label");

// initialize slider
distance_slider.min = 100;
distance_slider.max = 300;
distance_slider.value = 100;
var distance_prefix = "Distance: ";
distance_label.innerHTML = distance_prefix + distance_slider.value/100;

// slider functionality
distance_slider.oninput = function() {
    data_to_rasp["arg1"] = Number(this.value / 100);
    distance_label.innerHTML = distance_prefix + data_to_rasp["arg1"];
    sendValues();
}
/*********************/

/***** CHECKBOXES *****/
// get references from DOM
var lift_box = document.getElementById("lift");

// initialize boxes
lift_box.checked = false;

lift_box.onchange = function ()
{
    data_to_rasp["lift_land"] = lift_box.checked;
    sendValues();
}

/***** BUTTONS *****/
var forward_btn = document.getElementById("forward-btn");
var backward_btn = document.getElementById("backward-btn");
var left_btn = document.getElementById("left-btn");
var right_btn = document.getElementById("right-btn");

forward_btn.onclick = function ()
{
    data_to_rasp["command"] = "forward"
    sendValues();
}

backward_btn.onclick = function ()
{
    data_to_rasp["command"] = "backward"
    sendValues();
}

left_btn.onclick = function ()
{
    data_to_rasp["command"] = "left"
    sendValues();
}

right_btn.onclick = function ()
{
    data_to_rasp["command"] = "right"
    sendValues();
}
