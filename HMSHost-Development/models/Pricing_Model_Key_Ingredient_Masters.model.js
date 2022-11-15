module.exports = (sequelize, Sequelize) => {
    const PricingModelKey_IngredientMaster = sequelize.define("Pricing_Model_Key_Ingredient_Master", { 
        Key_Ingredient_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Key_Ingredient_Name: 
        {    
            type: Sequelize.STRING    
        },
        Alias_Name: 
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
    return PricingModelKey_IngredientMaster; 
}