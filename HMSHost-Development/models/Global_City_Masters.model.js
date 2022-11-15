module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("Global_City_Master", { 
        City_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        State_ID:{
            type: Sequelize.INTEGER,
        },
        Region_ID:{
            type: Sequelize.INTEGER,
        },
        City_Name: 
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
    return City; 
}