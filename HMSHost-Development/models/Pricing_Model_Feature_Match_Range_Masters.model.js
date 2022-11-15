module.exports = (sequelize, Sequelize) => {
    const PriceFeatureMatchRangeMaster = sequelize.define("Pricing_Model_Feature_Match_Range_Master", { 
        Feature_Match_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Feature_Match_Description: 
        {    
            type: Sequelize.STRING    
        },
        Feature_Match_Percentage: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Feature_Match_Weightage_Percentage: 
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
    return PriceFeatureMatchRangeMaster; 
}