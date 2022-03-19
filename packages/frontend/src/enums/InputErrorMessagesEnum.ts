enum InputErrorMessageEnum {
    EMPTY_INPUT_ERROR = "Field is required",
    MINIMUM_INPUT_LENGTH = "Input is too short",
    EMAIL_INPUT_ERROR = "Email format is invalid",
    PASSWORD_INPUT_ERROR = "Password must be at least 8 characters",
    PASSWORDS_MISMATCH = "Password and confirm password does not match",
}

export default InputErrorMessageEnum;