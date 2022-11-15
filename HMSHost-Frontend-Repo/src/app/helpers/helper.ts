
export const dropDownMasterTables = ['Global Region Master', 'Global State Master', 'Global City Master', 'Global Zip Code Master', 'HMSHost Business Unit', 'HMSHost Store Master', 'HMSHost Airport Location Table', 'HMSHost Micro Location Master', 'HMSHost Department Master', 'HMSHost Family Group Master', 'HMSHost Product Group Master', 'HMSHost Menu Group1', 'HMSHost Menu Group2', 'HMSHost Quality Group', 'HMSHost POS Menu Sub-Category', 'HMSHost  Standardized Menu Category Master', 'HMSHost Menu Item Master', 'HMSHost POS Menu Item Master', 'Comp Store Menu Name Master', 'Comp Store Standardized Menu Category'];

export const dropDowns = ['Country Name', 'Region Name', 'State Name', 'City Name', 'Revenue Type Value', 'Business Unit Name', 'Concept Name', 'Def Sequence Value', 'Rounding Value', 'Micro Location Value', 'Zip Code Value', 'Store Name', 'Major Group Name', 'Family Group Name', 'Product Group ID Name', 'Menu Group1 Name', 'Menu Group2 Name', 'POS Category Name', 'Price Level Value', 'Price Number Value', 'HMSHost Def Sequence Value', 'HMSHost Store Name', 'Comp Store Restaurant Name', 'Comp Store Section Name'];

export const dropDownExceptions = [
    { field: 'City_Name', endPoint: 'cities' },
    { field: 'State_Name', endPoint: 'states' },
    { field: 'Region_Name', endPoint: 'regions' },
    { field: 'Store_Name', endPoint: 'storemasters' },
    { field: 'Zip_Code_Value', endPoint: 'zipcodes' },
    { field: 'Business_Unit_Name', endPoint: 'businessunit' },
    { field: 'Menu_Group1_Name', endPoint: 'menu1groupmasters' },
    { field: 'Menu_Group2_Name', endPoint: 'menu2groupmasters' },
];

export const getEndPointNamesForDropDowns = [
    // should consider dropDownExceptions also
    { field: 'Country_Name', endPoint: 'countries' },
    { field: 'Rounding_Value', endPoint: 'roundingmasters' },
    { field: 'Revenue_Type_Value', endPoint: 'revenuetypemasters' },
    { field: 'Concept_Name', endPoint: 'conceptmasters' },
    { field: 'Def_Sequence_Value', endPoint: 'defseqmasters' },
    { field: 'Micro_Location_Value', endPoint: 'microLocations' },
    { field: 'Major_Group_Name', endPoint: 'majorgroupmasters' },
    { field: 'Family_Group_Name', endPoint: 'familygroupmasters' },
    { field: 'Product_Group_ID_Name', endPoint: 'productgroupmasters' },
    { field: 'POS_Category_Name', endPoint: 'posmenusubcategories' },
    { field: 'Price_Level_Value', endPoint: 'pricelevelmasters' },
    { field: 'Price_Number_Value', endPoint: 'pricenumbermasters' },
    { field: 'Comp_Store_Restaurant_Name', endPoint: 'compstandardizedmenucategorymaster' },
    { field: 'Comp_Store_Section_Name', endPoint: 'storemenunamemaster' },
];

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const replaceUnderScore = (value) => value.replace(/_/g, ' ');

export const filterMasterTable = (tableName) => dropDownMasterTables.includes(tableName) ? true : false;

export const setInputType = (val) => {
    let res;

    dropDownExceptions.forEach((ele) => {
        if (!dropDowns.includes(val)) {
            res = 'input';
        } else if (val !== replaceUnderScore(ele.field)) {
            res = 'dropdown';
        }
    });

    return res;
};


export function setBreadCrumbs(path) {
    const urls = path.split('/');
    const breadcrumbs = [];

    urls.forEach(url => {
        if (url) {

            const modifyLabel = val => {
                let finalRoute;

                if (val === 'Home') {
                    finalRoute = 'Dashboard'
                } else if (val === 'Master') {
                    finalRoute = 'Manage Data'
                } else if (val === 'Transaction-data-master') {
                    finalRoute = 'Transaction Data'
                } else {
                    finalRoute = val;
                }

                return finalRoute;
            };

            breadcrumbs.push({
                label: modifyLabel(capitalizeFirstLetter(url)),
                route: url
            });
        }
    });

    return breadcrumbs;
}

export function checkDropDownExceptions(res, urlValue, mode) {
    if (res) {
        res.map((ele, i) => {
            dropDownExceptions.find(exec => {
                if (exec.endPoint === urlValue && ele.label === exec.field && mode === 'create') {
                    res[i].type = 'input';
                } else if (exec.endPoint === urlValue && ele.key === exec.field && ele.editable === true && mode !== 'create') {
                    res[i].type = 'input';
                }
            });
        });
    }
}

export function setDropDownInputValues(masterTableName, selectedKeys, urlValue, mode) {
    const res = [];

    if (mode === 'create') {
        selectedKeys.map(key => {
            res.push({
                label: key,
                type: filterMasterTable(masterTableName.trim()) ? setInputType(replaceUnderScore(key)) : 'input'
            });
        });
    } else {
        selectedKeys.map(ele => {
            res.push({
                key: ele.key,
                editable: ele.editable,
                type: filterMasterTable(masterTableName.trim()) ? setInputType(replaceUnderScore(ele.key)) : 'input'
            });
        });
    }

    checkDropDownExceptions(res, urlValue, mode);
    return res;
}

export function getDropDownEndPoint(labelName) {
    const allDropdowns = getEndPointNamesForDropDowns.concat(dropDownExceptions);

    let endPointName;

    allDropdowns.map(ele => {
        if (labelName === ele.field) {
            endPointName = ele.endPoint;
        }
    });

    return endPointName;
}
