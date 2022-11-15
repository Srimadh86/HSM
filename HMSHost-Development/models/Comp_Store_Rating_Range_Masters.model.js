module.exports = (sequelize, Sequelize) => {
    const StoreRatingRangeMaster = sequelize.define("Comp_Store_Rating_Range_Master", { 
        Comp_Store_Rating_Range_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Rating_Range_start_value: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Rating_Range_End_Value: 
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
    return StoreRatingRangeMaster; 
}