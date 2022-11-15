module.exports = (sequelize, Sequelize) => {
    const StoreStyleMaster = sequelize.define("Comp_Store_Style_Master", { 
        Comp_Store_Style_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Style_Name: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Style_Description: 
        {    
            type: Sequelize.STRING    
        },        
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:{
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return StoreStyleMaster; 
}