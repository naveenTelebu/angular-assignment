import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./modules/customers/customers-routing.module').then(
        (module) => module.CustomersRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/pins/pins-routing.module').then(
        (module) => module.PinsRoutingModule
      ),
  },
];
