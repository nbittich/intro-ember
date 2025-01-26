import Model, { belongsTo } from '@ember-data/model';
import type OrderModel from './order';

export default class LineItemModel extends Model {
  @belongsTo('order') declare order: OrderModel;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    lineItem: LineItemModel;
  }
}
