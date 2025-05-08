import { componentType, Constructor, ItemMetadata, ModuleMetadata } from "../decorators";

export class AppBootstrap{

    constructor(
        private _componentRender: ComponentRender,
        private _moduleRegistry: Constructor[],
    ){}

    public renderApp(){
        const root = document.getElementById('app');
        if (!root) return;

          this._moduleRegistry.find(module => {
            const {declarations, isRoot} = (module as any).__moduleMetadata;
        
            if(isRoot && declarations.length){
                const renderedModule = this._componentRender.renderModule(module)
              root.appendChild(renderedModule);
            }
          })
    }

    
}

export class ComponentRender{

    constructor(){}

    renderModule(module: Constructor): HTMLElement{
        const meta = (module as any).__moduleMetadata;
        const moduleElement = document.createElement('div');
        const declaraionsContainer = document.createElement('div');
        declaraionsContainer.classList.add('declarations');
        this.setModuleStyles(moduleElement, meta);

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
        this.setItemStyles(itemElement);
    
        this.renderLabel(itemElement, meta, 'Item');
    
        this.renderTemplate(itemElement, meta);
    
        return itemElement;
    }

    private setModuleStyles(element: HTMLElement, meta: ModuleMetadata): void{
        element.classList.add('module');
          if (meta.isRoot) {
                element.classList.add('root-module');
          }
    }

    private setItemStyles(element: HTMLElement){
        element.classList.add('item');
    }

    private renderLabel(element: HTMLElement, meta: ModuleMetadata | ItemMetadata, type: componentType) {
        const label = document.createElement('label');
        label.textContent = meta.nameSelector;
        label.classList.add('label');
        label.classList.add(`label-${type.toLowerCase()}`);

        element.appendChild(label);
    }

    private renderTemplate(element: HTMLElement, meta: ModuleMetadata | ItemMetadata){
        const desc = document.createElement('p');
        desc.textContent = meta.descriptionTemplate;
        desc.classList.add('template');
        element.appendChild(desc);
    }

    private renderTitle(element: HTMLElement, meta: ModuleMetadata | ItemMetadata) {
        const title = document.createElement('h2');
        title.textContent = meta.nameSelector;
        element.appendChild(title);
    }

}



