module.exports = (sequelize, Sequelize) => {
    const StorePriceSegmentMaster = sequelize.define("Comp_Store_Price_Segment_Master", { 
        Comp_Store_Price_Segment_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Price_Segment_Value: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Price_Segment_description: 
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
    return StorePriceSegmentMaster; 
}