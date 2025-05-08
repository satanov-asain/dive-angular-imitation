export type componentType = 'Item' | 'Module';

export interface ItemMetadata {
  nameSelector: string;
  descriptionTemplate: string;
}

export interface ModuleMetadata {
  nameSelector: string;
  descriptionTemplate: string;
  declarations: Constructor[];
  isRoot?: boolean;
}

export type Constructor = new (...args: any[]) => any;

export const moduleRegistry: Constructor[] = [];

export function Item(metadata: ItemMetadata) {
  return function (constructor: Constructor) {
    (constructor as any).__itemMetadata = metadata;
  };
}

export function Module(metadata: ModuleMetadata) {
  return function (constructor: Constructor) {
    (constructor as any).__moduleMetadata = metadata;
    moduleRegistry.push(constructor);
  };
}
