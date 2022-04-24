
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';

const base_url = "https://take-home.hasura.app/api/rest";

window.onload = function() {
        get_data();
};

function get_data() {
    xhr.open('GET', base_url + '/properties/all', true);
    xhr.setRequestHeader("content-type", "json/application");
    xhr.setRequestHeader("x-hasura-user-id", "ASy22JCTOKbqrsF");
    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
            properties = xhr.response.properties; //for easier writing. 
            var total = 0;
            var num = 1;
            for (obj in properties) {
                if(!properties[obj].hidden) {
                    add_property_to_table(num++, properties[obj].address, properties[obj].valuation);
                    total += properties[obj].valuation;
                }

            }
            document.getElementById("total_valuation").innerHTML += total.toLocaleString("en-US");
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
alert("Request failed");
};



function open_property_modal() {
document.getElementById("property_modal").style.display = "block";
}
function close_property_modal() {
document.getElementById("property_modal").style.display = "none";
document.getElementById("property_form").reset();
}




