module.exports = (sequelize, Sequelize) => {
    const Zipcode = sequelize.define("Global_Zip_Code_Master", { 
        Zip_Code_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        }, 
             
        Zip_Code_Value: 
        {    
            type: Sequelize.INTEGER    
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
    return Zipcode; 
}