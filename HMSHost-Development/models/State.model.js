module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("Global_State_Master", { 
        State_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Region_ID:{
            type: Sequelize.INTEGER,
        },
        State_Name: 
        {    
            type: Sequelize.STRING    
        },
        State_code: 
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
    return State; 
}