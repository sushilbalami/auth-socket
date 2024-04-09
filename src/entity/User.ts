import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Role } from "../constants/Role";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 120
  })
  username: string;

  @Column({
    type: "varchar",
    length: 120,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar"
  })
  password: string;

  @Column({
    type: "enum",
    enum: [Role.USER, Role.ADMIN],
    default: Role.USER
  })
  role: string;
}
