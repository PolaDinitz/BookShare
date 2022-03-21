import * as yup from "yup";
import InputErrorMessagesEnum from "../../enums/InputErrorMessagesEnum";

export interface LoginFormInputs {
    email: string;
    password: string;
}

export const loginSchema = yup.object({
    email: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .email(InputErrorMessagesEnum.EMAIL_INPUT_ERROR),
    password: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .min(8, InputErrorMessagesEnum.PASSWORD_INPUT_ERROR),
}).required();
