const {body, validationResult} = require("express-validator");

function validate(validations){
    return async (req, res, next) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    }
}

const loginValidator = [
    body("email").trim().isEmail().notEmpty().withMessage("Email is required."),
    body("password").notEmpty().trim().isLength({min: 8}).withMessage("Password should contain atleast 8 characters.")
]

const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required."),
    ...loginValidator
]

module.exports = {validate, signUpValidator, loginValidator};