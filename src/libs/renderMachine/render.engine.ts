import { Constructor, ModuleMetadata, ItemMetadata, componentType } from "../decorators";

export class ComponentRender{

    constructor(
        private _stylesService: ComponentsStylesService
    ){}

    renderModule(module: Constructor): HTMLElement{
        const meta = (module as any).__moduleMetadata;
        const moduleElement = document.createElement('div');
        const declaraionsContainer = document.createElement('div');
        declaraionsContainer.classList.add('declarations');
        this._stylesService.setModuleStyles(moduleElement, meta);

        this.renderTitle(moduleElement, meta);
        this.renderLabel(moduleElement, meta, 'Module');
        this.renderTemplate(moduleElement, meta);
        moduleElement.appendChild(declaraionsContainer);
    
        for (const decl of meta.declarations) {
          if ((decl as any).__moduleMetadata) {
            moduleElement.appendChild(this.renderModule(decl));
          } else if ((decl as any).__itemMetadata) {
            declaraionsContainer.append(this.renderItem(decl));
          }
        }
    
        
        return moduleElement;
    }

    renderItem(item: Constructor): HTMLElement{
        const meta = (item as any).__itemMetadata;
        const itemElement = document.createElement('div');
        this._stylesService.setItemStyles(itemElement);
    
        this.renderLabel(itemElement, meta, 'Item');
    
        this.renderTemplate(itemElement, meta);

        this.renderTable(itemElement, item);
    
        return itemElement;
    }

    private renderTable(parent: HTMLElement, item: Constructor) {
        const table = document.createElement('table');
        table.classList.add('table');

        const t_row = document.createElement('tr');
        
        this.renderProps(t_row, item);
        this.renderMethods(t_row, item);


        table.appendChild(t_row);
        parent.appendChild(table);
    } 

    private renderLabel(parent: HTMLElement, meta: ModuleMetadata | ItemMetadata, type: componentType) {
        const label = document.createElement('label');
        label.textContent = meta.nameSelector;
        label.classList.add('label');
        label.classList.add(`label-${type.toLowerCase()}`);

        parent.appendChild(label);
    }

    private renderTemplate(parent: HTMLElement, meta: ModuleMetadata | ItemMetadata){
        const desc = document.createElement('p');
        desc.textContent = meta.descriptionTemplate;
        desc.classList.add('template');
        parent.appendChild(desc);
    }

    private renderTitle(parent: HTMLElement, meta: ModuleMetadata | ItemMetadata) {
        const title = document.createElement('h2');
        title.textContent = meta.nameSelector;
        parent.appendChild(title);
    }

    private renderProps(parent: HTMLElement, item: Constructor) {
        const instance = new item();

        const propsContainer = document.createElement('div');
        this._stylesService.setPropsStyles(propsContainer);
        propsContainer.innerHTML = '<strong>Свойства:</strong><ul></ul>';
        const propsList = propsContainer.querySelector('ul')!;

        for (const key of Object.getOwnPropertyNames(instance)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${instance[key]}`;
            li.title = `Значение: ${instance[key]}`;
            propsList.appendChild(li);
          }

          parent.appendChild(propsContainer);
    }

    private renderMethods(parent: HTMLElement, item: Constructor) {
        const instance = new item();


        const methodsContainer = document.createElement('div');
        this._stylesService.setMethodsStyles(methodsContainer);
        methodsContainer.innerHTML = '<strong>Методы:</strong><ul></ul>';
        const methodsList = methodsContainer.querySelector('ul')!;

        for (const key of Object.getOwnPropertyNames(item.prototype)) {
            if (key !== 'constructor' && typeof item.prototype[key] === 'function') {
              const li = document.createElement('li');
              li.textContent = `${key}()`;
              li.style.cursor = 'pointer';
              li.onclick = () => {
                instance[key]();
                alert(`Вызвано ${key}`);
              }
              methodsList.appendChild(li);
            }
          }

          parent.appendChild(methodsContainer);
    }

}

export class ComponentsStylesService {
     setModuleStyles(element: HTMLElement, meta: ModuleMetadata): void{
        element.classList.add('module');
          if (meta.isRoot) {
                element.classList.add('root-module');
          }
    }

     setItemStyles(element: HTMLElement){
        element.classList.add('item');
    }

    setPropsStyles(element: HTMLElement){
        element.classList.add('props');
    }

    setMethodsStyles(element: HTMLElement){
        element.classList.add('methods');
    }
}



