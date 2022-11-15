module.exports = (sequelize, Sequelize) => {
    const POSmenucategory= sequelize.define("HMSHost_POS_Menu_Category_Master", { 
        POS_Category_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        POS_Category_Name: 
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
    return POSmenucategory; 
}