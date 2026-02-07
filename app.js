const express = require("express"); 
const app = express(); 

// connecting to html file to go live 
app.use(express.static('public')); 

// converting to numbers 
function getNums (nums) { 
    return nums.split(",").map(n => Number (n)); 
}

// mean (average) function 
app.get("/mean", (req, res) => {
    const nums = getNums(req.query.nums);

    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / nums.length;

    res.send(`The mean value is ${mean}`);
}); 


// median function 
app.get("/median", (req, res) => {
    const nums = getNums(req.query.nums);
    nums.sort((a, b) => a - b);

    let middle = Math.floor(nums.length / 2);

    let median;
    if (nums.length % 2 === 0) {
        median = (nums[middle - 1] + nums[middle]) / 2;
    } else {
        median = nums[middle];
    }

    res.send(`The median value is ${median}`);
}); 


// mode function 
app.get("/mode", (req, res) => {
    const nums = getNums(req.query.nums);

    const frequency = {};
    nums.forEach(n => { 
        frequency[n] = (frequency[n] || 0) + 1;
    })

    let max = 0; 
    let mode;

    for (let key in frequency) { 
        if (frequency[key] > max) { 
            max = frequency[key]; 
            mode = key; 
        }
    }

    res.send(`The mode value is ${mode}`);
}); 


// starting the server
app.listen(55000, () => {
    console.log("Server is running on port 55000");
});