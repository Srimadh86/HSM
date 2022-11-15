module.exports = (sequelize, Sequelize) => {
    const FamilyGroupMaster = sequelize.define("HMSHost_Family_Group_Master", { 
        Family_Group_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
       
        Family_Group_Category_Name: 
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
    return FamilyGroupMaster; 
}