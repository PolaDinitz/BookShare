import * as yup from "yup";
import GenderEnum from "../../enums/GenderEnum";
import InputErrorMessagesEnum from "../../enums/InputErrorMessagesEnum";

export interface RegisterFormInputs {
    profileImage: FileList;
    firstName: string;
    lastName: string;
    gender: GenderEnum;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date | null;
    address: string;
    password: string;
    confirmPassword: string;
}

export const registerSchema = yup.object({
    firstName: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .min(2, InputErrorMessagesEnum.MINIMUM_INPUT_LENGTH),
    lastName: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .min(2, InputErrorMessagesEnum.MINIMUM_INPUT_LENGTH),
    gender: yup.mixed<GenderEnum>()
        .oneOf(Object.values(GenderEnum), InputErrorMessagesEnum.EMPTY_INPUT_ERROR),
    email: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .email(InputErrorMessagesEnum.EMAIL_INPUT_ERROR),
    phoneNumber: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR),
    dateOfBirth: yup.mixed()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR),
    address: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR),
    password: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .min(8, InputErrorMessagesEnum.PASSWORD_INPUT_ERROR),
    confirmPassword: yup.string()
        .required(InputErrorMessagesEnum.EMPTY_INPUT_ERROR)
        .min(8, InputErrorMessagesEnum.PASSWORD_INPUT_ERROR)
        .oneOf([yup.ref('password')], InputErrorMessagesEnum.PASSWORDS_MISMATCH),

}).required();
