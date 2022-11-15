module.exports = (sequelize, Sequelize) => {
    const StoremenuNameMaster = sequelize.define("Comp_Store_Menu_Name_Master", { 
        Comp_Store_Menu_Name_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Restaurant_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Menu_Name: 
        {    
            type: Sequelize.STRING    
        },
        Description: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Menu_Object_key: 
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
    return StoremenuNameMaster; 
}