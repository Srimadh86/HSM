module.exports = (sequelize, Sequelize) => {
    const StoreAlcoholStatusMasters = sequelize.define("Comp_Store_Alcohol_status_Master", { 
        Alcohol_Status_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Alcohol_status_value: 
        {    
            type: Sequelize.INTEGER    
        },
        Alcohol_status: 
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
    return StoreAlcoholStatusMasters; 
}