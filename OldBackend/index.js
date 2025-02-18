const express = require('express');

const app = express();

const PORT = 4000;

const cors = require('cors');

const CryptoJS = require("crypto-js");

app.use(express.urlencoded({ extended: true }));

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

        connection.query('SELECT * FROM register_users WHERE email = ?', [req.body.email], async (error, results) => {

            if (error) {
                return res.status(500).send({ error: "Server Error" });
            }
            if (results.length == 0) {
                return res.status(200).send({ error: "Invalid Email and Password" });
            }
            const user = results[0];

            const bytes = CryptoJS.AES.decrypt(user.password, '1234');
            const password = bytes.toString(CryptoJS.enc.Utf8);

            if (req.body.password == password) {
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

        const hashedPassword = CryptoJS.AES.encrypt(password, '1234').toString();

        connection.query('SELECT * FROM register_users WHERE email = ? ', [req.body.email], (error, results) => {

            if (error) {
                console.log(error);
                return res.status(500).send({ error: "Server Error" });
            }
            const user = results[0];

            if (user) {
                return res.status(500).send({ error: "User already register" });
            }


            connection.query('INSERT INTO register_users (name,email,phone_number,gender,dob,profile_picture,password) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, phoneNumber, gender, dob, fileName, hashedPassword], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({ error: "Server Error" });
                }
            });

            connection.query('SELECT * FROM register_users WHERE email = ?', [req.body.email], async (error, results) => {

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
        connection.query("SELECT * ,DATE_FORMAT(dob, '%Y-%m-%d') AS formatted_dob FROM register_users WHERE id = ?", [userId], (error, results) => {
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
    connection.query('UPDATE register_users SET name = ?,phone_number = ?,gender = ?, dob = ?, profile_picture =? WHERE id = ?', [name, phoneNumber, gender, dob, profilePicture, userId], (error, results) => {
        if (error) {
            return res.status(500).send({ error: "Server Error" });
        }
        res.status(200).send({ success: "Profile Update successfully" });
    })
})



app.get('/books', (req, res) => {

    try {
        connection.query("SELECT *, DATE_FORMAT(publication_date, '%Y-%m-%d') AS formatted_date FROM books", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            res.status(200).send(results);
        })

    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }


})

app.get('/book/:id', (req, res) => {

    const book_id = req.params.id
    try {
        connection.query("SELECT *, DATE_FORMAT(publication_date, '%Y-%m-%d') AS publication_date FROM book WHERE book_id = ? ", [book_id], (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const bookData = results[0];

            connection.query("SELECT * FROM author", (error, results) => {
                if (error) {
                    return res.status(500).send({ message: "Server Error" })
                }
                const authorData = results;

                const book = {
                    ...bookData,
                    co_author: bookData.co_author.split(",").map((id) => {
                        const author = authorData.find((author) => author.author_id === Number(id));
                        return author ? author.name : null;
                    }),
                    language: bookData.language.split(",")
                }
                res.status(200).send(book);
            })
        })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }


})

app.get('/book-count', (req, res) => {

    try {
        connection.query("SELECT Count(*) as count FROM book", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const bookCount = results[0];
            res.status(200).send(bookCount)
        })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }
})
app.get('/author-count', (req, res) => {

    try {
        connection.query("SELECT Count(*) as count FROM author", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const authorCount = results[0];
            res.status(200).send(authorCount)
        })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }
})


app.get('/authores', (req, res) => {

    try {
        connection.query("SELECT * FROM author", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const authorData = results.map((author) => {
                return { author_id: author.author_id, name: author.name }
            })
            // console.log(results);
            res.status(200).send(authorData);
        })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }


})

app.get('/author/:id', (req, res) => {

    const author_id = req.params.id;
    try {
        connection.query("SELECT * FROM author WHERE author_id = ?", [author_id], (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const authorData = results[0];
            // console.log(results);
            const author = {
                ...authorData,
                nationality: authorData.nationality.split(","),

            }
            res.status(200).send(author);
        })
    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }


})


app.get('/all-bookdata', (req, res) => {

    try {
        connection.query("SELECT *,DATE_FORMAT(publication_date, '%Y-%m-%d') AS formatted_date FROM book", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const bookData = results;

            connection.query("SELECT * FROM author", (error, results) => {
                if (error) {
                    return res.status(500).send({ message: "Server Error" })
                }
                const authorData = results;
                const books = bookData.map((book) => (
                    {
                        ...book,
                        co_author: book.co_author.split(",").map((co_author) => Number(co_author)),
                    }
                ))
                const allDetail = books.map((book) => (
                    {
                        ...book,
                        subRows: authorData.filter((author) =>
                            author.author_id === book.author_id || book.co_author.includes(author.author_id))
                            .map((author) => ({
                                ...author,
                                designation: author.author_id == book.author_id ? "Author" : "Co-Author",
                            }))
                    }))
                res.status(200).send(allDetail);
            })

        })



    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }


})

app.get('/all-authordata', (req, res) => {

    try {
        connection.query("SELECT *,DATE_FORMAT(publication_date, '%Y-%m-%d') AS formatted_date FROM book", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const bookData = results;

            connection.query("SELECT * FROM author", (error, results) => {
                if (error) {
                    return res.status(500).send({ message: "Server Error" })
                }
                const authorData = results;

                //converting to co-authore Array
                const books = bookData.map((book) => ({
                    ...book,
                    co_author: book.co_author.split(",").map((id) => {
                        const author = authorData.find((author) => author.author_id === Number(id));
                        return author ? author.name : null;
                    })
                }));

                const allDetail = authorData.map((author) => (
                    {
                        ...author,
                        subRows: books.filter((book) => book.author_id === author.author_id || book.co_author.includes(author.name))
                            .map(book => ({ ...book, co_author: book.co_author.join(", ") }))
                    }))

                res.status(200).send(allDetail);
            })

        })



    } catch (error) {
        res.status(500).send({ message: "Server Error" })
    }


})



app.post('/insert-book', async (req, res) => {

    try {

        const { title, author_id, author, co_author, publication_date, genre, language, price } = req.body

        let co_authors;
        const languages = language.toString()


        connection.query('SELECT * FROM book WHERE title = ? ', [title], (error, results) => {

            if (error) {
                console.log(error);
                return res.status(500).send({ error: "Server Error" });
            }
            const user = results[0];

            if (user) {
                return res.status(500).send({ error: "Book already register" });
            }


            connection.query("SELECT * FROM author", (error, results) => {
                if (error) {
                    return res.status(500).send({ message: "Server Error" })
                }
                const authorData = results;

                co_authors = String(co_author.map((name) => {
                    const author = authorData.find((author) => author.name === name);
                    return author ? author.author_id : null;
                }));

                connection.query('INSERT INTO book (title,author_id,author,co_author,genre,publication_date,language,price) VALUES (?, ?, ?, ?, ?, ?, ?,?)', [title, author_id, author, co_authors, genre, publication_date, languages, price], (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send({ error: "Server Error" });
                    }

                    res.status(200).send({ success: "Data Resigter Successfully!" });

                });
            });

        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});

app.post('/insert-author', async (req, res) => {

    try {

        const { name, email, contact_no, nationality } = req.body

        const nationalityString = nationality.toString()
        connection.query('SELECT * FROM author WHERE email = ? ', [email], (error, results) => {

            if (error) {
                console.log(error);
                return res.status(500).send({ error: "Server Error" });
            }
            const user = results[0];

            if (user) {
                return res.status(500).send({ error: "Author already register" });
            }


            connection.query('INSERT INTO author (name,email,contact_no,nationality) VALUES (?, ?, ?, ?)', [name, email, contact_no, nationalityString], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({ error: "Server Error" });
                }
                res.status(200).send({ success: "Data Resigter Successfully!" });
            });

        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});


app.put('/update-book/:id', async (req, res) => {

    const book_id = req.params.id;
    try {

        const { title, author_id, author, co_author, publication_date, genre, language, price } = req.body

        let co_authors;
        const languages = language.toString()

        connection.query("SELECT * FROM author", (error, results) => {
            if (error) {
                return res.status(500).send({ message: "Server Error" })
            }
            const authorData = results;

            co_authors = String(co_author.map((name) => {
                const author = authorData.find((author) => author.name === name);
                return author ? author.author_id : null;
            }));

            connection.query('UPDATE book SET title = ?, author_id = ?, author = ?, co_author = ?, genre = ?, publication_date = ?, language = ?, price = ? WHERE book_id = ?',
                [title, author_id, author, co_authors, genre, publication_date, languages, price, book_id], (error, results) => {

                    if (error) {
                        console.log(error);
                        return res.status(500).send({ error: "Server Error" });
                    }
                    res.status(200).send({ success: "Book Update Successfully!" });
                });
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});

app.put('/update-author/:id', async (req, res) => {

    const author_id = req.params.id;
    try {

        const { name, email, contact_no, nationality } = req.body


        const nationalityString = nationality.toString()

        connection.query('UPDATE author SET name = ?, email = ?, contact_no = ?, nationality = ? WHERE author_id = ?',
            [name, email, contact_no, nationalityString, author_id], (error, results) => {

                if (error) {
                    console.log(error);
                    return res.status(500).send({ error: "Server Error" });
                }

                connection.query('UPDATE book SET author = ? WHERE author_id = ? ', [name, author_id], (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send({ error: "Server Error" });
                    }

                })
                res.status(200).send({ success: "Author Update Successfully!" });
            });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});

app.delete('/delete-book/:id', async (req, res) => {

    const book_id = req.params.id;
    try {
        connection.query('DELETE FROM book WHERE book_id = ?', [book_id], (error, results) => {

            if (error) {
                console.log(error);
                return res.status(500).send({ error: "Server Error" });
            }
            res.status(200).send({ success: "Book Delete Successfully!" });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});

app.delete('/delete-author/:id', async (req, res) => {

    const author_id = req.params.id;

    try {
        connection.query('DELETE FROM author WHERE author_id = ?', [author_id], (error, results) => {

            if (error) {
                console.log(error);
                return res.status(500).send({ error: "Server Error" });
            }
            res.status(200).send({ success: "Author Delete Successfully!" });
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }

});

app.listen(PORT, () => {

    console.log("Server running on 4000");
})

