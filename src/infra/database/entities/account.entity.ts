import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'cad_conta',
})
export class AccountEntity extends Model<AccountEntity> {

    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'id_conta', allowNull: false })
    account_id: number;

    @Column({ field: 'numero_conta', allowNull: false })
    account_number: string;

    @Column({ field: 'digito_verificador', allowNull: false })
    verifying_digit: string;

    @Column({ field: 'saldo_conta', allowNull: false })
    account_balance: string;
}
