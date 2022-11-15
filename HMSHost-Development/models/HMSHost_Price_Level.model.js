module.exports = (sequelize, Sequelize) => {
    const Pricelevel = sequelize.define("HMSHost_Price_Level_Master", { 
        Price_Level_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Price_Level_Value: 
        {    
            type: Sequelize.INTEGER    
        },
        Price_Level_Description: 
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
    freezeTableName: true
    return Pricelevel; 
}