import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {path: '', component: RegisterPageComponent},
//   {path: 'signup', component: SignUpComponent},
//   {path: 'flower-list', component: FlowerListComponent},
//   {path: 'flower-create', component: FlowerCreateComponent}
 ];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
