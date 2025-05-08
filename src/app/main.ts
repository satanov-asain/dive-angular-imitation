import '../styles/index.css'

import './CarModule';
// import { moduleRegistry, Constructor } from '../libs/decorators';

import { moduleRegistry } from "../libs/decorators";
import { AppBootstrap, ComponentRender } from "../libs/renderMachine/app.bootstrap";

// function renderApp(): void {
//   const root = document.getElementById('app');
//   if (!root) return;

//   function renderModule(cls: Constructor): HTMLElement {
//     const meta = (cls as any).__moduleMetadata;
//     const modDiv = document.createElement('div');
//     modDiv.style.border = '2px solid blue';
//     modDiv.style.padding = '10px';
//     modDiv.style.margin = '10px';

//     if (meta.isRoot) {
//       modDiv.style.backgroundColor = '#e0f7fa';
//       modDiv.style.boxShadow = '0 0 10px rgba(0, 150, 136, 0.5)';
//       modDiv.style.border = '2px solid rgba(0, 150, 136, 0.5)';
//     }

//     const title = document.createElement('h2');
//     title.textContent = meta.nameSelector;
//     modDiv.appendChild(title);

//     const desc = document.createElement('p');
//     desc.textContent = meta.descriptionTemplate;
//     modDiv.appendChild(desc);

//     for (const decl of meta.declarations) {
//       if ((decl as any).__moduleMetadata) {
//         modDiv.appendChild(renderModule(decl));
//       } else if ((decl as any).__itemMetadata) {
//         modDiv.appendChild(renderItem(decl));
//       }
//     }

//     return modDiv;
//   }

//   function renderItem(cls: Constructor): HTMLElement {
//     const meta = (cls as any).__itemMetadata;
//     const itemDiv = document.createElement('div');
//     itemDiv.style.border = '1px solid red';
//     itemDiv.style.margin = '5px';
//     itemDiv.style.padding = '5px';
//     itemDiv.style.width = '200px';

//     const label = document.createElement('label');
//     label.textContent = meta.nameSelector;
//     itemDiv.appendChild(label);

//     const desc = document.createElement('p');
//     desc.textContent = meta.descriptionTemplate;
//     itemDiv.appendChild(desc);

//     return itemDiv;
//   }

//   // moduleRegistry.forEach((cls) => {
//   //   root.appendChild(renderModule(cls));
//   // });

//   moduleRegistry.find(module => {
//     const {declarations, isRoot} = (module as any).__moduleMetadata;

//     if(isRoot && declarations.length){
//       root.appendChild(renderModule(module));
//     }
//   })
// }

// renderApp();


const componentRenderService = new ComponentRender();

const AppBootstrapService = new AppBootstrap(componentRenderService, moduleRegistry);

AppBootstrapService.renderApp();
