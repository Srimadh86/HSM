module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("Global_Country_Master", { 
        Country_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Country_Name: 
        {    
            type: Sequelize.STRING    
        },
        Country_Short_Name: 
        {    
            type: Sequelize.STRING    
        },        
        Currency: 
        {    
            type: Sequelize.STRING    
        },
        Currency_Symbol: 
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
    return Country; 
}