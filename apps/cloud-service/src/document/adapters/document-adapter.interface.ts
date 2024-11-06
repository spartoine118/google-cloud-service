import { DataModel } from '../interfaces';

export interface DocumentAdapter {
  getData(id: string): Promise<Partial<DataModel>>;
}
