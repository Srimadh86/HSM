module.exports = (sequelize, Sequelize) => {
    const StoreWaiterServiceMasters = sequelize.define("Comp_Store_Waiter_service_Master", { 
        Waiter_service_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Waiter_service_Value: 
        {    
            type: Sequelize.INTEGER    
        },
        Waiter_service_status: 
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
    return StoreWaiterServiceMasters; 
}