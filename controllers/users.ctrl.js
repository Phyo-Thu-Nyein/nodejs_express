const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));


exports.getAllUsers = (req, res) => {
    res.status(200)
    res.json({
        status: "success",
        results: users.length, 
        data: users,
    })
}

exports.register = (req, res) => {
    const newUser = {
        id: users.length, 
        // id: users[users.length - 1].id + 1, 
        ...req.body, 
    }
    users.push(newUser); 

    fs.writeFile(`${__dirname}/../dev-data/data/users.json`,
        JSON.stringify(users),
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: "fail",
                    message: "something went wrong",
                });
            }
            res.status(200).json({
                status: "Success",
                message: "New user has been added successfully!",
            });
        }
    );
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((el) => el.email === email);

    if (!user) {
        return res.status(200).json({
            status: "fail",
            message: "user not found"
        });
    }
    if (user.password != password) {
        return res.status(200).json({
            status: "fail",
            message: "password incorrect"
        });
    }
    res.status(200)
    res.json({
        status: "Success",
        message: "You are now logged in!"
    });
}

exports.getUserByID = (req, res) => {
    const id = req.params.id;

    const oneUser = users.find((user) => user.id === id);

    if (!oneUser) {
        return res.status(200).json({
            status: "Fail",
            message: "No user with that ID found",
            data: [], 
        });
    };
    res.status(200).json({
        status: "success",
        data: oneUser,
    });
}

exports.updateUserByID = (req, res) => {
    res.status(200)
    res.json({
        status: "success"
    })
}

exports.deleteUserByID = (req, res) => {
    res.status(200)
    res.json({
        status: "success"
    })
}
