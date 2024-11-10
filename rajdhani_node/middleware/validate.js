const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

/**
 * Middleware function that validates user requests against a pre define Joi schema for validation
 */
const validate = (schema) => (req, res, next) => {
    // Checking if the request has a JSON body when the body is not empty
    if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
        return next(
            new ApiError(
                httpStatus.UNSUPPORTED_MEDIA_TYPE,
                "Supports JSON request body only"
            )
        );
    }

    // Extracting valid schema properties for validation
    const validSchema = pick(schema, ["params", "query", "body"]);

    // Extracting relevant properties from the request for validation
    const object = pick(req, Object.keys(validSchema));

    // Validating the request against the compiled schema
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);

    // Handling validation errors and sending a meaningful error response
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // Assigning the validated values to the request object
    Object.assign(req, value);

    // Passing control to the next middleware in the chain
    return next();
};

// Exporting the validate middleware for use in other modules
module.exports = validate;
