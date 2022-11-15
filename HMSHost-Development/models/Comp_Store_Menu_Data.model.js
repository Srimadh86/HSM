module.exports = (sequelize, Sequelize) => {
    const StoremenuData = sequelize.define("Comp_Store_Menu_Data", { 
        CSM_Txn_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        Batch_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Transaction_ID: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Airport_Location_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Restaurant_ID: 
        {    
            type: Sequelize.INTEGER    
        },        
        Comp_Store_Menu_Name_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Section_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Menu_Item_ID: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Menu_Item_Name: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Menu_Item_Description: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_menu_Object_key: 
        {    
            type: Sequelize.STRING    
        },
        Comp_Store_Price: 
        {    
            type: Sequelize.INTEGER    
        },
        Comp_Store_Standardized_Menu_Category_ID: 
        {    
            type: Sequelize.INTEGER    
        }, 
        ipAddress: 
        {    
            type: Sequelize.STRING    
        },     
        Status:{
            type:Sequelize.DataTypes.ENUM('Active', 'In-active') 
        }
    });
    return StoremenuData; 
}