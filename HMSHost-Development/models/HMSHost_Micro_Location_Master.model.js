module.exports = (sequelize, Sequelize) => {
    const MicroLocationMaster = sequelize.define("HMSHost_Micro_Location_Master", { 
        Micro_Location_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Store_ID:{
            type: Sequelize.INTEGER,
        },
        Revenue_Type_ID:{
            type: Sequelize.INTEGER,
        },
        Micro_Location_Description: 
        {    
            type: Sequelize.STRING    
        },
        Micro_RVC_Number:{
            type: Sequelize.INTEGER,
        },
        Micro_Location_Value: 
        {    
            type: Sequelize.STRING    
        },
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:
        {
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return MicroLocationMaster; 
}