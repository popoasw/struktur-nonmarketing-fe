// Link dummy for testing using JSON - Server

// base url
const base_url = "http://localhost:8080/struktur-non-mkt";

// Endpoint
const get_departments = base_url + "/master/departments";
const get_employee = base_url + "/master/karyawan";
const get_position = base_url + "/master/position";
const get_positionAds = base_url + "/master/jabatan-iklan";
const get_city = base_url + "/master/city";
const get_branch = base_url + "/master/branch";


let urlLevel = "";
function get_struktur(level){
    switch(level){
        case 0: //NSM
            urlLevel = "/nsm/struktur";
            break;
        case 1: //Region
            urlLevel = "/sm/struktur";
            break;
        case 2: //Area
            urlLevel = "/asm/struktur";
            break;
        case 3: //SubArea
            urlLevel = "/spv/struktur";
            break;
        default: //GT
            urlLevel = "/mr/struktur";
    }
    return base_url + urlLevel;
}

export { get_departments, get_position, get_positionAds, get_struktur,
         get_employee, get_city, get_branch};

