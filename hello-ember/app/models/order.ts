import Model, { hasMany } from '@ember-data/model';
import type LineItemModel from './line-item';

export default class OrderModel extends Model {
  @hasMany('line-item') declare lineItems: LineItemModel[];
}
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    order: OrderModel;
  }
}
