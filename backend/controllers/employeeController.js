const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body;
    try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({ error: 'Email is already taken' });
        }
        const employee = new Employee({
            firstName,
            lastName,
            email,
            phoneNumber
        });

        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, phoneNumber, email } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, phoneNumber, email },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.blockEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        employee.isBlocked = !employee.isBlocked;
        await employee.save();
        res.send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
};