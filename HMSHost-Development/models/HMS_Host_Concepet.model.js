module.exports = (sequelize, Sequelize) => {
    const ConceptMaster = sequelize.define("HMSHost_Concept_Master", { 
        Concept_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Concept_Name: 
        {    
            type: Sequelize.STRING    
        },
        Concept_Description: 
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
    return ConceptMaster; 
}