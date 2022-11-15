module.exports = (sequelize, Sequelize) => {
    const Region = sequelize.define("Global_Region_Master", { 
        Region_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
        Country_ID:{
            type: Sequelize.INTEGER,
        },
        Region_Name: 
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
    return Region; 
}