module.exports = (sequelize, Sequelize) => {
    const PriceIngredientMatchRangeMaster = sequelize.define("Pricing_Model_Ingredient_Match_Range_Master", { 
        Ingredient_Match_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Ingredient_Match_Description: 
        {    
            type: Sequelize.STRING    
        },
        Ingredient_Match_Percentage: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Ingredient_Match_Weightage_Percentage: 
        {    
            type: Sequelize.INTEGER    
        },        
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:{
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return PriceIngredientMatchRangeMaster; 
}