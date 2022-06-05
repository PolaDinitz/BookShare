import { IsNotEmpty } from "class-validator";
import { TransactionStatus } from "../../../enums/transaction-status.enum";

export class UpdateTransactionStatusDto {
    @IsNotEmpty()
    status: TransactionStatus;
}
