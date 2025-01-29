const express = require('express');

const app = express();

const PORT = 4000;

const cors = require('cors');

const bcrypt = require('bcrypt');

const multer = require('multer');


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


app.post('/login', (req, res) => {

    try {

        console.log(req.body);
        connection.query('SELECT * FROM register_user WHERE email = ?', [req.body.email], async (error, results) => {

            if (error) {
                return res.status(500).send({ error: "Server Error" });
            }
            if (results.length == 0) {
                return res.status(500).send({ error: "Invalid Email and Password" });
            }
            const user = results[0];
            const match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                return res.status(200).send({ success: "Success! Login Successfull....", id: user.id });
            }
            res.status(500).send({ error: "Invalid Email and Password" });

        })
    } catch {
        res.status(500).send({ error: "Server Error" });
    }

});


app.post('/register', upload.single('profilePicture'), async (req, res) => {

    try {
        const fileName = `${req.file.filename}`;
        const { name, email, phoneNumber, dob, gender, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query('SELECT * FROM register_user WHERE email = ? ', [req.body.email], (error, results) => {

            if (error) {
                console.log(error);
                return res.status(500).send({ error: "Server Error" });
            }
            const user = results[0];

            if (user) {
                return res.status(500).send({ error: "User already register" });
            }


            connection.query('INSERT INTO register_user (name,email,phone_number,gender,dob,profile_picture,password) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, phoneNumber, gender, dob, fileName, hashedPassword], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({ error: "Server Error" });
                }
            });

            connection.query('SELECT * FROM register_user WHERE email = ?', [req.body.email], async (error, results) => {

                if (error) {
                    return res.status(500).send({ error: "Server Error" });
                }
                const user = results[0];
                res.status(200).send({ success: "Data Resigter Successfully!", id: user.id });
            });

        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});

app.get('/get-profile/:userId', async (req, res) => {

    const userId = req.params.userId;

    try {
        connection.query("SELECT * ,DATE_FORMAT(dob, '%Y-%m-%d') AS formatted_dob FROM register_user WHERE id = ?", [userId], (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const user = results[0];
            res.status(200).send(user);
        })

    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }

})

app.put('/update-profile/:userId', upload.single('profilePicture'), (req, res) => {

    const userId = req.params.userId;
    const { name, phoneNumber, dob, gender } = req.body;

    let profilePicture = req.file ? req.file.filename : req.body.oldProfilePicture;
    connection.query('UPDATE register_user SET name = ?,phone_number = ?,gender = ?, dob = ?, profile_picture =? WHERE id = ?', [name, phoneNumber, gender, dob, profilePicture, userId], (error, results) => {
        if (error) {
            return res.status(500).send({ error: "Server Error" });
        }
        res.status(200).send({ success: "Profile Update successfully" });
    })
})





app.listen(PORT, () => {

    console.log("Server running on 4000");
})

