module.exports = {
    HOST:"20.244.27.38",
    USER:"root",
    PASSWORD:"Strike9",
    // PASSWORD:"Ramachandra123!",
    //DB:"Comp_Store_Restaurant_Data",
    DB:"AllinOne",
    dialect:"mysql",
    port:"3307",
    pool:
    {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
