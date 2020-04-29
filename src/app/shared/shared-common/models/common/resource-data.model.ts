/**
 * Interface that represents a resource data.
 * @interface ResourceData
 */
export interface ResourceData<T> {
  data: T[];
  limit?: number;
  offset?: number;
  count: number;
}
