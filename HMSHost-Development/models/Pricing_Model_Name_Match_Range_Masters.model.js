module.exports = (sequelize, Sequelize) => {
    const PriceMatchRangeMaster = sequelize.define("Pricing_Model_Name_Match_Range_Master", { 
        Name_Match_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Name_Match_Description: 
        {    
            type: Sequelize.STRING    
        },
        Name_Match_Percentage: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Name_Weightage_Percentage: 
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
    return PriceMatchRangeMaster; 
}