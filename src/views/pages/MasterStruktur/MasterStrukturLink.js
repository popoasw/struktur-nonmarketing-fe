// Link dummy for testing using JSON - Server

// base url
const base_url = "http://localhost:8080/struktur-non-mkt";

// Endpoint
const get_department = base_url + "/master/department";
const get_position = base_url + "/master/position";
const get_positionAds = base_url + "/master/jabatan-iklan";


let urlLevel = "";
function get_struktur(level){
    switch(level){
        case "NSM":
            urlLevel = "/nsm/struktur";
            break;
        case "Region":
            urlLevel = "/sm/struktur";
            break;
        case "Area":
            urlLevel = "/asm/struktur";
            break;
        case "SubArea":
            urlLevel = "/spv/struktur";
            break;
        default: // 'GT'
            urlLevel = "/mr/struktur";
    }
    return base_url + urlLevel;
}

export { get_department, get_position, get_positionAds, get_struktur};

