module.exports = (sequelize, Sequelize) => {
    const Revenue_Type_Master = sequelize.define("HMSHost_Revenue_Type_Master", { 
        Revenue_Type_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Revenue_Type_Description: 
        {    
            type: Sequelize.STRING    
        }, 
        Revenue_Type_Value: 
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
    return Revenue_Type_Master; 
}