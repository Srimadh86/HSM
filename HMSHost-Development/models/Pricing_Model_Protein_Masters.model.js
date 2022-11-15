module.exports = (sequelize, Sequelize) => {
    const PricingModelProteinMaster = sequelize.define("Pricing_Model_Protein_Master", { 
        Protein_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Protein_Name: 
        {    
            type: Sequelize.STRING    
        },
        Alias_Name: 
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
    return PricingModelProteinMaster; 
}