module.exports = (sequelize, Sequelize) => {
    const StoreTakeoutMasters = sequelize.define("Comp_Store_Takeout_Master", { 
        Takeout_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Takeout_value: 
        {    
            type: Sequelize.INTEGER    
        },
        Takeout_status: 
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
    return StoreTakeoutMasters; 
}