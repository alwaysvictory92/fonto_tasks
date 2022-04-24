

const xhr = new XMLHttpRequest();
xhr.responseType = 'json';

const base_url = "https://take-home.hasura.app/api/rest";

window.onload = function() {
        get_data();
};

function get_data() {
    document.getElementById("property_table_body").innerHTML = "";
    document.getElementById("loading").style.display = "block";

    xhr.open('GET', base_url + '/properties/all', true);
    xhr.setRequestHeader("content-type", "json/application");
    xhr.setRequestHeader("x-hasura-user-id", "ASy22JCTOKbqrsF");
    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) { 
            model_set_mode(3);
            open_property_modal();
        } else { 
            console.log("returned values");
            properties = xhr.response.properties; //for easier writing. 
            
            properties.sort(function (a, b) {
                return a.id - b.id;
            });
            
            var total = 0;
           // console.log(properties);
            for (obj in properties) {
                if(!properties[obj].hidden) {
                    add_property_to_table(properties[obj].id, properties[obj].address, properties[obj].valuation);
                    total += properties[obj].valuation;
                }

            }
            document.getElementById("total_valuation").innerHTML += total.toLocaleString("en-US");
            document.getElementById("loading").style.display = "none";
        }
    };

}

function add_property_to_table(id, address, value) {
    table_div = document.getElementById("property_table_body").innerHTML += `
    <div class="table_row">
        <div class="table_data"><label>` + id + `</label></div>
        <div class="table_data"><label>`+ address +`</label></div>
        <div class="table_data"><label>$` + value.toLocaleString("en-US") +`</label></div>
    </div>`;
}


xhr.onerror = function() {
    model_set_mode(3);
    open_property_modal();
};

function add_property_to_api() { 

    
    console.log("here i am");
    var form_data = new FormData(document.querySelector('form'));
    form_data = {
        'address' : form_data.get("address"),
        'valuation' : form_data.get("addr_value")
    };
    isValid = true;
    console.log(form_data);
    if(form_data.address == "") {
        document.getElementById("address").setAttribute("class", "error"); 
        isValid=false;
    }

    if(form_data.valuation <= 0) {
        document.getElementById("addr_value").setAttribute("class", "error"); 
        isValid=false;
    }

    if(!isValid) {
        console.log("error form data is not valid");
        return;
    }


    xhr.open('POST', base_url + '/properties/add', true);
    xhr.setRequestHeader("content-type", "json/application");
    xhr.setRequestHeader("x-hasura-user-id", "ASy22JCTOKbqrsF");

    xhr.onload = function() {
        if (xhr.status != 200) { 
            model_set_mode(3); 
        } else { 
            console.log("i am now here");
            console.log(xhr.response.add_property["id"]);
            model_set_mode(2)
            document.getElementById("property_id").innerHTML = xhr.response.add_property["id"];
            get_data();
        }
    };

    xhr.send(JSON.stringify(form_data));
}

function open_property_modal() {
    document.getElementById("property_modal").style.display = "block";
}
function close_property_modal() {
    document.getElementById("property_modal").style.display = "none";
    document.getElementById("property_form").reset();
    document.getElementById("address").setAttribute("class", "");
    document.getElementById("addr_value").setAttribute("class", "");
    model_set_mode(1);
}

function model_set_mode(id) {
    switch(id) {
        case 1: 
            //main modal 
            document.getElementById("modal_body_form").style.display = "block";
            document.getElementById("modal_body_success").style.display ="none";
            document.getElementById("modal_body_error").style.display ="none";
            change_btn("Add Property", "open_property_modal()");
            break;

        case 2:
            document.getElementById("modal_body_success").style.display ="block";
            document.getElementById("modal_body_error").style.display ="none";
            document.getElementById("modal_body_form").style.display = "none";
            change_btn("Close", "close_property_modal()");
            break;
        
        case 3: 
            document.getElementById("modal_body_error").style.display ="block";
            document.getElementById("modal_body_success").style.display ="none";
            document.getElementById("modal_body_form").style.display = "none";
            change_btn("Close", "close_property_modal()");
            break;
    }
}

function change_btn (text, func) {
    btn = document.getElementById("add_property_btn");
    btn.setAttribute("onClick", func);
    btn.innerHTML = text;
}