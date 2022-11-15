module.exports = (sequelize, Sequelize) => {
    const QualityGroupMaster = sequelize.define("HMSHost_Quality_Group_Master", { 
        Quality_Group_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Menu_Group2_ID:{
            type: Sequelize.INTEGER,
        },
        Quality_Group_Name: 
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
    return QualityGroupMaster; 
}