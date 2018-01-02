import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { TestComponent } from './test.component';

const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component': TestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule,
  ], exports: [
    RouterModule,
  ], declarations: [
    TestComponent,
  ],
})
export class TestModule {
}
