module.exports = (sequelize, Sequelize) => {
    const ModelRounding = sequelize.define("Pricing_Model_Rounding_Master", { 
        Rounding_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Rounding_Value: 
        {    
            type: Sequelize.INTEGER    
        },
        Rounding_Rule_Description: 
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
    return ModelRounding; 
}