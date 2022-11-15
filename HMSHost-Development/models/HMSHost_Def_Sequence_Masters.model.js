module.exports = (sequelize, Sequelize) => {
    const DepSeqMaster = sequelize.define("HMSHost_Def_Sequence_Master", { 
        Def_Sequence_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Def_Sequence_Value: 
        {    
            type: Sequelize.INTEGER    
        },
        Def_Sequence_Description: 
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
    return DepSeqMaster; 
}