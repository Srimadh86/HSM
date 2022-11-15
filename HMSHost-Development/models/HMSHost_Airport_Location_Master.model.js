module.exports = (sequelize, Sequelize) => {
    const AirportLocationMaster = sequelize.define("HMSHost_Airport_Location_Master", { 
        Airport_Location_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Airport_Name: 
        {    
            type: Sequelize.STRING    
        },
        Airport_Short_Name: 
        {    
            type: Sequelize.STRING    
        },
        Address: 
        {    
            type: Sequelize.STRING    
        },
        Latitude:{
            type: Sequelize.INTEGER,
        },
        Longitude:{
            type: Sequelize.INTEGER,
        },
        Owner_Name: 
        {    
            type: Sequelize.STRING    
        },
        Owner_Phone_number:{
            type: Sequelize.INTEGER,
        },
        City_ID:{
            type: Sequelize.INTEGER,
        },
        Store_ID:{
            type: Sequelize.INTEGER,
        },
        Business_Unit_ID:{
            type: Sequelize.INTEGER,
        },
        Zip_Code_ID:{
            type: Sequelize.INTEGER,
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
    return AirportLocationMaster; 
}