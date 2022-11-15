module.exports = (sequelize, Sequelize) => {
    const StoreRestaurantMasters = sequelize.define("Comp_Store_Restaurant_Master", { 
        Comp_Store_Restaurant_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Restaurant_Object_Key: 
        {    
            type: Sequelize.STRING    
        }, 
        Comp_Store_Restaurant_name: 
        {    
            type: Sequelize.STRING    
        },
        Address: 
        {    
            type: Sequelize.STRING    
        },
        Restaurant_URL: 
        {    
            type: Sequelize.STRING    
        },
        Phone_Number: 
        {    
            type: Sequelize.INTEGER    
        },       
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        status:{
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return StoreRestaurantMasters; 
}