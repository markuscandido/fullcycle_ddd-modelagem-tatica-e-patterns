import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: true
})
export default class CustomerModel extends Model{
    
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false, unique: true})
    declare document: string;

    @Column({allowNull: true})
    declare active: boolean;

    @Column({allowNull: true})
    declare rewardPoints: number;

    //#region Address
    @Column({allowNull: true})
    declare street: string;

    @Column({allowNull: true})
    declare number: string;

    @Column({allowNull: true})
    declare zipcode: string;

    @Column({allowNull: true})
    declare city: string;
    //#endregion
}