module.exports = (sequelize, Sequelize) => {
    const PriceMenuItemScoreBreakdownMaster = sequelize.define("Pricing_Model_Menu_Item_Score_Breakdown_Master", { 
        Menu_Item_Breakdown_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Menu_Item_Breakdown_Name: 
        {    
            type: Sequelize.STRING    
        },
        Menu_Item_position_Value: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Breakdown_score: 
        {    
            type: Sequelize.INTEGER    
        },        
        Breakdown_description: 
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
    return PriceMenuItemScoreBreakdownMaster; 
}