import { Column, Model, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'cad_cliente',
})
export class ClientEntity extends Model<ClientEntity> {

    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'id_cliente', allowNull: false })
    client_id: number;

    @Column({ field: 'nome', allowNull: false })
    name: string;

    @Column({ field: 'cpf_documento', allowNull: false })
    cpf_document: string;

    @Column({ field: 'email', allowNull: false })
    email: string;

    @Column({ field: 'identificador', allowNull: false })
    nick_name: string;

    @Column({ field: 'senha', allowNull: false })
    password: string;

    @Column({ field: 'id_conta', allowNull: false })
    account_id: string;
}
