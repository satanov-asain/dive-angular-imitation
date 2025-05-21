import '../styles/index.css'

import './CarModule';
// import { moduleRegistry, Constructor } from '../libs/decorators';

import { moduleRegistry } from "../libs/decorators";
import { AppBootstrap} from "../libs/renderMachine/app.bootstrap";
import { ComponentRender, ComponentsStylesService } from '../libs/renderMachine/render.engine';

const stylesService = new ComponentsStylesService;

const componentRenderService = new ComponentRender(stylesService);

const AppBootstrapService = new AppBootstrap(componentRenderService, moduleRegistry);

AppBootstrapService.renderApp();
