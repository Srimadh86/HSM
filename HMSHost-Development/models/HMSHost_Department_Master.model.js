module.exports = (sequelize, Sequelize) => {
    const DepartmentMaster = sequelize.define("HMSHost_Department_Master", { 
        Department_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Business_Unit_ID:{
            type: Sequelize.INTEGER,
        },
        Concept_ID:{
            type: Sequelize.INTEGER,
        },
        Department_Value: 
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
    return DepartmentMaster; 
}