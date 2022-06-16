// Link dummy for testing using JSON - Server

// base url
const base_url = "http://localhost:8080/struktur-non-mkt";

// Endpoint
const get_department = base_url + "/master/department";
const get_position = base_url + "/master/position";


let urlLevel = "";
function get_struktur(level){
    switch(level){
        case "NSM":
            urlLevel = "";
            break;
        case "Region":
            urlLevel = "";
            break;
        case "Area":
            urlLevel = "";
            break;
        case "SubArea":
            urlLevel = "";
            break;
        default: // 'GT'
            urlLevel = "/struktur/groupteri";
    }
    return base_url + urlLevel;
}

export { get_department, get_position, get_struktur};

