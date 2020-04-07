// The following code is a NON-OFFICIAL solution for decoding Taylor Guitars serial numbers
// The official guide for decoding a Taylor Guitar's Serial numbers can be found at:
// https://www.taylorguitars.com/support/general/decoding-taylor-guitars-serial
// Enjoy the code and feel free to send me any feedback to: 
// arielbarkan@gmail.com


const getTaylorData = (sn)=>{

    let data = {
        status: "error",
        message: "can't decode this serial number format"
    }

    if(isNaN(sn)) {
        data["message"]= "Not a number"
    }

    const snArray = (""+sn).split("");

    if(valuesBySnArray[snArray.length]!== undefined){
        data = decode(snArray)
    }else{
        
    }
    data["sn"] = sn
    return data
}

const dataNotProvided   = "not available for this type of serial number"

// Array of Taylor workshops by code number
const locationsArray    = {
    1 : "El Cajon, California, USA",
    2 : "Tecate, Baja California, Mexico"
}

// Array of Taylor series by code number
const seriesCodesArray  = {
    0: "300 or 400 Series",
    1: "500 through Presentation Series",
    2: "200 Series",
    3: "Baby or Big Baby (through 2002)",
    4: "Big Baby (2003-2009)",
    5: "T5",
    7: "Nylon Series",
    8: "100 Series",
    9: "SolidBody Series"
}

const valuesBySnArray        = {
    9: {
        length                      : 9,
        year                        : "snArray[0] + snArray[1]",
        month                       : "snArray[2] + snArray[3]",
        day                         : "snArray[4] + snArray[5]",
        location                    : "dataNotProvided",
        series_code_number          : "seriesCodesArray[snArray[6]]",
        pos_in_day_prod_sequence    : "snArray[7] + snArray[8]"
    },
    10: {
        length                      : 10,
        year                        : "snArray[1] + snArray[6]",
        month                       : "snArray[2] + snArray[3]",
        day                         : "snArray[2] + snArray[3]",
        location                    : "locationsArray[snArray[0]]",
        series_code_number          : "dataNotProvided",
        pos_in_day_prod_sequence    : "snArray[7] + snArray[8]+snArray[9]"
    },
    11:{
        length                      : 11,
        year                        : "snArray[0] + snArray[1] + snArray[2] + snArray[3]",
        month                       : "snArray[4] + snArray[5]",
        day                         : "snArray[6] + snArray[7]",
        location                    : "dataNotProvided",
        series_code_number          : "seriesCodesArray[snArray[8]]",
        pos_in_day_prod_sequence    : "snArray[9] + snArray[10]"
    }
}


const decode = (snArray)=>{
    const status                    = "ok"
    const length                    = snArray.length
    const year                      = parseInt(eval(valuesBySnArray[length].year))
    const month                     = parseInt(eval(valuesBySnArray[length].month))
    const day                       = parseInt(eval(valuesBySnArray[length].day))
    const location                  = eval(valuesBySnArray[length].location)
    const series_code_number        = eval(valuesBySnArray[length].series_code_number)
    const pos_in_day_prod_sequence  = parseInt(eval(valuesBySnArray[length].pos_in_day_prod_sequence))
    
    const result ={
        status,
        length,
        year,
        month,
        day,
        location,
        pos_in_day_prod_sequence,
        series_code_number
    }

    return result
}


/***
 *      ____                        _           
 *     / ___|  __ _ _ __ ___  _ __ | | ___  ___ 
 *     \___ \ / _` | '_ ` _ \| '_ \| |/ _ \/ __|
 *      ___) | (_| | | | | | | |_) | |  __/\__ \
 *     |____/ \__,_|_| |_| |_| .__/|_|\___||___/
 *                           |_|                
 */

// Sample non existing sn length
console.log(getTaylorData(2103));

// Sample 9 digits
console.log(getTaylorData(980311301));

// Sample 10 digits
console.log(getTaylorData(1107064001));

// Sample 11 digits
console.log(getTaylorData(20070311301));
