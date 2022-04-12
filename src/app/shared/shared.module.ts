import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Ant-d
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzGridModule,
    NzTabsModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSwitchModule,
    NzNotificationModule,
    NzIconModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzTabsModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSwitchModule,
    NzNotificationModule,
    NzIconModule,
  ],
})
export class SharedModule {}
