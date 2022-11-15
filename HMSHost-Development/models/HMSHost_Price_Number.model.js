module.exports = (sequelize, Sequelize) => {
    const PriceNumber = sequelize.define("HMSHost_Price_Number", { 
        Price_Number_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Price_Number_Value: 
        {    
            type: Sequelize.INTEGER    
        },
        Price_Number_Description: 
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
    return PriceNumber; 
}