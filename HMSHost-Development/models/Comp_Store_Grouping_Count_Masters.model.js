module.exports = (sequelize, Sequelize) => {
    const StoreGroupingCountMaster = sequelize.define("Comp_Store_Grouping_Count_Master", { 
        Comp_Store_Group_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Comp_Store_Starting_Group_Number: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Ending_Group_Number: 
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
    return StoreGroupingCountMaster; 
}