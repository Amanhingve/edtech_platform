const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  User.create({ username, email, password: hashedPassword, role }, (err, result) => {
    if (err) return res.status(500).send("Error registering user.");
    res.status(201).send("User  registered successfully.");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err || !user) return res.status(404).send("User  not found.");
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send("Invalid password.");
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  });
};

module.export = { register, login };