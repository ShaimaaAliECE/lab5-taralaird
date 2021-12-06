const express = require('express');
let jobList = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))

app.use(express.static('static'));

//For 1- The categories mentioned in all the jobs and how many times each category was mentioned.
app.get('/categories', (req, res) => {
    let count = {};

    //iterate through joblist 
    for (j in jobList){
        //iterate thriugh joblist 
        for (c of jobList[j].categories){
            if(c in count){
                count[c]++; //increment count 
            }
            else{
                count[c] = 1;
            }
        }
    }
    //send count
    res.send(JSON.stringify(count));
});

//For 3- All jobs in a given city (sent in the querystring)
app.get('/checkJobsInCity', (req,res)=> {
    let jobsInCity = []; //used to hold the jobs in the city 

    //iterate through joblist 
    for (let j in jobList){
        //if the job contains the cityname its added to the array 
        if (jobList[j].title.includes(req.query.cityName))
        {
             jobsInCity.push(j);
        }      
    }

    //send array 
    res.json(
        {
            jobsInThisCity: jobsInCity
        }
    );
});

// For 2- All the jobs with a given category (sent as a parameter)
app.get('/:category', (req, res) => {
    let jobs = {};  //used to hold the jobs

    //iterate through joblist 
    for(j in jobList){
         //if the job is in the category its added to the array 
        for(c of jobList[j].categories){
            if (req.params.category == c){
                jobs[j] = jobList[j];
            }
        }
    }

    //send array 
    res.send(jobs);
});


app.listen(80);