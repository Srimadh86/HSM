module.exports = (sequelize, Sequelize) => {
    const PricingModelMatchQualityScoreMaster = sequelize.define("Pricing_Model_Match_Quality_Score_Master", { 
        Match_Quality_Score_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Match_Quality_Score_Name: 
        {    
            type: Sequelize.STRING    
        },
        Match_Quality_Score_value: 
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
    return PricingModelMatchQualityScoreMaster; 
}