module.exports = (sequelize, Sequelize) => {
    const StoreMaster = sequelize.define("HMSHost_Store_Master", { 
        Store_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Revenue_Type_ID:{
            type: Sequelize.INTEGER,
        },
        City_ID:{
            type: Sequelize.INTEGER,
        },
        Business_Unit_ID:{
            type: Sequelize.INTEGER,
        },
        Concept_ID:{
            type: Sequelize.INTEGER,
        },
        Def_Sequence_ID:{
            type: Sequelize.INTEGER,
        },
        Rounding_ID:{
            type: Sequelize.INTEGER,
        },
        Store_Name: 
        {    
            type: Sequelize.STRING    
        },
        RVC_Number:{
            type: Sequelize.INTEGER,
        },
        RVC_Description: 
        {    
            type: Sequelize.STRING    
        },
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:
        {
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return StoreMaster; 
}