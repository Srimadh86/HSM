const moment = require('moment-timezone');
module.exports = (sequelize, Sequelize) => {
    const StoreRestaurantData = sequelize.define("Comp_Store_Restaurant_Data", { 
        CSR_Txn_ID: 
        {    
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true   
        },        
        HMSHost_Batch_ID: 
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
        City_ID: 
        {    
            type: Sequelize.INTEGER    
        }, 
        State_ID: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Zip_Code_ID: 
        {    
            type: Sequelize.INTEGER    
        },   
        Comp_Store_Style_ID: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Comp_Store_Price_Segment_ID: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Alcohol_Status_ID: 
        {    
            type: Sequelize.INTEGER    
        },      
        Takeout_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Waiter_service_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Caters_ID: 
        {    
            type: Sequelize.INTEGER    
        },
        Rating_Value: 
        {    
            type: Sequelize.INTEGER    
        }, 
        Review_Count: 
        {    
            type: Sequelize.INTEGER    
        },
        Restaurant_Proprietary_URL: 
        {    
            type: Sequelize.STRING    
        },
        Max_Rating_Value: 
        {    
            type: Sequelize.INTEGER    
        },
        Restaurant_Robot_Name: 
        {    
            type: Sequelize.STRING    
        },
        Restaurant_Execution_Id: 
        {    
            type: Sequelize.STRING    
        },
        Restaurant_First_Extracted: 
        {    
            type: Sequelize.DATE    
        },
        Restaurant_Last_Extracted: 
        {    
            type: Sequelize.DATE    
        },
        Restaurant_Extracted_In_Last_Run: 
        {    
            type: Sequelize.STRING    
        },
        Restaurant_Last_Updated: 
        {    
            type: Sequelize.DATE,
            defaultValue: moment.utc().format('DD-MM-YYYY HH:mm:ss'),   
        },
        Mileage_Calculation: 
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
    return StoreRestaurantData; 
}