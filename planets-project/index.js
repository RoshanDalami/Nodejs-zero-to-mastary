const {parse} = require('csv-parse');
const fs = require('fs');
const habitablePlanets = [];

const isHabitable = (potential_planet)=>{
    return potential_planet['koi_disposition'] === 'CONFIRMED' && potential_planet['koi_insol'] < 1.11 && potential_planet['koi_insol'] > 0.36 && potential_planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv').pipe(parse({
    comment :'#',
    columns : true ,
})).on('data',(data)=>{
    if(isHabitable(data)){

        habitablePlanets.push(data);
    }
}).on('error',(err)=>{
    console.log(err)
}).on('end',()=>{
    console.log(habitablePlanets.map((planet)=>{
        return planet['kepler_name'];
    }));
    console.log('May be Mission Name')
    console.log(habitablePlanets.map((planet)=>{
        return planet['kepoi_name'];
    }))
    console.log(`${habitablePlanets.length} habitable planets found`);
    console.log('End');
});