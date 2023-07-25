import { Model } from 'objection';

export class CourseModel extends Model {
  static tableName = 'curso';

  codigo: string;
  nombre: string;
  descripcion: string;
  creditos: number;
}
