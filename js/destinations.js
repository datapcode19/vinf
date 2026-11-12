import { renderDestinationProduct } from './destination-products.js';
import { renderCostTool, renderShopSimulation } from './customer-tools.js';
import {
  renderService,
  renderDocuments,
  renderLocations,
  renderPolicy,
  renderContracts,
  renderNews,
  renderEnergy,
  renderEstore,
} from './destination-services.js';

export function renderDestination(main, page) {
  if (['car', 'historical', 'scooter'].includes(page.kind))
    return renderDestinationProduct(main, page);
  if (page.kind === 'tool') return renderCostTool(main, page);
  if (page.kind === 'shop') return renderShopSimulation(main, page);
  if (page.kind === 'service') return renderService(main, page);
  if (page.kind === 'documents') return renderDocuments(main, page);
  if (page.kind === 'locator') return renderLocations(main, page);
  if (page.id === 'contracts') return renderContracts(main, page);
  if (page.kind === 'policy') return renderPolicy(main, page);
  if (page.kind === 'news') return renderNews(main, page);
  if (page.kind === 'energy') return renderEnergy(main, page);
  if (page.kind === 'estore') return renderEstore(main, page);
}
