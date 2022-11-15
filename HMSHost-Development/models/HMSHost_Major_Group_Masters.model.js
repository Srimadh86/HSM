module.exports = (sequelize, Sequelize) => {
    const MajorGroupMaster = sequelize.define("HMSHost_Major_Group_Master", { 
        Major_Group_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Major_Group_Name: 
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
    return MajorGroupMaster; 
}