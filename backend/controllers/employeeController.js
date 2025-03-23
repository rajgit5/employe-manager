import Employee from "../models/Employee.js";
import cloudinary from "../config/cloudinary.js";

// Create a new employee
export const createEmployee = async (req, res) => {
  const { name, position, contact } = req.body;

  // Validate required fields
  if (!name || !position || !contact || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(
      req.file.buffer.toString("base64"),
      {
        folder: "employees",
      }
    );

    // Create new employee
    const employee = new Employee({
      name,
      position,
      contact,
      profilePicture: result.secure_url,
      createdBy: req.user.id,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, position, contact } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update fields
    employee.name = name;
    employee.position = position;
    employee.contact = contact;

    // Update profile picture if a new file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.buffer.toString("base64"),
        {
          folder: "employees",
        }
      );
      employee.profilePicture = result.secure_url;
    }

    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    res.status(200).json('okay')
  } catch (error) {
    res.status(500).json(error)
  }
  // try {
  //   // Fetch employees with pagination
  //   const employees = await Employee.find(req.user.id);
  //   res.status(200).json({
  //     employees,
  //   });
  // } catch (error) {
  //   console.error("Error fetching employees:", error);
  //   res.status(500).json({ message: "Server error" });
  // }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if the user is authorized to delete the employee
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admins can delete employees" });
    }

    // Delete the employee
    await employee.remove();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};
