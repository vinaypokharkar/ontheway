const  express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const Passenger = require('./models/passModel')
const passRouter = require('./routes/passRouter'); 



require('dotenv').config()
require('./models/db')

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use('/auth', authRouter)
app.use('/passenger', passRouter)




// app.get('/passenger/:name', async (req, res) => {
//     try {
//         const { name } = req.params;
//         const passenger = await Passenger.findOne({ name });
//         if (!passenger) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Passenger not found'
//             });
//         }
//         res.status(200).json(passenger);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//         console.error('Error fetching passenger:', error);
//     }
// })

// app.get('/passenger', async (req, res) => {
//     try {
//         const passengers = await Passenger.find({});
//         res.status(200).json(passengers);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//         console.error('Error fetching passengers:', error);
//     }
// })
// app.post('/passenger', async (req, res) => {
//     try {
//         const passenger = await Passenger.create(req.body);
//         res.status(200).json(passenger);    
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//         console.error('Passenger creation error:', error);
//     }
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))