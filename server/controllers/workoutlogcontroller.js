let Express = require("express"); 
let router = Express.Router(); 
let validateJWT = require ("../middleware/validate-jwt");

const {WorkoutModel} = require("../models");

router.get('/practice', validateJWT, (req, res)=>{
    res.send('Hey!! This is the practice route!') 
});

/*
==============================
WORKOUT CREATE
==============================
*/

router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.workout;
    const {id} = req.user;
    const workoutEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newWorkout = await WorkoutModel.create(workoutEntry);
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(500).json ({error: err.message});
    }
});

/*
==============================
WORKOUT LOG
==============================
*/

router.post("/log/", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.workout;
    const {id} = req.user;
    const workoutEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newWorkout = await WorkoutModel.create(workoutEntry);
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(500).json ({error: err.message});
    }
});


/*
==============================
Get all WORKOUTS
==============================
*/
router.get("/",async (req, res) => {
    try {
        const entries = await WorkoutModel.findAll(); 
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

/*
==============================
Get entries by User
==============================
*/

router.get("/mine", validateJWT, async (req, res) => {  
    const {id} = req.user; 
    try{
        const userWorkouts = await WorkoutModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userWorkouts);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});


/*
==============================
Update a WORKOUT
==============================
*/

router.put("/update/:entryId", validateJWT, async (req, res) => { 
    const {description, definition, result, owner_id} = req.body.workout;
    const workoutId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: workoutId,
            owner_id: userId
        }
    };

    const updatedWorkout = {
        description: description,
        definition: definition,
        result: result,
        owner_id: owner_id
    };

    try {
        const update = await WorkoutModel.update(updatedWorkout, query);
        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

/*
==============================
Delete a WORKOUT
==============================
*/

router.delete("/delete/:id", validateJWT, async (req, res) =>{  
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try {
        const query = {
            where: {
                id: workoutId,
                owner_id: ownerId
            }
        };
        await WorkoutModel.destroy(query); 
        res.status(200).json({message:"Workout Entry Removed"});
    }catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;