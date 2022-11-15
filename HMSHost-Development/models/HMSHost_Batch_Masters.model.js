module.exports = (sequelize, Sequelize) => {
    const HostBatchMasters = sequelize.define("HMSHost_Batch_Master", { 
        HMSHost_Batch_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Batch_directory_address: 
        {    
            type: Sequelize.STRING    
        },
        Uploaded_Date: 
        {    
            type: Sequelize.DATE    
        },
        Transaction_Start_Date: 
        {    
            type: Sequelize.DATE    
        },
        Transaction_End_Date: 
        {    
            type: Sequelize.DATE    
        },
        Airport_Location_ID: 
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
    return HostBatchMasters; 
}