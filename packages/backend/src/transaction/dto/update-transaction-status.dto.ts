import { IsNotEmpty } from "class-validator";
import { TransactionStatus } from "src/enums/transaction-status.enum";

export class UpdateTransactionStatusDto {
    @IsNotEmpty()
    status: TransactionStatus;
}
