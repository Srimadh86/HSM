module.exports = (sequelize, Sequelize) => {
    const StoreCatersMasters = sequelize.define("Comp_Store_Caters_Master", { 
        Caters_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Caters_Value: 
        {    
            type: Sequelize.INTEGER    
        },        
        Caters_status: 
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
    return StoreCatersMasters; 
}