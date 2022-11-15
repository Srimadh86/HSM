module.exports = (sequelize, Sequelize) => {
    const Menu2GroupMaster = sequelize.define("HMSHost_Menu_Group2_Master", { 
        Menu_Group2_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Menu_Group1_ID:{
            type: Sequelize.INTEGER,
        },
        Menu_Group2_Name: 
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
    return Menu2GroupMaster; 
}