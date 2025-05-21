import { Constructor } from "../decorators";
import { ComponentRender } from "./render.engine";

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