module.exports = (sequelize, Sequelize) => {
    const StoreSectionMaster = sequelize.define("Comp_Store_Section_Master", { 
        Comp_Store_Section_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Section_Name: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Section_Description: 
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
    return StoreSectionMaster; 
}