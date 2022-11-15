module.exports = (sequelize, Sequelize) => {
    const Menu1GroupMaster = sequelize.define("HMSHost_Menu_Group1_Master", { 
        Menu_Group1_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Product_Group_ID:{
            type: Sequelize.INTEGER,
        },
        Menu_Group1_Name: 
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
    return Menu1GroupMaster; 
}