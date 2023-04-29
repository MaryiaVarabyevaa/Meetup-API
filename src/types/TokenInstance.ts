import {Model} from "sequelize";
import {TokenAttributes} from "./TokenAttributes";

export interface TokenInstance extends Model<TokenAttributes>, TokenAttributes {}